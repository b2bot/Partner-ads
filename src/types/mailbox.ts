
import { Json } from '@/types/database';

export type MailboxMessageStatus = 'unread' | 'read' | 'sent' | 'draft' | 'starred' | 'trash';

export type MailboxFolderType = 'inbox' | 'sent' | 'starred' | 'trash' | 'draft';

export interface MailboxMessage {
  id: string;
  user_id: string;
  thread_id?: string;
  subject: string;
  body?: string;
  from_email: string;
  from_name?: string;
  to_email: string;
  to_name?: string;
  cc_emails?: string[];
  bcc_emails?: string[];
  reply_to?: string;
  message_id?: string;
  in_reply_to?: string;
  status: MailboxMessageStatus;
  folder: MailboxFolderType;
  priority: number;
  has_attachments: boolean;
  is_html: boolean;
  size_bytes: number;
  headers?: Json;
  raw_content?: string;
  created_at: string;
  updated_at: string;
  read_at?: string;
  sent_at?: string;
}

export interface MailboxThread {
  id: string;
  user_id: string;
  subject: string;
  participants: string[];
  last_message_at: string;
  message_count: number;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface MailboxAttachment {
  id: string;
  message_id: string;
  filename: string;
  original_filename: string;
  content_type: string;
  size_bytes: number;
  storage_path: string;
  is_inline: boolean;
  content_id?: string;
  created_at: string;
}

export interface MailboxSettings {
  id: string;
  user_id: string;
  smtp_host?: string;
  smtp_port: number;
  smtp_encryption: string;
  smtp_username?: string;
  imap_host?: string;
  imap_port: number;
  imap_encryption: string;
  imap_username?: string;
  signature_html?: string;
  auto_reply_enabled: boolean;
  auto_reply_message?: string;
  created_at: string;
  updated_at: string;
}

export interface MailboxFolderCount {
  folder: string;
  total_count: number;
  unread_count: number;
}

export interface SendMessageRequest {
  from_email: string;
  from_name?: string;
  to_email: string;
  to_name?: string;
  cc_emails?: string[];
  bcc_emails?: string[];
  subject: string;
  body?: string;
  is_html?: boolean;
  attachments?: File[];
}

export interface UpdateMessageStatusRequest {
  id: string;
  status: MailboxMessageStatus;
  folder?: MailboxFolderType;
}
