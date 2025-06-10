
import { supabase } from '@/integrations/supabase/client';

export interface MetaCredentials {
  app_id: string;
  app_secret: string;
  access_token: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  daily_budget?: string;
  lifetime_budget?: string;
  created_time: string;
  updated_time: string;
}

export interface AdSet {
  id: string;
  name: string;
  campaign_id: string;
  status: string;
  daily_budget?: string;
  lifetime_budget?: string;
  targeting: any;
  created_time: string;
  updated_time: string;
}

export interface Ad {
  id: string;
  name: string;
  adset_id: string;
  status: string;
  creative: any;
  created_time: string;
  updated_time: string;
}

export interface CampaignInsights {
  campaign_id: string;
  impressions: number;
  clicks: number;
  spend: number;
  cpm: number;
  cpc: number;
  ctr: number;
  reach: number;
  frequency: number;
  actions?: any[];
  cost_per_action_type?: any[];
}

const META_API_BASE = 'https://graph.facebook.com/v18.0';

export async function saveMetaCredentials(appId: string, appSecret: string, accessToken: string) {
  const { data, error } = await supabase
    .from('meta_api_credentials')
    .upsert([{ 
      app_id: appId, 
      app_secret: appSecret, 
      access_token: accessToken 
    }], { 
      onConflict: 'id' 
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMetaCredentials(): Promise<MetaCredentials | null> {
  const { data, error } = await supabase
    .from('meta_api_credentials')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function testMetaConnection(accessToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${META_API_BASE}/me?access_token=${accessToken}`);
    const data = await response.json();
    return !data.error;
  } catch (error) {
    console.error('Error testing Meta connection:', error);
    return false;
  }
}

export async function getAdAccounts(accessToken: string) {
  try {
    const response = await fetch(`${META_API_BASE}/me/adaccounts?access_token=${accessToken}`);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.data;
  } catch (error) {
    console.error('Error fetching ad accounts:', error);
    throw error;
  }
}

export async function getCampaigns(accessToken: string, adAccountId: string): Promise<Campaign[]> {
  try {
    const fields = 'id,name,status,objective,daily_budget,lifetime_budget,created_time,updated_time';
    const response = await fetch(
      `${META_API_BASE}/${adAccountId}/campaigns?fields=${fields}&access_token=${accessToken}`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
}

export async function getAdSets(accessToken: string, adAccountId: string): Promise<AdSet[]> {
  try {
    const fields = 'id,name,campaign_id,status,daily_budget,lifetime_budget,targeting,created_time,updated_time';
    const response = await fetch(
      `${META_API_BASE}/${adAccountId}/adsets?fields=${fields}&access_token=${accessToken}`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching ad sets:', error);
    throw error;
  }
}

export async function getAds(accessToken: string, adAccountId: string): Promise<Ad[]> {
  try {
    const fields = 'id,name,adset_id,status,creative,created_time,updated_time';
    const response = await fetch(
      `${META_API_BASE}/${adAccountId}/ads?fields=${fields}&access_token=${accessToken}`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error;
  }
}

export async function getCampaignInsights(
  accessToken: string, 
  campaignId: string, 
  dateRange: { since: string; until: string }
): Promise<CampaignInsights | null> {
  try {
    const fields = 'impressions,clicks,spend,cpm,cpc,ctr,reach,frequency,actions,cost_per_action_type';
    const response = await fetch(
      `${META_API_BASE}/${campaignId}/insights?fields=${fields}&time_range=${JSON.stringify(dateRange)}&access_token=${accessToken}`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    
    if (data.data && data.data.length > 0) {
      return {
        campaign_id: campaignId,
        ...data.data[0]
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching campaign insights:', error);
    throw error;
  }
}

export async function updateCampaign(
  accessToken: string,
  campaignId: string,
  updates: Partial<Campaign>
) {
  try {
    const response = await fetch(`${META_API_BASE}/${campaignId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...updates,
        access_token: accessToken
      })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data;
  } catch (error) {
    console.error('Error updating campaign:', error);
    throw error;
  }
}

export async function updateAdSet(
  accessToken: string,
  adSetId: string,
  updates: Partial<AdSet>
) {
  try {
    const response = await fetch(`${META_API_BASE}/${adSetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...updates,
        access_token: accessToken
      })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data;
  } catch (error) {
    console.error('Error updating ad set:', error);
    throw error;
  }
}

export async function updateAd(
  accessToken: string,
  adId: string,
  updates: Partial<Ad>
) {
  try {
    const response = await fetch(`${META_API_BASE}/${adId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...updates,
        access_token: accessToken
      })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data;
  } catch (error) {
    console.error('Error updating ad:', error);
    throw error;
  }
}
