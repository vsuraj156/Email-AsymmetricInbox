'use client';

import { useState, useMemo } from 'react';
import { Email, ActionSubtype } from '@/lib/types';
import LaneHeader from './LaneHeader';
import ActionEmailRow from '../email/ActionEmailRow';
import EmptyState from '../ui/EmptyState';

interface ActionLaneProps {
  emails: Email[];
  selectedId: string | null;
  onSelect: (email: Email) => void;
}

const FILTER_OPTIONS: { label: string; value: ActionSubtype | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: '2FA', value: '2fa' },
  { label: 'Job', value: 'job_application' },
  { label: 'Calendar', value: 'calendar_invite' },
  { label: 'Payment', value: 'payment' },
  { label: 'Urgent', value: 'urgent_notification' },
];

export default function ActionLane({ emails, selectedId, onSelect }: ActionLaneProps) {
  const [activeFilter, setActiveFilter] = useState<ActionSubtype | 'all'>('all');

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? emails
        : emails.filter((e) => e.subtype === activeFilter),
    [emails, activeFilter]
  );

  return (
    <div className="w-[420px] flex-shrink-0 flex flex-col overflow-hidden">
      {/* Lane header */}
      <LaneHeader icon="⚡" title="Action" count={emails.length} accent="amber" />

      {/* Filter chips */}
      <div className="flex gap-1.5 px-4 pb-2 flex-shrink-0 overflow-x-auto scrollbar-none">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActiveFilter(opt.value)}
            className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              activeFilter === opt.value
                ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Email list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <EmptyState lane="action" filtered={activeFilter !== 'all'} />
        ) : (
          filtered.map((email) => (
            <ActionEmailRow
              key={email.id}
              email={email}
              isSelected={email.id === selectedId}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </div>
  );
}
