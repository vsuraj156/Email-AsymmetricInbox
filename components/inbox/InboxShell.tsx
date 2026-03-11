'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Email, EmailListResponse } from '@/lib/types';
import ActionLane from './ActionLane';
import ReadingLane from './ReadingLane';
import Divider from '../ui/Divider';
import EmailDetailPanel from '../email/EmailDetailPanel';

export default function InboxShell() {
  const [actionEmails, setActionEmails] = useState<Email[]>([]);
  const [readingEmails, setReadingEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionWidth, setActionWidth] = useState(420);
  const isDragging = useRef(false);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const [actionRes, readingRes] = await Promise.all([
          fetch('/api/emails?category=action'),
          fetch('/api/emails?category=reading'),
        ]);
        const actionData: EmailListResponse = await actionRes.json();
        const readingData: EmailListResponse = await readingRes.json();
        setActionEmails(actionData.emails);
        setReadingEmails(readingData.emails);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEmails();
  }, []);

  const handleSelect = useCallback((email: Email) => {
    setSelectedEmail(email);
    // Mark as read locally
    if (!email.isRead) {
      const markRead = (prev: Email[]) =>
        prev.map((e) => (e.id === email.id ? { ...e, isRead: true } : e));
      setActionEmails(markRead);
      setReadingEmails(markRead);
    }
  }, []);

  const handleClose = useCallback(() => {
    setSelectedEmail(null);
  }, []);

  const handleDividerMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current) return;
      setActionWidth(Math.min(Math.max(ev.clientX, 240), 700));
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100 items-center justify-center">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="h-14 flex-shrink-0 flex items-center px-5 border-b border-zinc-800 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">AI</span>
          </div>
          <span className="font-semibold text-sm text-zinc-100">Asymmetric Inbox</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>{actionEmails.filter((e) => !e.isRead).length} unread actions</span>
          <span className="text-zinc-700">·</span>
          <span>{readingEmails.filter((e) => !e.isRead).length} unread reads</span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-row flex-1 overflow-hidden">
        <div style={{ width: actionWidth }} className="flex-shrink-0 overflow-hidden flex flex-col">
          <ActionLane
            emails={actionEmails}
            selectedId={selectedEmail?.id ?? null}
            onSelect={handleSelect}
          />
        </div>
        <Divider vertical onMouseDown={handleDividerMouseDown} />
        <ReadingLane
          emails={readingEmails}
          selectedId={selectedEmail?.id ?? null}
          onSelect={handleSelect}
        />
      </div>

      {/* Detail panel */}
      {selectedEmail && (
        <EmailDetailPanel email={selectedEmail} onClose={handleClose} />
      )}
    </div>
  );
}
