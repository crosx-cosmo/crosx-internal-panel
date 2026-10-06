// Sample content for visual development only. Replaced by real API responses via src/lib/api.ts.
import type { Campaign, DashboardData } from './types';

const c = (id: string, name: string, brand: string, status: Campaign['status'], clicks: number, conversions: number, revenue: number, payout: number, createdAt: string): Campaign =>
  ({ id, name, brand, status, clicks, conversions, revenue, payout, createdAt });

export const campaigns: Campaign[] = [
  c('CMP-1042', 'Festive Install Boost', 'Kiwi Cart', 'active', 184200, 6310, 48230, 31120, '2026-09-12'),
  c('CMP-1041', 'Wallet Signup, Tier 2 Cities', 'Zenpay', 'active', 96450, 4120, 39880, 24700, '2026-09-08'),
  c('CMP-1039', 'Fitness Trial Lead Gen', 'FitNest', 'active', 72310, 2890, 21540, 13200, '2026-09-02'),
  c('CMP-1036', 'Personal Loan CPL', 'Lumora Finance', 'paused', 58900, 1740, 34210, 22050, '2026-08-27'),
  c('CMP-1033', 'Home Decor Retargeting', 'UrbanRoots', 'active', 141800, 3520, 17620, 9840, '2026-08-19'),
  c('CMP-1030', 'EdTech Webinar Signups', 'Skillwave', 'draft', 0, 0, 0, 0, '2026-08-14'),
  c('CMP-1027', 'Travel Deals Pop-under', 'Roamly', 'ended', 203400, 5870, 29310, 18460, '2026-07-30'),
  c('CMP-1024', 'Grocery First-Order CPA', 'FreshBasket', 'active', 112600, 6940, 52780, 35900, '2026-07-22'),
  c('CMP-1021', 'Insurance Quote Leads', 'Shieldly', 'paused', 44120, 960, 14870, 9300, '2026-07-15'),
  c('CMP-1018', 'Gaming Pre-register', 'PixelForge', 'active', 167300, 7210, 41090, 26650, '2026-07-09'),
];

export const dashboard: DashboardData = {
  campaigns: 48,
  revenue: 248760,
  clicks: 1284300,
  conversions: 41870,
  deltas: { campaigns: 6.4, revenue: 12.8, clicks: 8.1, conversions: -2.3 },
  series: Array.from({ length: 14 }, (_, i) => {
    const clicks = 64000 + ((i * 7919) % 26000);
    const conversions = Math.round(clicks * (0.027 + (i % 4) * 0.002));
    return { date: new Date(Date.UTC(2026, 8, 22 + i)).toISOString().slice(0, 10), clicks, conversions, revenue: Math.round(conversions * 5.8) };
  }),
  activity: [
    { id: 'a1', type: 'conversion', text: 'Conversion approved on Festive Install Boost (CNV-88213)', time: '4 min ago' },
    { id: 'a2', type: 'campaign', text: 'Wallet Signup, Tier 2 Cities went live', time: '1 hr ago' },
    { id: 'a3', type: 'postback', text: 'Global postback fired 3,204 times with 99.8% success', time: '3 hr ago' },
    { id: 'a4', type: 'key', text: 'API key reporting-sync was rotated', time: 'Yesterday' },
    { id: 'a5', type: 'campaign', text: 'Personal Loan CPL was paused', time: 'Yesterday' },
  ],
};
