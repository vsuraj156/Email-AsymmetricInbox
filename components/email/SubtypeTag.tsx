import { ActionSubtype, ReadingSubtype } from '@/lib/types';

interface SubtypeTagProps {
  subtype: ActionSubtype | ReadingSubtype;
  category: 'action' | 'reading';
}

const ACTION_STYLES: Record<ActionSubtype, string> = {
  '2fa': 'bg-violet-900/50 text-violet-300',
  job_application: 'bg-sky-900/50 text-sky-300',
  calendar_invite: 'bg-emerald-900/50 text-emerald-300',
  payment: 'bg-rose-900/50 text-rose-300',
  urgent_notification: 'bg-red-900/60 text-red-300',
};

const ACTION_LABELS: Record<ActionSubtype, string> = {
  '2fa': '2FA',
  job_application: 'Job',
  calendar_invite: 'Calendar',
  payment: 'Payment',
  urgent_notification: 'Urgent',
};

const READING_LABELS: Record<ReadingSubtype, string> = {
  newsletter: 'Newsletter',
  order_confirmation: 'Order',
  promotional: 'Promo',
  digest: 'Digest',
};

export default function SubtypeTag({ subtype, category }: SubtypeTagProps) {
  const colorClass =
    category === 'action'
      ? ACTION_STYLES[subtype as ActionSubtype]
      : 'bg-zinc-800 text-zinc-400';

  const label =
    category === 'action'
      ? ACTION_LABELS[subtype as ActionSubtype]
      : READING_LABELS[subtype as ReadingSubtype];

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide uppercase ${colorClass}`}
    >
      {label}
    </span>
  );
}
