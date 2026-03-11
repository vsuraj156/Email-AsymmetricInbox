interface LaneHeaderProps {
  icon: string;
  title: string;
  count: number;
  accent: 'amber' | 'slate';
}

export default function LaneHeader({ icon, title, count, accent }: LaneHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 flex-shrink-0">
      <span className="text-sm">{icon}</span>
      <span
        className={`text-xs font-semibold uppercase tracking-widest ${
          accent === 'amber' ? 'text-amber-400' : 'text-slate-400'
        }`}
      >
        {title}
      </span>
      <span
        className={`text-xs font-medium tabular-nums px-1.5 py-0.5 rounded-full ${
          accent === 'amber'
            ? 'bg-amber-900/40 text-amber-400'
            : 'bg-zinc-800 text-zinc-400'
        }`}
      >
        {count}
      </span>
    </div>
  );
}
