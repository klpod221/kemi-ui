<template>
  <ui-radio
    :id="id"
    :checked="modelValue === value"
    :value="value"
    :label="label"
    :disabled="disabled"
    :name="name"
    @change="handleChange"
  >
    <slot></slot>
  </ui-radio>
</template>

<script setup lang="ts">
defineOptions({
  name: "KRadio",
});

defineProps<{
  id?: string;
  modelValue?: string | number;
  value: string | number;
  label?: string;
  disabled?: boolean;
  name?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  change: [value: string | number];
}>();

const handleChange = (event: CustomEvent) => {
  const value = event.detail.value;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>
