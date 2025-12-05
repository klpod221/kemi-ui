<template>
  <ui-switch
    :id="id"
    :checked="modelValue"
    :disabled="disabled"
    :size="size"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import type { SwitchProps } from "../types";

defineOptions({
  name: "KSwitch",
});

defineProps<SwitchProps>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [value: boolean];
}>();

const handleChange = (event: CustomEvent) => {
  const checked = event.detail.checked as boolean;
  emit("update:modelValue", checked);
  emit("change", checked);
};
</script>
