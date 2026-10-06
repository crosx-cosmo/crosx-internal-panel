import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Card = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('rounded-lg border bg-card text-card-foreground', className)} {...p} />
);

const variants = {
  primary: 'bg-primary text-primary-foreground hover:brightness-110',
  outline: 'border bg-card hover:bg-muted',
  ghost: 'hover:bg-muted',
};
export const buttonStyles = (variant: keyof typeof variants = 'outline', extra?: string) =>
  cn('inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md px-3.5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50', variants[variant], extra);

export const Button = ({ variant, className, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) => (
  <button className={buttonStyles(variant, className)} {...p} />
);

const tones: Record<string, string> = {
  active: 'bg-success/10 text-success', approved: 'bg-success/10 text-success',
  paused: 'bg-warning/10 text-warning', pending: 'bg-warning/10 text-warning',
  ended: 'bg-info/10 text-info', rejected: 'bg-primary/10 text-primary',
  draft: 'bg-muted text-muted-foreground',
};
export const StatusBadge = ({ status }: { status: string }) => (
  <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize', tones[status] ?? tones.draft)}>
    <span className="size-1.5 rounded-full bg-current" />{status}
  </span>
);

export const PageHeader = ({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
    </div>
    {actions && <div className="flex gap-2">{actions}</div>}
  </div>
);

export function StatCard({ label, value, delta, icon: Icon, loading }: { label: string; value: string; delta: number; icon: LucideIcon; loading?: boolean }) {
  const up = delta >= 0;
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        {label}
        <span className="grid size-8 place-items-center rounded-md bg-muted"><Icon className="size-4" /></span>
      </div>
      {loading ? (
        <div className="mt-3 h-8 w-28 animate-pulse rounded bg-muted" />
      ) : (
        <>
          <div className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
          <div className={cn('mt-2 flex items-center gap-1 text-xs font-medium', up ? 'text-success' : 'text-primary')}>
            {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {Math.abs(delta)}%<span className="font-normal text-muted-foreground">vs previous 30 days</span>
          </div>
        </>
      )}
    </Card>
  );
}

export const EmptyState = ({ icon: Icon, title, text, action }: { icon: LucideIcon; title: string; text?: string; action?: React.ReactNode }) => (
  <div className="flex flex-col items-center px-6 py-14 text-center">
    <span className="grid size-11 place-items-center rounded-full bg-muted text-muted-foreground"><Icon className="size-5" /></span>
    <p className="mt-4 font-medium">{title}</p>
    {text && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{text}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);
