import { BarChart3, KeyRound, LayoutDashboard, LayoutTemplate, Megaphone, Settings, UserRound, Webhook, type LucideIcon } from 'lucide-react';

export type NavItem = { label: string; icon: LucideIcon; href?: string; children?: { label: string; href: string }[] };

export const NAV: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Campaign', icon: Megaphone, children: [
    { label: 'Create Campaign', href: '/campaigns/new' },
    { label: 'All Campaigns', href: '/campaigns' },
  ] },
  { label: 'Report', icon: BarChart3, children: [
    { label: 'Submission', href: '/reports/submissions' },
    { label: 'Click', href: '/reports/clicks' },
    { label: 'Conversion', href: '/reports/conversions' },
  ] },
  { label: 'Postback', icon: Webhook, children: [
    { label: 'Global Postback', href: '/postback/global' },
    { label: 'IP Whitelist', href: '/postback/whitelist' },
  ] },
  { label: 'Template', icon: LayoutTemplate, children: [
    { label: 'Create Template', href: '/templates/new' },
    { label: 'All Templates', href: '/templates' },
  ] },
  { label: 'Profile', icon: UserRound, href: '/profile' },
  { label: 'API', icon: KeyRound, children: [
    { label: 'API Keys', href: '/developer/keys' },
    { label: 'Documentation', href: '/developer/docs' },
  ] },
  { label: 'Settings', icon: Settings, children: [
    { label: 'General', href: '/settings' },
    { label: 'Appearance', href: '/settings/appearance' },
    { label: 'Notifications', href: '/settings/notifications' },
    { label: 'Security', href: '/settings/security' },
    { label: 'System Preferences', href: '/settings/system' },
  ] },
];

export function crumbs(path: string): { label: string }[] {
  for (const g of NAV) {
    if (g.href === path) return [{ label: g.label }];
    const child = g.children?.find((c) => c.href === path);
    if (child) return [{ label: g.label }, { label: child.label }];
  }
  return [{ label: 'Page not found' }];
}
