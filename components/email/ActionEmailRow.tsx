'use client';

import { Email } from '@/lib/types';
import { formatRelativeTime, isExpiringSoon, isExpired } from '@/lib/email-utils';
import SubtypeTag from './SubtypeTag';
import UnreadDot from './UnreadDot';

interface ActionEmailRowProps {
  email: Email;
  isSelected: boolean;
  onSelect: (email: Email) => void;
}

export default function ActionEmailRow({ email, isSelected, onSelect }: ActionEmailRowProps) {
  const expiring = isExpiringSoon(email.actionMetadata?.expiresAt);
  const expired = isExpired(email.actionMetadata?.expiresAt);

  return (
    <button
      onClick={() => onSelect(email)}
      className={`w-full flex items-center gap-3 px-4 h-11 text-left transition-colors
        border-l-2
        ${isSelected ? 'bg-zinc-800 border-amber-400' : 'border-transparent hover:bg-zinc-900'}
        ${email.isRead ? '' : 'border-l-amber-400'}
      `}
    >
      {/* Unread indicator */}
      <div className="w-2 flex-shrink-0 flex items-center justify-center">
        {!email.isRead && <UnreadDot lane="action" />}
      </div>

      {/* Sender */}
      <span
        className={`w-36 flex-shrink-0 truncate text-sm ${
          email.isRead ? 'text-zinc-400 font-normal' : 'text-zinc-100 font-semibold'
        }`}
      >
        {email.sender.name}
      </span>

      {/* Subtype tag */}
      <div className="flex-shrink-0">
        <SubtypeTag subtype={email.subtype} category="action" />
      </div>

      {/* Subject */}
      <span
        className={`flex-1 min-w-0 truncate text-sm ${
          email.isRead ? 'text-zinc-400' : 'text-zinc-200'
        }`}
      >
        {email.subject}
      </span>

      {/* Expiry / time */}
      <span
        className={`flex-shrink-0 text-xs tabular-nums ${
          expired
            ? 'text-zinc-600 line-through'
            : expiring
            ? 'text-amber-400 font-semibold'
            : 'text-zinc-500'
        }`}
      >
        {formatRelativeTime(email.timestamp)}
      </span>
    </button>
  );
}
