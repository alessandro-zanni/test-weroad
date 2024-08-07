<script setup lang="ts">
import {
  ClipboardCopyIcon,
  MoreHorizontal,
  PencilIcon,
  Trash2Icon,
} from 'lucide-vue-next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import type { Table } from '@tanstack/vue-table';
import { toast } from 'vue-sonner';

interface Props<T = any> {
  table: Table<T>;
  row: T;
  apiEndpoint: string;
}
const { table, row, apiEndpoint } = defineProps<Props>();

const router = useRouter();

async function handleDelete() {
  const promise = new Promise<'ok' | 'ko'>(async (resolve, reject) => {
    try {
      const { status } = await $fetch<{ status: 'ok' | 'ko' }>(
        `/api/${apiEndpoint}/${row.id}`,
        { method: 'DELETE' },
      );
      if (status === 'ok') {
        resolve(status);
      } else {
        reject(status);
      }
    } catch (_) {
      reject('ko');
    }
  });

  toast.promise(promise, {
    loading: 'Loading...',
    success: () => {
      const meta = table.options.meta as any;
      if (meta) {
        meta.deleteRow(row.id);
      }
      return 'Row deleted';
    },
    error: () => ({
      name: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      action: {
        label: 'Try again',
        onClick: handleDelete,
      },
    }),
  });
}

async function handleDeleteConfirm() {
  if (window.confirm('Are you sure you want to delete this row?')) {
    await handleDelete();
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        class="cursor-pointer"
        @click="router.push({ path: `/${apiEndpoint}/${row.id}` })"
      >
        <PencilIcon class="w-4 h-4 mr-2" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="cursor-pointer" @click="handleDeleteConfirm">
        <Trash2Icon class="w-4 h-4 mr-2" />
        Delete</DropdownMenuItem
      >
    </DropdownMenuContent>
  </DropdownMenu>
</template>
