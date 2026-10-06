'use client';
import Link from 'next/link';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useCampaigns } from '@/lib/api';
import type { Campaign } from '@/lib/types';
import { DataTable } from '@/components/data-table';
import { PageHeader, StatusBadge, buttonStyles } from '@/components/ui';
import { fmt } from '@/lib/utils';

const num = (v: number) => <span className="tabular-nums">{fmt.num(v)}</span>;
const cur = (v: number) => <span className="tabular-nums">{fmt.cur(v)}</span>;

const columns: ColumnDef<Campaign>[] = [
  { accessorKey: 'name', header: 'Campaign', cell: ({ row }) => (
    <div><div className="font-medium">{row.original.name}</div><div className="text-xs text-muted-foreground">{row.original.id}</div></div>
  ) },
  { accessorKey: 'brand', header: 'Brand' },
  { accessorKey: 'status', header: 'Status', cell: ({ getValue }) => <StatusBadge status={getValue<string>()} /> },
  { accessorKey: 'clicks', header: 'Clicks', cell: ({ getValue }) => num(getValue<number>()) },
  { accessorKey: 'conversions', header: 'Conversions', cell: ({ getValue }) => num(getValue<number>()) },
  { accessorKey: 'revenue', header: 'Revenue', cell: ({ getValue }) => cur(getValue<number>()) },
  { accessorKey: 'payout', header: 'Payout', cell: ({ getValue }) => cur(getValue<number>()) },
  { accessorKey: 'createdAt', header: 'Created', cell: ({ getValue }) => fmt.date(getValue<string>()) },
  { id: 'actions', header: 'Actions', enableSorting: false, enableHiding: false, cell: () => (
    <button aria-label="Campaign actions" className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><MoreHorizontal className="size-4" /></button>
  ) },
];

export default function CampaignsPage() {
  const { data, isLoading } = useCampaigns();
  return (
    <>
      <PageHeader
        title="All Campaigns"
        description="Every campaign across brands, with live tracking totals"
        actions={<Link href="/campaigns/new" className={buttonStyles('primary')}><Plus className="size-4" />Create campaign</Link>}
      />
      <DataTable columns={columns} data={data} loading={isLoading} statuses={['active', 'paused', 'draft', 'ended']} statusKey="status" searchPlaceholder="Search campaigns or brands" />
    </>
  );
}
