<script setup lang="ts">
import { SquareArrowOutUpRightIcon } from 'lucide-vue-next';
import type { Travel } from '@/models';

interface Props {
  travel?: Travel;
}
const { travel } = defineProps<Props>();
</script>

<template>
  <NuxtLink
    v-if="travel"
    :to="`/travels/${travel.id}`"
    class="flex items-center whitespace-nowrap font-bold hover:text-blue-500"
  >
    {{ travel.name }}
    <SquareArrowOutUpRightIcon class="w-4 h-4 ml-2" />
  </NuxtLink>
</template>
