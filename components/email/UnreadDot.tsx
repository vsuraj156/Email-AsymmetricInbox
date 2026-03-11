interface UnreadDotProps {
  lane: 'action' | 'reading';
}

export default function UnreadDot({ lane }: UnreadDotProps) {
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${
        lane === 'action' ? 'bg-amber-400' : 'bg-slate-400'
      }`}
    />
  );
}
