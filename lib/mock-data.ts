import { Email } from './types';

const now = Date.now();
const mins = (n: number) => new Date(now - n * 60 * 1000).toISOString();
const hours = (n: number) => new Date(now - n * 60 * 60 * 1000).toISOString();
const days = (n: number) => new Date(now - n * 24 * 60 * 60 * 1000).toISOString();

export const MOCK_EMAILS: Email[] = [
  // ── ACTION EMAILS ──────────────────────────────────────────────────────────
  {
    id: 'action-001',
    threadId: 'thread-001',
    category: 'action',
    subtype: '2fa',
    subject: 'Your GitHub login verification code: 847293',
    sender: { name: 'GitHub Security', email: 'noreply@github.com' },
    recipients: [{ name: 'You', email: 'you@example.com' }],
    snippet: 'Your authentication code is 847293. This code expires in 15 minutes.',
    body: `Hi,

Someone is attempting to sign in to your GitHub account. Use the following authentication code to complete the sign-in:

**847293**

This code expires in 15 minutes. If you did not request this code, please secure your account immediately by changing your password.

— The GitHub Security Team`,
    timestamp: mins(3),
    isRead: false,
    isStarred: false,
    labels: ['INBOX'],
    attachments: [],
    actionMetadata: {
      code: '847293',
      expiresAt: new Date(now + 12 * 60 * 1000).toISOString(),
    },
  },
  {
    id: 'action-002',
    threadId: 'thread-002',
    category: 'action',
    subtype: 'job_application',
    subject: 'Application Update: Software Engineer at Stripe',
    sender: { name: 'Greenhouse', email: 'no-reply@greenhouse.io' },
    recipients: [{ name: 'You', email: 'you@example.com' }],
    snippet: 'Your application has moved to the next stage. Please complete the take-home assessment.',
    body: `Hi,

Great news! Your application for Software Engineer at Stripe has advanced to the next stage.

**Next Step:** Complete the take-home technical assessment
**Deadline:** 72 hours from now

Please log in to your Greenhouse portal to access the assessment and submit your solution.

Good luck!

— Stripe Recruiting Team`,
    timestamp: hours(1),
    isRead: false,
    isStarred: true,
    labels: ['INBOX'],
    attachments: [],
    actionMetadata: {
      ctaLabel: 'Open Assessment',
      ctaUrl: 'https://app.greenhouse.io',
      expiresAt: new Date(now + 72 * 60 * 60 * 1000).toISOString(),
    },
  },
  {
    id: 'action-003',
    threadId: 'thread-003',
    category: 'action',
    subtype: 'calendar_invite',
    subject: 'Interview: Systems Design Round — Thursday 2pm PST',
    sender: { name: 'Google Calendar', email: 'calendar-notification@google.com' },
    recipients: [{ name: 'You', email: 'you@example.com' }],
    snippet: 'You have been invited to a calendar event. Accept or decline by Thursday.',
    body: `**Systems Design Round**

📅 Thursday, March 12 · 2:00–3:00 PM PST
📍 Google Meet (link sent separately)
👤 Interviewer: Alex Chen (Staff Engineer)

Please confirm your attendance by clicking Accept below. Add the Google Meet link to your calendar.

If you need to reschedule, reply to this email at least 24 hours in advance.`,
    timestamp: hours(2),
    isRead: true,
    isStarred: false,
    labels: ['INBOX'],
    attachments: [],
    actionMetadata: {
      ctaLabel: 'Accept Invite',
      ctaUrl: 'https://calendar.google.com',
      expiresAt: new Date(now + 48 * 60 * 60 * 1000).toISOString(),
    },
  },
  {
    id: 'action-004',
    threadId: 'thread-004',
    category: 'action',
    subtype: 'payment',
    subject: 'Action Required: Update payment method to continue service',
    sender: { name: 'Vercel Billing', email: 'billing@vercel.com' },
    recipients: [{ name: 'You', email: 'you@example.com' }],
    snippet: 'Your payment method on file has expired. Update it now to avoid service interruption.',
    body: `Hi,

Your payment method ending in 4242 has expired. To avoid interruption to your Vercel Pro subscription, please update your billing information.

**Your subscription renews on:** March 15, 2026
**Amount due:** $20.00/month

If payment is not updated within 5 days, your projects will be paused.

Click the button below to update your payment method in the Vercel dashboard.`,
    timestamp: hours(5),
    isRead: false,
    isStarred: false,
    labels: ['INBOX'],
    attachments: [],
    actionMetadata: {
      ctaLabel: 'Update Payment',
      ctaUrl: 'https://vercel.com/dashboard/billing',
      expiresAt: new Date(now + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
  {
    id: 'action-005',
    threadId: 'thread-005',
    category: 'action',
    subtype: 'urgent_notification',
    subject: 'CRITICAL: Production API latency > 2000ms — Incident #4821',
    sender: { name: 'PagerDuty', email: 'alerts@pagerduty.com' },
    recipients: [{ name: 'You', email: 'you@example.com' }],
    snippet: 'A critical incident has been triggered. API p99 latency exceeds threshold. Immediate action required.',
    body: `🚨 **CRITICAL INCIDENT #4821**

**Service:** Production API Gateway
**Alert:** p99 latency > 2000ms (current: 3,847ms)
**Started:** ${mins(8)}
**Affected:** All API consumers

**Runbook:** https://runbook.internal/api-latency
**Slack:** #incident-4821

This incident has been assigned to you. Please acknowledge and begin investigation immediately.

Auto-escalates in 15 minutes if not acknowledged.`,
    timestamp: mins(8),
    isRead: false,
    isStarred: false,
    labels: ['INBOX'],
    attachments: [],
    actionMetadata: {
      ctaLabel: 'Acknowledge Incident',
      ctaUrl: 'https://app.pagerduty.com',
      expiresAt: new Date(now + 15 * 60 * 1000).toISOString(),
    },
  },
  {
    id: 'action-006',
    threadId: 'thread-006',
    category: 'action',
    subtype: 'job_application',
    subject: 'Next Steps: Meta University — Technical Screening',
    sender: { name: 'Meta Recruiting', email: 'recruiting@meta.com' },
    recipients: [{ name: 'You', email: 'you@example.com' }],
    snippet: 'Congratulations! You have been selected to move forward. Schedule your technical screen.',
    body: `Hi,

Congratulations! We're excited to invite you to the next stage of our recruiting process for the Meta University Software Engineering Internship.

**Next Step:** 45-minute technical coding interview
**Format:** Live coding on CoderPad
**Topics:** Data structures, algorithms, problem-solving

Please use the link below to schedule a time that works for you. Slots are available for the next 2 weeks.`,
    timestamp: hours(18),
    isRead: true,
    isStarred: true,
    labels: ['INBOX'],
    attachments: [],
    actionMetadata: {
      ctaLabel: 'Schedule Interview',
      ctaUrl: 'https://calendly.com/meta-recruiting',
      expiresAt: new Date(now + 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
  {
    id: 'action-007',
    threadId: 'thread-007',
    category: 'action',
    subtype: 'calendar_invite',
    subject: 'Zoom Meeting Confirmation: CS 178 Project Office Hours',
    sender: { name: 'Zoom', email: 'no-reply@zoom.us' },
    recipients: [{ name: 'You', email: 'you@example.com' }],
    snippet: 'Your Zoom meeting is confirmed for Friday at 3pm. Join link enclosed.',
    body: `Your Zoom meeting has been scheduled.

**Topic:** CS 178 Project Office Hours
**Date:** Friday, March 13 · 3:00–4:00 PM PST
**Meeting ID:** 823 4567 8901
**Passcode:** cs178

**Join Zoom Meeting:**
https://us06web.zoom.us/j/82345678901

Add to calendar | Cancel meeting`,
    timestamp: hours(4),
    isRead: false,
    isStarred: false,
    labels: ['INBOX'],
    attachments: [],
    actionMetadata: {
      ctaLabel: 'Join Zoom',
      ctaUrl: 'https://us06web.zoom.us/j/82345678901',
    },
  },

  // ── READING EMAILS ─────────────────────────────────────────────────────────
  {
    id: 'reading-001',
    threadId: 'thread-008',
    category: 'reading',
    subtype: 'newsletter',
    subject: 'TLDR: OpenAI releases o4-mini, Rust becomes Linux default',
    sender: { name: 'TLDR Tech', email: 'dan@tldr.tech' },
    recipients: [{ name: 'You', email: 'you@example.com' }],
    snippet: 'OpenAI quietly released o4-mini for API access, Linus Torvalds merges first Rust kernel driver into mainline...',
    body: `**TLDR Tech — March 10, 2026**

🤖 **OpenAI releases o4-mini**
OpenAI made o4-mini available via the API at $0.15/1M input tokens, significantly cheaper than o3. Early benchmarks show near-o3 performance on coding tasks.

🦀 **Rust becomes Linux default**
Linus Torvalds merged the first production Rust kernel driver into Linux mainline. "We're not replacing C overnight, but this is a significant milestone," Torvalds wrote in his kernel mailing list post.

☁️ **AWS announces cross-region S3 replication at no cost**
Starting April 1, S3 cross-region replication will be free for same-account buckets. Analysts estimate this will save customers ~$400M annually.

📊 **Quick hits**
- Bun 2.1 ships with native PostgreSQL driver
- Vercel announces Edge Functions go GA
- Figma acquires design-to-code startup Locofy`,
    timestamp: hours(9),
    isRead: false,
    isStarred: false,
    labels: ['INBOX'],
    attachments: [],
  },
  {
    id: 'reading-002',
    threadId: 'thread-009',
    category: 'reading',
    subtype: 'order_confirmation',
    subject: 'Your order of "Designing Data-Intensive Applications" has shipped',
    sender: { name: 'Amazon', email: 'shipment-tracking@amazon.com' },
    recipients: [{ name: 'You', email: 'you@example.com' }],
    snippet: 'Your package is on the way. Estimated delivery: Tomorrow by 8pm.',
    body: `Your Amazon order has shipped!

**Order #113-4829847-2847392**

📦 **Designing Data-Intensive Applications** by Martin Kleppmann
Shipped via Amazon Logistics
Estimated delivery: **Tomorrow by 8:00 PM**

Track your package with tracking number: TBA849201847US

Thank you for shopping with Amazon.`,
    timestamp: days(1),
    isRead: true,
    isStarred: false,
    labels: ['INBOX'],
    attachments: [],
  },
  {
    id: 'reading-003',
    threadId: 'thread-010',
    category: 'reading',
    subtype: 'promotional',
    subject: 'This Week Only: Up to 40% off monitors and accessories',
    sender: { name: 'Best Buy', email: 'deals@bestbuy.com' },
    recipients: [{ name: 'You', email: 'you@example.com' }],
    snippet: 'LG UltraWide 34" now $499, Dell 27" 4K at $349. Free shipping on orders over $35.',
    body: `**BEST BUY FLASH SALE — THIS WEEK ONLY**

🖥️ Up to 40% off monitors and accessories

**Featured Deals:**
- LG UltraWide 34" IPS Monitor — ~~$799~~ **$499**
- Dell 27" 4K USB-C Monitor — ~~$549~~ **$349**
- Keychron K2 Mechanical Keyboard — ~~$99~~ **$69**
- Logitech MX Master 3S — ~~$99~~ **$74**

Free shipping on orders over $35. Sale ends Sunday.`,
    timestamp: days(2),
    isRead: true,
    isStarred: false,
    labels: ['INBOX'],
    attachments: [],
  },
  {
    id: 'reading-004',
    threadId: 'thread-011',
    category: 'reading',
    subtype: 'digest',
    subject: 'Weekly Digest: 3 new posts in Software Engineering Jobs',
    sender: { name: 'LinkedIn', email: 'digest-noreply@linkedin.com' },
    recipients: [{ name: 'You', email: 'you@example.com' }],
    snippet: 'Airbnb is hiring a Senior SWE, Scale AI posted a new ML role, and Figma is looking for a design systems engineer.',
    body: `**Your Weekly LinkedIn Digest**

New activity in **Software Engineering Jobs** and your network:

💼 **New job postings matching your profile:**
1. Senior Software Engineer — Airbnb (Remote) · $180k–$230k
2. ML Engineer, Data Infra — Scale AI (San Francisco) · $160k–$220k
3. Design Systems Engineer — Figma (Remote) · $170k–$210k

👥 **3 connections started new roles this week**
📝 **12 new posts** in groups you follow`,
    timestamp: days(3),
    isRead: true,
    isStarred: false,
    labels: ['INBOX'],
    attachments: [],
  },
  {
    id: 'reading-005',
    threadId: 'thread-012',
    category: 'reading',
    subtype: 'newsletter',
    subject: 'Bytes #214: React 20 Compiler, Bun 2.0, and the CSS drama',
    sender: { name: 'Bytes', email: 'bytes@ui.dev' },
    recipients: [{ name: 'You', email: 'you@example.com' }],
    snippet: 'React 20 ships a new compiler that eliminates 80% of manual memoization. Bun 2.0 claims 3x Node.js speed...',
    body: `**Bytes #214 — Your friendly neighborhood JavaScript newsletter**

⚛️ **React 20 Compiler goes stable**
The React team shipped the new compiler as stable in React 20. It automatically handles memoization, eliminating the need for useMemo and useCallback in most cases. Early adopters report 40–60% reduction in unnecessary re-renders without code changes.

🍞 **Bun 2.0 benchmarks**
Bun 2.0 claims 3x Node.js speed on HTTP workloads. Independent benchmarks confirm ~2.4x improvement. The new native SQLite driver is particularly impressive.

😤 **The CSS drama**
The CSS Working Group voted to move Cascade Layers out of the spec after implementation inconsistencies across browsers. Twitter was... not happy about it.`,
    timestamp: days(4),
    isRead: false,
    isStarred: false,
    labels: ['INBOX'],
    attachments: [],
  },
  {
    id: 'reading-006',
    threadId: 'thread-013',
    category: 'reading',
    subtype: 'order_confirmation',
    subject: 'Your Chipotle order is on its way',
    sender: { name: 'DoorDash', email: 'orders@doordash.com' },
    recipients: [{ name: 'You', email: 'you@example.com' }],
    snippet: 'Your DoorDash order from Chipotle has been picked up. Estimated arrival: 25 minutes.',
    body: `🚗 **Your order is on the way!**

**From:** Chipotle Mexican Grill
**Dasher:** Marcus T. ⭐ 4.9
**ETA:** ~25 minutes

**Your order:**
- Chicken Burrito Bowl (extra guac) — $12.50
- Chips & Salsa — $3.25
- Large Water — $0.00

**Subtotal:** $15.75
**Delivery fee:** $2.99
**Tip:** $3.00
**Total:** $21.74

Track your order in real-time on the DoorDash app.`,
    timestamp: hours(6),
    isRead: true,
    isStarred: false,
    labels: ['INBOX'],
    attachments: [],
  },
];

export function getMockEmails(): Email[] {
  return MOCK_EMAILS;
}
