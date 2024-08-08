<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AutoFormLabel, type FieldProps } from '@/components/ui/auto-form';

defineProps<FieldProps>();
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label }}
      </AutoFormLabel>
      <img
        v-if="slotProps.value"
        :src="slotProps.value"
        alt="Travel"
        class="w-96 max-w-full rounded-md"
      />
      <FormControl>
        <Input v-bind="slotProps.componentField" />
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
