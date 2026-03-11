interface EmptyStateProps {
  lane: 'action' | 'reading';
  filtered?: boolean;
}

export default function EmptyState({ lane, filtered }: EmptyStateProps) {
  const icon = lane === 'action' ? '⚡' : '📖';
  const message = filtered
    ? 'No emails match this filter.'
    : lane === 'action'
    ? 'No action required — you\'re all caught up.'
    : 'Reading lane is empty.';

  return (
    <div className="flex items-center justify-center h-full py-6">
      <p className="text-zinc-500 text-sm">
        {icon} {message}
      </p>
    </div>
  );
}
