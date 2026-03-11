'use client';

import { useEffect } from 'react';
import { Email } from '@/lib/types';
import { formatRelativeTime, isExpiringSoon, isExpired } from '@/lib/email-utils';
import SubtypeTag from './SubtypeTag';

interface EmailDetailPanelProps {
  email: Email;
  onClose: () => void;
}

export default function EmailDetailPanel({ email, onClose }: EmailDetailPanelProps) {
  const expiring = isExpiringSoon(email.actionMetadata?.expiresAt);
  const expired = isExpired(email.actionMetadata?.expiresAt);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-screen w-[440px] z-50 bg-zinc-900 border-l border-zinc-800 flex flex-col animate-slide-in overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-zinc-800 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <SubtypeTag subtype={email.subtype} category={email.category} />
              {expiring && !expired && (
                <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wide">
                  Expiring soon
                </span>
              )}
              {expired && (
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wide">
                  Expired
                </span>
              )}
            </div>
            <h2 className="text-base font-semibold text-zinc-100 leading-snug">
              {email.subject}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors flex-shrink-0 mt-0.5"
            aria-label="Close panel"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M14 4L4 14M4 4l10 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Meta */}
        <div className="px-5 py-3 border-b border-zinc-800 flex-shrink-0">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <div>
              <span className="text-zinc-300 font-medium">{email.sender.name}</span>
              <span className="ml-1 text-zinc-500">&lt;{email.sender.email}&gt;</span>
            </div>
            <span>{formatRelativeTime(email.timestamp)}</span>
          </div>
        </div>

        {/* 2FA Code display */}
        {email.actionMetadata?.code && (
          <div className="px-5 py-4 border-b border-zinc-800 flex-shrink-0">
            <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wide font-medium">
              Verification Code
            </p>
            <div
              className={`font-mono text-3xl font-bold tracking-[0.3em] ${
                expired
                  ? 'text-zinc-500'
                  : expiring
                  ? 'text-amber-400'
                  : 'text-violet-300'
              }`}
            >
              {email.actionMetadata.code}
            </div>
            {email.actionMetadata.expiresAt && !expired && (
              <p className="text-xs text-zinc-500 mt-1">
                {expiring ? '⚠ Expires very soon' : 'Expires in ~15 min'}
              </p>
            )}
            {expired && (
              <p className="text-xs text-zinc-500 mt-1">This code has expired</p>
            )}
          </div>
        )}

        {/* CTA button */}
        {email.actionMetadata?.ctaLabel && email.actionMetadata?.ctaUrl && !email.actionMetadata?.code && (
          <div className="px-5 py-4 border-b border-zinc-800 flex-shrink-0">
            <a
              href={email.actionMetadata.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                email.category === 'action'
                  ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950'
                  : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-100'
              }`}
            >
              {email.actionMetadata.ctaLabel}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 10L10 2M10 2H4M10 2v6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {email.body}
          </div>
        </div>

        {/* Footer — attachments */}
        {email.attachments.length > 0 && (
          <div className="px-5 py-3 border-t border-zinc-800 flex-shrink-0">
            <p className="text-xs text-zinc-500 mb-2">Attachments</p>
            <div className="flex flex-col gap-1">
              {email.attachments.map((a) => (
                <div
                  key={a.filename}
                  className="flex items-center gap-2 text-xs text-zinc-400"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect
                      x="1"
                      y="1"
                      width="10"
                      height="10"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                  {a.filename}
                  <span className="text-zinc-600">
                    ({Math.round(a.sizeBytes / 1024)}KB)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
