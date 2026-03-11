import { NextRequest, NextResponse } from 'next/server';
import { getMockEmails } from '@/lib/mock-data';
import { EmailListResponse } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as 'action' | 'reading' | null;
  const subtype = searchParams.get('subtype');
  const unreadOnly = searchParams.get('unread') === 'true';
  // pageToken is accepted but no-op in mock mode

  let emails = getMockEmails();

  if (category) {
    emails = emails.filter((e) => e.category === category);
  }
  if (subtype) {
    emails = emails.filter((e) => e.subtype === subtype);
  }
  if (unreadOnly) {
    emails = emails.filter((e) => !e.isRead);
  }

  const all = getMockEmails();
  const response: EmailListResponse = {
    emails,
    total: emails.length,
    actionCount: all.filter((e) => e.category === 'action').length,
    readingCount: all.filter((e) => e.category === 'reading').length,
  };

  return NextResponse.json(response);
}
