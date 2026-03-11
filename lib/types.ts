export type ActionSubtype = '2fa' | 'job_application' | 'calendar_invite' | 'payment' | 'urgent_notification';
export type ReadingSubtype = 'newsletter' | 'order_confirmation' | 'promotional' | 'digest';

export interface Email {
  id: string;
  threadId: string;
  category: 'action' | 'reading';
  subtype: ActionSubtype | ReadingSubtype;
  subject: string;
  sender: { name: string; email: string };
  recipients: { name: string; email: string }[];
  snippet: string;
  body: string;
  timestamp: string;          // ISO 8601
  isRead: boolean;
  isStarred: boolean;
  labels: string[];           // Gmail label IDs in real integration
  attachments: { filename: string; mimeType: string; sizeBytes: number }[];
  actionMetadata?: {
    ctaLabel?: string;
    ctaUrl?: string;
    expiresAt?: string;       // Drives urgency coloring
    code?: string;            // 2FA codes
  };
}

export interface EmailListResponse {
  emails: Email[];
  total: number;
  actionCount: number;
  readingCount: number;
  nextPageToken?: string;     // Gmail pagination passthrough
}
