<template>
  <ui-radio-group
    :ref="(el: any) => radioGroupRef = el"
    :id="id"
    :value="modelValue"
    :options="options"
    :label="label"
    :disabled="disabled"
    :name="name"
    @change="handleChange"
  >
    <slot></slot>
  </ui-radio-group>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "KRadioGroup",
});

defineProps<{
  id?: string;
  modelValue?: string | number;
  options?: import("@klpod221/kemi-ui").RadioOption[];
  label?: string;
  disabled?: boolean;
  name?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  change: [value: string | number];
}>();

const radioGroupRef = ref<any>(null);

const handleChange = (event: CustomEvent) => {
  const value = event.detail.value;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>
