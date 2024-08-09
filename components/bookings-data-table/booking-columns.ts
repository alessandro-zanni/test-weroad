import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';

import type { Booking } from '@/models';
import { DataTableColumnHeader } from '@/components/ui/data-table';
import DataTableTravelColumn from './DataTableTravelColumn.vue';

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: 'travel',
    accessorFn: (row) => row.travel?.name ?? '',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Travel',
      }),
    cell: ({ row }) => {
      return h(DataTableTravelColumn, {
        travel: row.original.travel,
      });
    },
  },
  {
    accessorKey: 'customer',
    accessorFn: (row) => row.customer.name,
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Customer',
      }),
    cell: ({ row }) => {
      return row.original.customer.name;
    },
  },
  {
    accessorKey: 'paymentType',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Payment type',
      }),
  },
  {
    accessorKey: 'note',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Note',
      }),
  },
];
