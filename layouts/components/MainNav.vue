<script setup lang="ts">
import { cn } from '@/lib/utils';

const navItems = [
  { title: 'Travels', href: '/travels' },
  { title: 'Bookings', href: '/bookings' },
];
</script>

<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <NuxtLink
      v-for="item in navItems"
      :key="item.title"
      :to="item.href"
      class="text-sm font-medium transition-colors hover:text-primary"
      active-class="underline underline-offset-4"
    >
      {{ item.title }}
    </NuxtLink>
  </nav>
</template>
