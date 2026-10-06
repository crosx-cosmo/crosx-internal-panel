'use client';
import { usePathname } from 'next/navigation';
import { Hammer } from 'lucide-react';
import { Card, EmptyState, PageHeader } from '@/components/ui';
import { crumbs } from '@/components/shell/nav';

// Holds every module that is not built yet inside the same shell, so navigation never dead-ends.
export default function ModulePlaceholder() {
  const items = crumbs(usePathname());
  const title = items[items.length - 1].label;
  return (
    <>
      <PageHeader title={title} description="This module is next in the build order." />
      <Card><EmptyState icon={Hammer} title={`${title} is not built yet`} text="The shell, theme, table and data layer are ready, so this page drops straight in." /></Card>
    </>
  );
}
