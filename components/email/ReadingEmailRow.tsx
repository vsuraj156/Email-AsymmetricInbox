'use client';

import { Email } from '@/lib/types';
import { formatRelativeTime, getInitials } from '@/lib/email-utils';
import SubtypeTag from './SubtypeTag';
import UnreadDot from './UnreadDot';

interface ReadingEmailRowProps {
  email: Email;
  isSelected: boolean;
  onSelect: (email: Email) => void;
}

export default function ReadingEmailRow({ email, isSelected, onSelect }: ReadingEmailRowProps) {
  const initials = getInitials(email.sender.name);

  return (
    <button
      onClick={() => onSelect(email)}
      className={`w-full flex items-center gap-3 px-4 h-[76px] text-left transition-colors
        border-l-2
        ${isSelected ? 'bg-zinc-800 border-slate-400' : 'border-transparent hover:bg-zinc-900'}
        ${!email.isRead && !isSelected ? 'border-l-slate-400' : ''}
      `}
    >
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-zinc-300"
        aria-hidden
      >
        {initials}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className={`text-sm truncate ${
              email.isRead ? 'text-zinc-400 font-normal' : 'text-zinc-100 font-semibold'
            }`}
          >
            {email.sender.name}
          </span>
          <SubtypeTag subtype={email.subtype} category="reading" />
          {!email.isRead && (
            <span className="flex-shrink-0">
              <UnreadDot lane="reading" />
            </span>
          )}
        </div>
        <p className="text-sm truncate text-zinc-300">{email.subject}</p>
        <p className="text-xs truncate text-zinc-500 mt-0.5">{email.snippet}</p>
      </div>

      {/* Time */}
      <span className="flex-shrink-0 text-xs text-zinc-500 tabular-nums self-start pt-1">
        {formatRelativeTime(email.timestamp)}
      </span>
    </button>
  );
}
