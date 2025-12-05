<template>
  <ui-form :ref="(el: any) => formRef = el" @submit="handleSubmit">
    <slot></slot>
  </ui-form>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "KForm",
});

const emit = defineEmits<{
  submit: [values: any, valid: boolean];
}>();

const formRef = ref<any>(null);

const handleSubmit = (event: CustomEvent) => {
  const { values, valid } = event.detail;
  emit("submit", values, valid);
};

// Expose form methods
const validate = () => {
  return formRef.value?.validate() || {};
};

const resetValidation = () => {
  formRef.value?.resetValidation();
};

const getValues = () => {
  return formRef.value?.getValues() || {};
};

defineExpose({
  validate,
  resetValidation,
  getValues,
});
</script>
