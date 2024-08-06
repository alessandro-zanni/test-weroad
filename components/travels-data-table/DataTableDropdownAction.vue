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
import type { Travel } from '~/models';

interface Props {
  travel: Travel;
}
const { travel } = defineProps<Props>();

const router = useRouter();

function copy(id: string) {
  navigator.clipboard.writeText(id);
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
        @click="copy(travel.id.toString())"
        class="cursor-pointer"
      >
        <ClipboardCopyIcon class="w-4 h-4 mr-2" />
        Copy ID
      </DropdownMenuItem>
      <DropdownMenuItem
        class="cursor-pointer"
        @click="router.push({ path: `/travels/${travel.id}` })"
      >
        <PencilIcon class="w-4 h-4 mr-2" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="cursor-pointer">
        <Trash2Icon class="w-4 h-4 mr-2" />
        Delete</DropdownMenuItem
      >
    </DropdownMenuContent>
  </DropdownMenu>
</template>
