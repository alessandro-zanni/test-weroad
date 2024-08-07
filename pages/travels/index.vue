<script setup lang="ts">
import { type Travel } from '@/models';
import { type ApiWrapper } from '@/types';
import { Spinner } from '@/components/ui/spinner';
import { travelColumns } from '@/components/travels-data-table/travel-columns';

const data = ref<Travel[]>([]);
const loading = ref(true);

async function getData(): Promise<Travel[]> {
  loading.value = true;
  const { data } = await $fetch<ApiWrapper<Travel[]>>('/api/travels');
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
  <div v-if="loading" class="flex justify-center items-center h-48">
    <Spinner />
  </div>
  <TravelsDataTable
    v-if="!loading"
    :key="data.length"
    :columns="travelColumns"
    :data="data"
    apiEndpoint="travels"
  />
</template>
