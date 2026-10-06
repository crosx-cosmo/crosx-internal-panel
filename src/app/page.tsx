'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AlertTriangle, BarChart3, KeyRound, LayoutTemplate, Megaphone, MousePointerClick, Plus, ShieldCheck, Target, Wallet, Webhook } from 'lucide-react';
import { useDashboard } from '@/lib/api';
import { Button, Card, EmptyState, PageHeader, StatCard, buttonStyles } from '@/components/ui';
import { cn, fmt } from '@/lib/utils';

const METRICS = { clicks: fmt.num, conversions: fmt.num, revenue: fmt.cur };
type Metric = keyof typeof METRICS;
const STATS = [
  { key: 'campaigns', label: 'Total Campaign', icon: Megaphone, format: fmt.num },
  { key: 'revenue', label: 'Total Revenue', icon: Wallet, format: fmt.cur },
  { key: 'clicks', label: 'Total Click', icon: MousePointerClick, format: fmt.num },
  { key: 'conversions', label: 'Total Conversion', icon: Target, format: fmt.num },
] as const;
const ACTIVITY_ICON = { campaign: Megaphone, conversion: Target, postback: Webhook, key: KeyRound };
const QUICK = [
  { label: 'Create campaign', href: '/campaigns/new', icon: Megaphone },
  { label: 'Create template', href: '/templates/new', icon: LayoutTemplate },
  { label: 'Open conversion report', href: '/reports/conversions', icon: BarChart3 },
  { label: 'Whitelist an IP', href: '/postback/whitelist', icon: ShieldCheck },
];

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboard();
  const [metric, setMetric] = useState<Metric>('clicks');

  if (isError) {
    return (
      <Card>
        <EmptyState icon={AlertTriangle} title="Dashboard data didn't load" text="Check your connection, then try again." action={<Button onClick={() => refetch()}>Try again</Button>} />
      </Card>
    );
  }
  const max = Math.max(...(data?.series.map((d) => d[metric]) ?? [1]));

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Performance across all campaigns in the last 30 days"
        actions={<Link href="/campaigns/new" className={buttonStyles('primary')}><Plus className="size-4" />Create campaign</Link>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.key} label={s.label} icon={s.icon} loading={isLoading} value={data ? s.format(data[s.key]) : ''} delta={data?.deltas[s.key] ?? 0} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Performance overview</h2>
            <div className="flex rounded-md border p-0.5 text-xs">
              {(Object.keys(METRICS) as Metric[]).map((m) => (
                <button key={m} onClick={() => setMetric(m)} className={cn('rounded px-2.5 py-1 font-medium capitalize transition-colors', metric === m ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}>{m}</button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex h-56 items-end gap-2">
            {isLoading ? <div className="h-full w-full animate-pulse rounded bg-muted" /> : data?.series.map((d) => (
              <div key={d.date} title={`${fmt.date(d.date)}: ${METRICS[metric](d[metric])}`} className="group flex h-full flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end"><div className="w-full rounded-t bg-primary/70 transition-all group-hover:bg-primary" style={{ height: `${(d[metric] / max) * 100}%` }} /></div>
                <span className="text-[10px] text-muted-foreground">{d.date.slice(8)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-medium">Quick actions</h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {QUICK.map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href} className="flex flex-col gap-3 rounded-md border p-3 text-sm font-medium transition-colors hover:bg-muted">
                <Icon className="size-4 text-primary" />{label}
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-4">
        <h2 className="border-b p-5 font-medium">Recent activity</h2>
        <ul className="divide-y">
          {isLoading
            ? Array.from({ length: 4 }, (_, i) => <li key={i} className="p-4"><div className="h-4 w-2/3 animate-pulse rounded bg-muted" /></li>)
            : data?.activity.map((a) => {
                const Icon = ACTIVITY_ICON[a.type];
                return (
                  <li key={a.id} className="flex items-center gap-3 px-5 py-3.5 text-sm">
                    <span className="grid size-8 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground"><Icon className="size-4" /></span>
                    <span className="min-w-0 flex-1 truncate">{a.text}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
                  </li>
                );
              })}
        </ul>
      </Card>
    </>
  );
}
