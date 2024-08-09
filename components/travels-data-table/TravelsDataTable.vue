<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table';
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { valueUpdater } from '@/lib/utils';
import {
  DataTableDropdownActions,
  DataTablePagination,
  DataTableViewOptions,
} from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    apiEndpoint: string;
    showActions?: boolean;
    isSelectable?: boolean;
  }>(),
  {
    showActions: true,
  },
);

const emit = defineEmits<{
  'select-row': [row: TData];
}>();

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
  },
  meta: {
    deleteRow: (id: number) => {
      const index = props.data.findIndex((row) => (row as any).id === id);
      if (index !== -1) {
        props.data.splice(index, 1);
      }
    },
  },
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between space-x-2 pb-4">
      <Input
        class="max-w-sm"
        placeholder="Filter names..."
        :model-value="table.getColumn('name')?.getFilterValue() as string"
        @update:model-value="table.getColumn('name')?.setFilterValue($event)"
      />

      <div class="flex items-center space-x-2">
        <DataTableViewOptions :table="table" />
        <NuxtLink v-if="showActions" to="/travels/create">
          <Button>Add travel</Button>
        </NuxtLink>
      </div>
    </div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              @click="emit('select-row', row.original)"
              :class="
                props.isSelectable
                  ? 'cursor-pointer active:bg-muted/100 active:ring-2 active:ring-primary'
                  : undefined
              "
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  v-if="cell.column.id !== 'actions'"
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
                <div
                  v-if="cell.column.id === 'actions' && showActions"
                  class="text-right"
                >
                  <DataTableDropdownActions
                    :table="table"
                    :row="row.original"
                    :apiEndpoint="props.apiEndpoint"
                  />
                </div>
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <DataTablePagination :table="table" />
  </div>
</template>
