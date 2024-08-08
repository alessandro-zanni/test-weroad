<script setup lang="ts">
import type { ApiWrapper } from '@/types';
import { Booking } from '@/models';

const route = useRoute();
const isCreate = route.params.id === 'create';
const id = route.params.id;

const data = ref<Booking>(new Booking());
const loading = ref(!isCreate);

async function getData(): Promise<Booking> {
  loading.value = true;
  const { data } = await $fetch<ApiWrapper<Booking>>(`/api/bookings/${id}`);
  loading.value = false;
  return data;
}

onMounted(async () => {
  if (!isCreate) {
    const booking = await getData();
    data.value = new Booking(booking);
  }
});
</script>

<template>
  <div class="flex items-center justify-between space-y-2 pb-4">
    <h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
      {{ isCreate ? 'Create booking' : `Edit booking #${id}` }}
    </h1>
  </div>
  <div v-if="loading" class="flex justify-center items-center h-48">
    <Spinner />
  </div>
  <BookingForm
    :key="data.id"
    v-if="!loading"
    :isCreate="isCreate"
    :data="data"
  />
</template>
