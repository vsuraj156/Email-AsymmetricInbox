interface DividerProps {
  vertical?: boolean;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Divider({ vertical, onMouseDown }: DividerProps) {
  if (vertical) {
    return (
      <div
        onMouseDown={onMouseDown}
        className={`relative w-px bg-zinc-800 flex-shrink-0 self-stretch group ${
          onMouseDown ? 'cursor-col-resize' : ''
        }`}
      >
        {/* Wider invisible hit area */}
        <div className="absolute inset-y-0 -left-1.5 -right-1.5" />
        {/* Visible drag handle pip */}
        {onMouseDown && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-0.5 h-0.5 rounded-full bg-zinc-500" />
            ))}
          </div>
        )}
      </div>
    );
  }

  return <div className="h-px bg-zinc-800 flex-shrink-0" />;
}
