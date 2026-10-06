import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// Change currency/locale here once real billing data is wired in.
const CURRENCY = 'USD';
export const fmt = {
  num: (n: number) => new Intl.NumberFormat('en-US').format(n),
  cur: (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: CURRENCY, maximumFractionDigits: 0 }).format(n),
  date: (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
};
