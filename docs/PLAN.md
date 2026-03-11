# Asymmetric Inbox — Implementation Plan

## Context

Traditional email inboxes conflate urgency and type, creating anxiety: users can't immediately tell whether their inbox demands something of them. This project prototypes a new UX called "Asymmetric Inbox" that splits the inbox into two lanes:

- **Action Lane** (primary, top, fixed height): Emails requiring user action — 2FA codes, job application updates, interview scheduling, payment required, urgent notifications. Always visible, compact rows.
- **Reading Lane** (secondary, bottom, scrollable): Purely informational — newsletters, order confirmations, digests, promotions. Relaxed layout.

Mock data now; Gmail API integration later (clean migration seam via API routes).

---

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript**
- **Tailwind CSS**
- No external UI libraries

---

## File Structure

```
Email-AsymmetricInbox/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Mounts <InboxShell />
│   ├── globals.css
│   └── api/
│       └── emails/
│           ├── route.ts            # GET /api/emails
│           └── [id]/route.ts       # GET /api/emails/[id]
├── lib/
│   ├── types.ts                    # All TypeScript interfaces
│   ├── mock-data.ts                # 13 mock emails
│   └── email-utils.ts              # formatRelativeTime, getInitials, isExpiringSoon
└── components/
    ├── inbox/
    │   ├── InboxShell.tsx          # Root stateful component
    │   ├── ActionLane.tsx
    │   ├── ReadingLane.tsx
    │   └── LaneHeader.tsx
    ├── email/
    │   ├── ActionEmailRow.tsx      # Compact h-11 row
    │   ├── ReadingEmailRow.tsx     # Spacious h-[76px] row with snippet
    │   ├── SubtypeTag.tsx          # Colored pill badge
    │   ├── EmailDetailPanel.tsx    # Fixed right-side panel
    │   └── UnreadDot.tsx
    └── ui/
        ├── Divider.tsx
        └── EmptyState.tsx
```

---

## Key TypeScript Types (`lib/types.ts`)

```typescript
export type ActionSubtype = '2fa' | 'job_application' | 'calendar_invite' | 'payment' | 'urgent_notification';
export type ReadingSubtype = 'newsletter' | 'order_confirmation' | 'promotional' | 'digest';

export interface Email {
  id: string;
  threadId: string;
  category: 'action' | 'reading';
  subtype: ActionSubtype | ReadingSubtype;
  subject: string;
  sender: { name: string; email: string };
  recipients: { name: string; email: string }[];
  snippet: string;
  body: string;
  timestamp: string;          // ISO 8601
  isRead: boolean;
  isStarred: boolean;
  labels: string[];           // Gmail label IDs in real integration
  attachments: { filename: string; mimeType: string; sizeBytes: number }[];
  actionMetadata?: {
    ctaLabel?: string;
    ctaUrl?: string;
    expiresAt?: string;       // Drives urgency coloring
    code?: string;            // 2FA codes
  };
}

export interface EmailListResponse {
  emails: Email[];
  total: number;
  actionCount: number;
  readingCount: number;
  nextPageToken?: string;     // Gmail pagination passthrough
}
```

---

## Mock Data (`lib/mock-data.ts`)

**7 Action emails:**
| Subtype | Sender | Subject |
|---------|--------|---------|
| `2fa` | GitHub Security | Your GitHub login verification code: 847293 |
| `job_application` | Greenhouse | Application Update: Software Engineer at Stripe |
| `calendar_invite` | Google Calendar | Interview: Systems Design Round — Thursday 2pm PST |
| `payment` | Vercel Billing | Action Required: Update payment method to continue service |
| `urgent_notification` | PagerDuty | CRITICAL: Production API latency > 2000ms — Incident #4821 |
| `job_application` | Meta Recruiting | Next Steps: Meta University — Technical Screening |
| `calendar_invite` | Zoom | Zoom Meeting Confirmation: CS 178 Project Office Hours |

**6 Reading emails:**
| Subtype | Sender | Subject |
|---------|--------|---------|
| `newsletter` | TLDR Tech | TLDR: OpenAI releases o4-mini, Rust becomes Linux default |
| `order_confirmation` | Amazon | Your order of "Designing Data-Intensive Applications" has shipped |
| `promotional` | Best Buy | This Week Only: Up to 40% off monitors and accessories |
| `digest` | LinkedIn | Weekly Digest: 3 new posts in Software Engineering Jobs |
| `newsletter` | Bytes | Bytes #214: React 20 Compiler, Bun 2.0, and the CSS drama |
| `order_confirmation` | DoorDash | Your Chipotle order is on its way |

Timestamps generated dynamically relative to `Date.now()` so relative times stay fresh.

---

## API Routes

### GET /api/emails
Supports query params: `?category=action|reading`, `?subtype=...`, `?unread=true`, `?pageToken=...` (no-op in mock).

Returns `EmailListResponse`. In Gmail mode, swap `getMockEmails()` for `gmail.users.messages.list()` + transform function. **Response shape never changes.**

### GET /api/emails/[id]
Returns `{ email: Email }`. In Gmail mode, swap for `gmail.users.messages.get()` + transform.

### Gmail Migration Path
- Add `lib/gmail-transform.ts` — maps Gmail `labelIds[]` → `category` + `subtype`
- Replace `getMockEmails()` in both route handlers
- Add OAuth pages/routes
- Frontend components: zero changes required

---

## Layout

```
┌─────────────────────────────────────────────────┐
│  header (h-14)                                  │
├─────────────────────────────────────────────────┤
│  ⚡ ACTION  (h-[272px], fixed, ~6 compact rows) │
│  [filter chips: All | 2FA | Job | Calendar ...]  │
│  ● GitHub Security    2FA code   3m ago          │
│  ● Greenhouse         App update 1h ago          │
│    Google Calendar    Interview  2h ago          │
├─────────────────────────────────────────────────┤  ← Divider
│  📖 READING  (flex-1, scrollable)               │
│  TLDR Tech    TLDR: OpenAI releases...  9am      │
│               snippet text...                    │
│  Amazon       Your order has shipped... Mon      │
│               snippet text...                    │
└─────────────────────────────────────────────────┘
                                    ┌──────────────┐
                                    │ Detail panel  │
                                    │ (fixed right) │
                                    │ w-[440px]     │
                                    └──────────────┘
```

InboxShell layout:
```tsx
<div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
  <header />
  <div className="flex flex-col flex-1 overflow-hidden">
    <ActionLane />   {/* h-[272px] flex-shrink-0 */}
    <Divider />      {/* h-px bg-zinc-800 */}
    <ReadingLane />  {/* flex-1 overflow-y-auto */}
  </div>
  <EmailDetailPanel />  {/* fixed right-0 top-0 h-screen z-50 */}
</div>
```

---

## Styling

**Color scheme:**
- Background: `bg-zinc-950` / Surface: `bg-zinc-900` / Hover: `bg-zinc-800`
- Action accent: `amber-400` / Reading accent: `slate-400`
- Unread: left border in lane accent color

**Subtype tag colors (action):**
- `2fa`: `bg-violet-900/50 text-violet-300`
- `job_application`: `bg-sky-900/50 text-sky-300`
- `calendar_invite`: `bg-emerald-900/50 text-emerald-300`
- `payment`: `bg-rose-900/50 text-rose-300`
- `urgent_notification`: `bg-red-900/60 text-red-300`
- Reading subtypes: all `bg-zinc-800 text-zinc-400` (intentionally uniform/muted)

**Detail panel:** `animate-slide-in` (custom Tailwind keyframe: translateX 24px→0, opacity 0→1, 180ms ease-out)

---

## Implementation Order

1. **Bootstrap** — `npx create-next-app@latest . --typescript --tailwind --app`
2. **lib/types.ts + lib/mock-data.ts + lib/email-utils.ts**
3. **API routes** — test with curl
4. **InboxShell skeleton** — layout/structure only, no real data
5. **SubtypeTag** — pure component, isolated
6. **ActionEmailRow** — compact row with truncation
7. **ActionLane** — wire data fetch from `/api/emails?category=action`, add filter chips
8. **ReadingEmailRow + ReadingLane** — same pattern, reading styles
9. **EmailDetailPanel** — fixed overlay, full email, action CTA, 2FA code display
10. **Wire selection state** — connect `onSelect`, mark read, Escape key close
11. **Polish** — EmptyState, hover states, keyboard nav, expiring-soon coloring
12. **README** — concept explanation, run instructions, Gmail migration path

---

## Critical Files

| File | Why critical |
|------|-------------|
| `lib/types.ts` | Everything imports from here; get it right first |
| `lib/mock-data.ts` | Drives all UI dev and API testing |
| `app/api/emails/route.ts` | Gmail migration seam; response shape is the contract |
| `components/inbox/InboxShell.tsx` | Owns layout, data fetch, and selection state |
| `components/email/EmailDetailPanel.tsx` | Most complex component; richest UX |

---

## Verification

1. `npm run dev` → app loads at localhost:3000
2. `curl localhost:3000/api/emails` → 13 emails, correct `EmailListResponse` shape
3. Action lane shows 7 emails in compact rows; Reading lane shows 6 in spacious rows
4. Filter chips in each lane filter correctly
5. Clicking any row opens detail panel from the right with slide-in animation
6. Clicking backdrop or pressing Escape closes the panel
7. 2FA email detail shows code in monospace; payment email shows CTA button
8. Unread emails have the amber/slate dot indicator; clicking marks as read
