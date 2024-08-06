<script setup lang="ts">
interface Props {
  picture: string;
  name: string;
}
const { picture, name } = defineProps<Props>();
</script>

<template>
  <div class="flex items-center whitespace-nowrap">
    <img :src="picture" :alt="name" class="w-auto h-8 mr-3" />
    {{ name }}
  </div>
</template>
