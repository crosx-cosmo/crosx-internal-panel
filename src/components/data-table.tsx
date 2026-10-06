'use client';
import { useState } from 'react';
import { type ColumnDef, type SortingState, type VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, CalendarDays, ChevronLeft, ChevronRight, Columns3, Download, Search, SearchX } from 'lucide-react';
import { Button, EmptyState } from '@/components/ui';

type Props<T> = { columns: ColumnDef<T>[]; data?: T[]; loading?: boolean; statuses?: string[]; statusKey?: keyof T & string; searchPlaceholder?: string };
const field = 'h-9 rounded-md border bg-card px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary';

/** Shared table for campaigns and every report: search, status, date range, column controls, export, paging. */
export function DataTable<T>({ columns, data = [], loading, statuses, statusKey, searchPlaceholder = 'Search' }: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [visibility, setVisibility] = useState<VisibilityState>({});
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const rows = statusKey && status !== 'all' ? data.filter((r) => String(r[statusKey]) === status) : data;
  const table = useReactTable({
    data: rows, columns,
    state: { sorting, columnVisibility: visibility, globalFilter: search },
    onSortingChange: setSorting, onColumnVisibilityChange: setVisibility, onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });
  const total = table.getFilteredRowModel().rows.length;
  const { pageIndex, pageSize } = table.getState().pagination;

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex flex-wrap items-center gap-2 border-b p-3">
        <div className="relative min-w-52 flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={searchPlaceholder} aria-label="Search" className={`${field} w-full pl-9`} />
        </div>
        {statuses && (
          <select value={status} onChange={(e) => { setStatus(e.target.value); table.setPageIndex(0); }} aria-label="Status" className={`${field} capitalize`}>
            <option value="all">All statuses</option>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
        <div className="flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm text-muted-foreground">
          <CalendarDays className="size-4" />
          <input type="date" aria-label="From date" className="bg-transparent outline-none" />
          <span>to</span>
          <input type="date" aria-label="To date" className="bg-transparent outline-none" />
        </div>
        <div className="ml-auto flex gap-2">
          <details className="relative">
            <summary className="inline-flex h-9 cursor-pointer list-none items-center gap-2 rounded-md border bg-card px-3 text-sm font-medium transition-colors hover:bg-muted">
              <Columns3 className="size-4" />Columns
            </summary>
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border bg-card p-1.5 shadow-lg">
              {table.getAllLeafColumns().filter((c) => c.getCanHide()).map((c) => (
                <label key={c.id} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted">
                  <input type="checkbox" checked={c.getIsVisible()} onChange={c.getToggleVisibilityHandler()} className="accent-primary" />
                  {String(c.columnDef.header ?? c.id)}
                </label>
              ))}
            </div>
          </details>
          <Button><Download className="size-4" />Export</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th key={h.id} className="whitespace-nowrap px-4 py-3 font-medium">
                    {h.isPlaceholder ? null : h.column.getCanSort() ? (
                      <button onClick={h.column.getToggleSortingHandler()} className="inline-flex items-center gap-1.5 hover:text-foreground">
                        {flexRender(h.column.columnDef.header, h.getContext())}<ArrowUpDown className="size-3 opacity-60" />
                      </button>
                    ) : flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y">
            {loading
              ? Array.from({ length: 6 }, (_, i) => (
                  <tr key={i}>{table.getVisibleLeafColumns().map((c) => <td key={c.id} className="px-4 py-3.5"><div className="h-4 animate-pulse rounded bg-muted" /></td>)}</tr>
                ))
              : table.getRowModel().rows.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-muted/40">
                    {r.getVisibleCells().map((c) => <td key={c.id} className="whitespace-nowrap px-4 py-3.5">{flexRender(c.column.columnDef.cell, c.getContext())}</td>)}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {!loading && total === 0 && <EmptyState icon={SearchX} title="No results" text="Clear the search or change the status filter to see more rows." />}

      <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
        <span>{total ? `${pageIndex * pageSize + 1} to ${Math.min((pageIndex + 1) * pageSize, total)} of ${total}` : '0 results'}</span>
        <div className="flex gap-1">
          <Button className="size-8 px-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} aria-label="Previous page"><ChevronLeft className="size-4" /></Button>
          <Button className="size-8 px-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} aria-label="Next page"><ChevronRight className="size-4" /></Button>
        </div>
      </div>
    </div>
  );
}
