import { NextRequest, NextResponse } from 'next/server';
import { getMockEmails } from '@/lib/mock-data';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const email = getMockEmails().find((e) => e.id === id);

  if (!email) {
    return NextResponse.json({ error: 'Email not found' }, { status: 404 });
  }

  return NextResponse.json({ email });
}
