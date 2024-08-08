<script setup lang="ts">
import type { ApiWrapper } from '@/types';
import { Travel } from '@/models';

const route = useRoute();
const isCreate = route.params.id === 'create';
const id = route.params.id;

const data = ref<Travel>(new Travel());
const loading = ref(!isCreate);

async function getData(): Promise<Travel> {
  loading.value = true;
  const { data } = await $fetch<ApiWrapper<Travel>>(`/api/travels/${id}`);
  loading.value = false;
  return data;
}

onMounted(async () => {
  if (!isCreate) {
    const travel = await getData();
    data.value = new Travel(travel);
  }
});
</script>

<template>
  <div class="flex items-center justify-between space-y-2 pb-4">
    <h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
      {{ isCreate ? 'Create travel' : `Edit travel #${id}` }}
    </h1>
  </div>
  <div v-if="loading" class="flex justify-center items-center h-48">
    <Spinner />
  </div>
  <TravelForm :key="data" v-if="!loading" :isCreate="isCreate" :data="data" />
</template>
