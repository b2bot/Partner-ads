
export interface SheetRow {
  day?: string;
  campaignName?: string;
  adSetName?: string;
  adName?: string;
  accountName?: string;
  impressions?: number;
  clicks?: number;
  amountSpent?: number;
  actionMessagingConversationsStarted?: number;
  costPerActionMessagingConversations?: number;
  actionLinkClicks?: number;
  reach?: number;
  frequency?: number;
  cpm?: number;
  cpc?: number;
  [key: string]: any;
}

export interface Campaign {
  campaignName: string;
  impressions: number;
  clicks: number;
  amountSpent: number;
  adSets: AdSet[];
}

export interface AdSet {
  adSetName: string;
  campaignName: string;
  impressions: number;
  clicks: number;
  amountSpent: number;
  ads: Ad[];
}

export interface Ad {
  adName: string;
  adSetName: string;
  campaignName: string;
  impressions: number;
  clicks: number;
  amountSpent: number;
}

export type Platform = 'meta' | 'google' | 'relatorios';
