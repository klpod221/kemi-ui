<template>
  <ui-checkbox-group
    :ref="(el: any) => checkboxGroupRef = el"
    :id="id"
    :value="modelValue"
    :options="options"
    :label="label"
    :disabled="disabled"
    @change="handleChange"
  >
    <slot></slot>
  </ui-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "KCheckboxGroup",
});

defineProps<{
  id?: string;
  modelValue?: any[];
  options?: import("@klpod221/kemi-ui").CheckboxOption[];
  label?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: any[]];
  change: [value: any[]];
}>();

const checkboxGroupRef = ref<any>(null);

const handleChange = (event: CustomEvent) => {
  const value = event.detail.value;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>
