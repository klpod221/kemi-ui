<template>
  <ui-slider
    :ref="(el: any) => sliderRef = el"
    :id="id"
    :value="modelValue"
    :min="min"
    :max="max"
    :step="step"
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
  name: "KSlider",
});

defineProps<{
  id?: string;
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  helperText?: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: number];
  change: [value: number];
}>();

const sliderRef = ref<any>(null);

const handleChange = (event: CustomEvent) => {
  const value = event.detail.value;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>
