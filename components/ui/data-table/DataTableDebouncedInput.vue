<script lang="ts" setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { Input } from '../input';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  debounce: {
    type: Number,
    default: 500,
  },
});

const emit = defineEmits(['update:modelValue']);

const timeout = ref<ReturnType<typeof setTimeout>>();

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    timeout.value = setTimeout(
      () => emit('update:modelValue', newValue),
      props.debounce,
    );
  },
});
onBeforeUnmount(() => clearTimeout(timeout.value));
</script>

<template>
  <Input v-model="localValue" v-bind="$attrs" />
</template>
