interface DividerProps {
  vertical?: boolean;
}

export default function Divider({ vertical }: DividerProps) {
  return vertical
    ? <div className="w-px bg-zinc-800 flex-shrink-0 self-stretch" />
    : <div className="h-px bg-zinc-800 flex-shrink-0" />;
}
