'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Bell, ChevronDown, Menu, Moon, Search, Sun, UserRound, X } from 'lucide-react';
import { NAV, crumbs } from './nav';
import { cn } from '@/lib/utils';

const iconBtn = 'relative grid size-9 place-items-center rounded-md border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground';

function Logo() {
  // Two cut-outs of the official logo: dark ink for light mode, light ink for dark mode.
  return (
    <Link href="/" aria-label="CrosX home">
      <img src="/brand/logo-light.png" alt="CrosX" className="h-11 w-auto dark:hidden" />
      <img src="/brand/logo-dark.png" alt="" className="hidden h-11 w-auto dark:block" />
    </Link>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const flip = () => {
    const el = document.documentElement;
    el.classList.add('theme-anim');
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    setTimeout(() => el.classList.remove('theme-anim'), 350);
  };
  return (
    <button onClick={flip} aria-label="Toggle dark mode" className={iconBtn}>
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  );
}

function Breadcrumbs() {
  const items = crumbs(usePathname());
  return (
    <ol className="flex min-w-0 items-center gap-2 text-sm">
      {items.map((c, i) => (
        <li key={c.label} className={cn('truncate', i === items.length - 1 ? 'font-medium' : 'text-muted-foreground')}>
          {i > 0 && <span className="mr-2 text-muted-foreground/60">/</span>}
          {c.label}
        </li>
      ))}
    </ol>
  );
}

function SidebarNav({ onNavigate }: { onNavigate: () => void }) {
  const path = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const row = 'flex h-9 w-full items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors';
  const idle = 'text-muted-foreground hover:bg-muted hover:text-foreground';
  return (
    <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
      {NAV.map(({ label, icon: Icon, href, children }) => {
        const active = href ? path === href : !!children?.some((c) => c.href === path);
        if (!children) {
          return (
            <Link key={label} href={href!} onClick={onNavigate} className={cn(row, active ? 'bg-primary/10 text-primary' : idle)}>
              <Icon className="size-4" />{label}
            </Link>
          );
        }
        const expanded = open[label] ?? active;
        return (
          <div key={label}>
            <button onClick={() => setOpen({ ...open, [label]: !expanded })} aria-expanded={expanded} className={cn(row, active ? 'text-foreground' : idle)}>
              <Icon className="size-4" />{label}
              <ChevronDown className={cn('ml-auto size-4 transition-transform', expanded && 'rotate-180')} />
            </button>
            {expanded && (
              <div className="ml-5 mt-0.5 space-y-0.5 border-l pl-3">
                {children.map((c) => (
                  <Link key={c.href} href={c.href} onClick={onNavigate} className={cn('flex h-8 items-center rounded-md px-3 text-sm transition-colors', c.href === path ? 'bg-primary/10 font-medium text-primary' : idle)}>
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-dvh">
      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={cn('fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r bg-sidebar transition-transform duration-200 lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0', open ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex h-16 items-center justify-between border-b px-5">
          <Logo />
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X className="size-5" /></button>
        </div>
        <SidebarNav onNavigate={() => setOpen(false)} />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background px-4 sm:px-6 lg:px-8">
          <button className={cn(iconBtn, 'lg:hidden')} onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="size-4" /></button>
          <Breadcrumbs />
          <div className="ml-auto flex items-center gap-2">
            <button className="hidden h-9 w-64 items-center gap-2 rounded-md border bg-card px-3 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex">
              <Search className="size-4" />Search panel
              <kbd className="ml-auto rounded border px-1.5 text-[10px]">Ctrl K</kbd>
            </button>
            <button className={iconBtn} aria-label="Notifications"><Bell className="size-4" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" /></button>
            <ThemeToggle />
            <Link href="/profile" aria-label="Profile" className={iconBtn}><UserRound className="size-4" /></Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1400px] flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
