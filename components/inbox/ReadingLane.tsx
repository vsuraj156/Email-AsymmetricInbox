'use client';

import { useState, useMemo } from 'react';
import { Email, ReadingSubtype } from '@/lib/types';
import LaneHeader from './LaneHeader';
import ReadingEmailRow from '../email/ReadingEmailRow';
import EmptyState from '../ui/EmptyState';

interface ReadingLaneProps {
  emails: Email[];
  selectedId: string | null;
  onSelect: (email: Email) => void;
}

const FILTER_OPTIONS: { label: string; value: ReadingSubtype | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Newsletter', value: 'newsletter' },
  { label: 'Orders', value: 'order_confirmation' },
  { label: 'Promos', value: 'promotional' },
  { label: 'Digest', value: 'digest' },
];

export default function ReadingLane({ emails, selectedId, onSelect }: ReadingLaneProps) {
  const [activeFilter, setActiveFilter] = useState<ReadingSubtype | 'all'>('all');

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? emails
        : emails.filter((e) => e.subtype === activeFilter),
    [emails, activeFilter]
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Lane header */}
      <LaneHeader icon="📖" title="Reading" count={emails.length} accent="slate" />

      {/* Filter chips */}
      <div className="flex gap-1.5 px-4 pb-2 flex-shrink-0 overflow-x-auto scrollbar-none">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActiveFilter(opt.value)}
            className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              activeFilter === opt.value
                ? 'bg-slate-500/20 text-slate-300 ring-1 ring-slate-500/40'
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
          <EmptyState lane="reading" filtered={activeFilter !== 'all'} />
        ) : (
          filtered.map((email) => (
            <ReadingEmailRow
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
