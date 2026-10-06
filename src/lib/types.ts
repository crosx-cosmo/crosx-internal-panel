export type CampaignStatus = 'active' | 'paused' | 'draft' | 'ended';

export interface Campaign {
  id: string;
  name: string;
  brand: string;
  status: CampaignStatus;
  clicks: number;
  conversions: number;
  revenue: number;
  payout: number;
  createdAt: string;
}

export interface ActivityItem { id: string; type: 'campaign' | 'conversion' | 'postback' | 'key'; text: string; time: string }
export interface SeriesPoint { date: string; clicks: number; conversions: number; revenue: number }

export interface DashboardData {
  campaigns: number;
  revenue: number;
  clicks: number;
  conversions: number;
  deltas: Record<'campaigns' | 'revenue' | 'clicks' | 'conversions', number>;
  series: SeriesPoint[];
  activity: ActivityItem[];
}
