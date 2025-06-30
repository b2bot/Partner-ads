
export interface Automation {
  id: string;
  user_id: string;
  name: string;
  subject: string;
  body?: string;
  attachments: any[];
  recipients_filter: any;
  schedule_cron?: string;
  schedule_once?: string;
  next_run?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AutomationLog {
  id: string;
  automation_id: string;
  run_at: string;
  status: 'success' | 'error' | 'partial';
  details: any;
  emails_sent: number;
  emails_failed: number;
}

export interface CreateAutomationRequest {
  name: string;
  subject: string;
  body?: string;
  attachments?: any[];
  recipients_filter?: any;
  schedule_cron?: string;
  schedule_once?: string;
  active?: boolean;
}

export interface UpdateAutomationRequest extends Partial<CreateAutomationRequest> {
  id: string;
}
