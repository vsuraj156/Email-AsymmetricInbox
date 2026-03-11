# Asymmetric Inbox — Claude Context

## What this project is

A Next.js prototype of a new email UX concept that splits the inbox into two lanes:
- **Action Lane** (left, fixed width, resizable): Emails requiring user action — 2FA codes, job applications, calendar invites, payments, urgent alerts.
- **Reading Lane** (right, flex-1): Purely informational — newsletters, order confirmations, digests, promotions.

The goal is to reduce inbox anxiety by making it immediately obvious whether your inbox demands something of you.

## Tech stack

- Next.js 16, App Router, TypeScript, Tailwind CSS v4
- No external UI libraries
- `npm run dev` → localhost:3000

## Current state

Mock data only. Gmail API integration is the planned next step (see below).

## Key file map

| File | Role |
|------|------|
| `lib/types.ts` | All TypeScript interfaces — `Email`, `EmailListResponse`, subtypes |
| `lib/mock-data.ts` | 13 mock emails (7 action, 6 reading); timestamps are dynamic |
| `lib/email-utils.ts` | `formatRelativeTime`, `getInitials`, `isExpiringSoon`, `isExpired` |
| `app/api/emails/route.ts` | `GET /api/emails` — supports `?category`, `?subtype`, `?unread` |
| `app/api/emails/[id]/route.ts` | `GET /api/emails/[id]` |
| `components/inbox/InboxShell.tsx` | Root stateful component — owns data fetch, selection state, drag resize |
| `components/inbox/ActionLane.tsx` | Left lane — filter chips, compact `h-11` rows |
| `components/inbox/ReadingLane.tsx` | Right lane — filter chips, spacious `h-[76px]` rows |
| `components/email/EmailDetailPanel.tsx` | Fixed right overlay — 2FA code display, CTA button, slide-in animation |
| `components/email/SubtypeTag.tsx` | Colored pill badge per subtype |
| `components/ui/Divider.tsx` | Horizontal or vertical divider; vertical variant is a drag handle |

## Email classification

Classification is **hardcoded in mock data** — each `Email` has `category: 'action' | 'reading'` set manually.

Implicit rules used:
- **Action**: user must do something (copy a code, schedule, accept/decline, pay, acknowledge)
- **Reading**: purely informational, no response needed

In the Gmail integration, classification will live in `lib/gmail-transform.ts` via label heuristics.

## Gmail integration (not yet implemented)

The API route response shape (`EmailListResponse`) is the stable contract — frontend components never need to change.

Steps to migrate:
1. Add `lib/gmail-transform.ts` — maps Gmail `labelIds[]` → `category` + `subtype`
2. Replace `getMockEmails()` in `app/api/emails/route.ts` and `app/api/emails/[id]/route.ts`
3. Add OAuth pages/routes
4. Frontend: zero changes required

## Design system

- Background: `bg-zinc-950` / Surface: `bg-zinc-900` / Hover: `bg-zinc-800`
- Action accent: `amber-400` / Reading accent: `slate-400`
- Unread indicator: left border + dot in lane accent color
- Subtype tag colors: violet (2FA), sky (job), emerald (calendar), rose (payment), red (urgent), zinc (all reading)
- Detail panel: `animate-slide-in` (defined in `app/globals.css` as a Tailwind `@theme` keyframe)

## Resizable split

The left/right lane split is user-adjustable via a drag handle on the divider. State lives in `InboxShell` as `actionWidth` (default 420px, clamped 240–700px).

## Docs

Full implementation plan: `docs/PLAN.md`

## Known issues / cleanup deferred

- `isDragging` ref in `InboxShell` is redundant (listeners are self-cleaning on mouseup)
- No unmount cleanup for drag listeners if component unmounts mid-drag
- No change guard on `setActionWidth` at clamped bounds
- Magic numbers (240, 700, 420) are unnamed

These were intentionally deferred to prioritize Gmail integration.
