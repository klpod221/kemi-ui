<template>
  <ui-checkbox
    :ref="(el: any) => checkboxRef = el"
    :id="id"
    :checked="modelValue"
    :label="label"
    :disabled="disabled"
    :indeterminate="indeterminate"
    @change="handleChange"
  >
    <slot></slot>
  </ui-checkbox>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { CheckboxProps } from "../types";

defineOptions({
  name: "KCheckbox",
});

defineProps<CheckboxProps>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [value: boolean];
}>();

const checkboxRef = ref<any>(null);

const handleChange = (event: CustomEvent) => {
  const checked = event.detail.checked as boolean;
  emit("update:modelValue", checked);
  emit("change", checked);
};
</script>
