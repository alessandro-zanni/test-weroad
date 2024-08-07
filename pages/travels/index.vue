<script setup lang="ts">
import {
  travelColumns,
  TravelsDataTable,
} from '@/components/travels-data-table';
import { type Travel } from '@/models';
import { type ApiWrapper } from '@/types';

const data = ref<Travel[]>([]);
const loading = ref(false);

async function getData(): Promise<Travel[]> {
  loading.value = true;
  const { data } = await $fetch<ApiWrapper<Travel[]>>('api/travels');
  loading.value = false;
  return data ?? [];
}

onMounted(async () => {
  data.value = await getData();
});
</script>

<template>
  <div class="flex items-center justify-between space-y-2 pb-4">
    <h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
      Travels
    </h1>
  </div>
  <TravelsDataTable
    :key="data.length"
    :columns="travelColumns"
    :data="data"
    apiEndpoint="travels"
  />
</template>
