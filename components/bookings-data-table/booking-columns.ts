import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';

import type { Booking } from '@/models';
import { DataTableColumnHeader } from '@/components/ui/data-table';
import DataTableTravelIdColumn from './DataTableTravelIdColumn.vue';
import { sort } from '@/lib/utils';

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: 'travelId',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Travel',
      }),
    cell: ({ row }) => {
      return h(DataTableTravelIdColumn, {
        travel: row.original.travel,
      });
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.travel?.name ?? '';
      const b = rowB.original.travel?.name ?? '';
      return sort(a, b);
    },
  },
  {
    accessorKey: 'customer',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Customer',
      }),
    cell: ({ row }) => {
      return row.original.customer.name;
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.customer.name;
      const b = rowB.original.customer.name;
      return sort(a, b);
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
  {
    id: 'actions',
    enableHiding: false,
    header: 'Actions',
  },
];
