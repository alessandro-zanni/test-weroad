<script setup lang="ts">
import { MonitorCogIcon, MoonIcon, SunIcon } from 'lucide-vue-next';
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const colorMode = useColorMode();
</script>

<template>
  <DropdownMenuSub>
    <DropdownMenuSubTrigger>
      <!-- <MoonIcon
        class="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <SunIcon
        class="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      /> -->
      <span>Color theme</span>
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <DropdownMenuItem @click="colorMode.preference = 'light'">
          <SunIcon class="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem @click="colorMode.preference = 'dark'">
          <MoonIcon class="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="colorMode.preference = 'system'">
          <MonitorCogIcon class="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
</template>
