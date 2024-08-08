import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';

import type { Travel } from '@/models';
import { formatPrice } from '@/lib/utils';
import { DataTableColumnHeader } from '@/components/ui/data-table';
import DataTableNameColumn from './DataTableNameColumn.vue';
import DataTableRatingColumn from './DataTableRatingColumn.vue';

export const travelColumns: ColumnDef<Travel>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Name',
      }),
    cell: ({ row }) => {
      return h(DataTableNameColumn, {
        picture: row.original.picture,
        name: row.original.name,
      });
    },
  },
  {
    accessorKey: 'departure',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Departure',
      }),
    cell: ({ row }) => {
      return new Date(row.original.departure).toLocaleDateString();
    },
  },
  {
    accessorKey: 'return',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Return',
      }),
    cell: ({ row }) => {
      return new Date(row.original.return).toLocaleDateString();
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Description',
      }),
  },
  {
    accessorKey: 'price',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Price',
      }),
    cell: ({ row }) => {
      const formattedPrice = formatPrice(row.original.price);
      return h('div', { class: 'text-right font-medium' }, formattedPrice);
    },
  },
  {
    accessorKey: 'rating',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column: column,
        title: 'Rating',
      }),
    cell: ({ row }) => {
      return h(DataTableRatingColumn, {
        rating: row.original.rating,
      });
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Actions',
  },
];
