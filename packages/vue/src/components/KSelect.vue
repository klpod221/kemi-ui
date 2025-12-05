<template>
  <ui-select
    :ref="(el: any) => selectRef = el"
    :id="id"
    :value="modelValue"
    :options="options"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :helper-text="helperText"
    :error-message="errorMessage"
    :rules="rules"
    @change="handleChange"
  >
    <slot></slot>
  </ui-select>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { SelectProps } from "../types";

defineOptions({
  name: "KSelect",
});

withDefaults(defineProps<SelectProps>(), {
  modelValue: "",
  placeholder: "Select...",
  disabled: false,
  options: () => [],
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const selectRef = ref<any>(null);

const handleChange = (event: CustomEvent) => {
  const value = event.detail.value as string;
  emit("update:modelValue", value);
  emit("change", value);
};

const validate = (allValues?: any) => {
  return selectRef.value?.validate(allValues) || "";
};

defineExpose({
  validate,
});
</script>
