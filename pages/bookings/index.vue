<script setup lang="ts">
import { type Booking } from '@/models';
import { type ApiWrapper } from '@/types';
import { Spinner } from '@/components/ui/spinner';
import { bookingColumns } from '@/components/bookings-data-table/booking-columns';

const data = ref<Booking[]>([]);
const loading = ref(true);

async function getData(): Promise<Booking[]> {
  loading.value = true;
  const { data } = await $fetch<ApiWrapper<Booking[]>>('/api/bookings');
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
      Bookings
    </h1>
  </div>
  <div v-if="loading" class="flex justify-center items-center h-48">
    <Spinner />
  </div>
  <BookingsDataTable
    v-if="!loading"
    :key="data.length"
    :columns="bookingColumns"
    :data="data"
    apiEndpoint="bookings"
  />
</template>
