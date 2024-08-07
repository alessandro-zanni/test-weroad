<script setup lang="ts">
const route = useRoute();
const isCreate = route.params.id === 'create';
const id = route.params.id;
</script>

<template>
  <div class="flex items-center justify-between space-y-2 pb-4">
    <h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
      {{ isCreate ? 'Create travel' : `Edit travel #${id}` }}
    </h1>
  </div>
  <TravelForm :isCreate="isCreate" />
</template>
