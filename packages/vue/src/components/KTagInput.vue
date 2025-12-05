<template>
  <ui-taginput
    :ref="(el: any) => taginputRef = el"
    :id="id"
    :value="modelValue"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :helper-text="helperText"
    :error-message="errorMessage"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "KTagInput",
});

defineProps<{
  id?: string;
  modelValue?: string[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
  change: [value: string[]];
}>();

const taginputRef = ref<any>(null);

const handleChange = (event: CustomEvent) => {
  const value = event.detail.value;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>
