<template>
  <ui-datepicker
    :ref="(el: any) => datepickerRef = el"
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
  name: "KDatepicker",
});

defineProps<{
  id?: string;
  modelValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const datepickerRef = ref<any>(null);

const handleChange = (event: CustomEvent) => {
  const value = event.detail.value;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>
