<script setup lang="ts">
import MainNav from './components/MainNav.vue';
import Logo from './components/Logo.vue';
import UserNav from './components/UserNav.vue';
</script>

<template>
  <div class="flex flex-col">
    <div class="border-b">
      <div class="container mx-auto flex h-16 items-center px-8">
        <Logo />
        <MainNav class="mx-6" />
        <div class="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>

    <div class="container mx-auto flex-1 space-y-4 p-8 pt-6">
      <slot />
    </div>
  </div>
</template>
