<template>
  <ui-colorpicker
    :ref="(el: any) => colorpickerRef = el"
    :id="id"
    :value="modelValue"
    :label="label"
    :disabled="disabled"
    :helper-text="helperText"
    :error-message="errorMessage"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "KColorPicker",
});

defineProps<{
  id?: string;
  modelValue?: string;
  label?: string;
  disabled?: boolean;
  helperText?: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const colorpickerRef = ref<any>(null);

const handleChange = (event: CustomEvent) => {
  const value = event.detail.value;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>
