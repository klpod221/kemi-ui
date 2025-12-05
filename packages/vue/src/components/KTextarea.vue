<template>
  <ui-textarea
    :ref="(el: any) => textareaRef = el"
    :id="id"
    :value="modelValue"
    :label="label"
    :placeholder="placeholder"
    :rules="rules"
    :helper-text="helperText"
    :error-message="errorMessage"
    :size="size"
    :disabled="disabled"
    :readonly="readonly"
    :rows="rows"
    :autofocus="autofocus"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TextareaProps } from "../types";

defineOptions({
  name: "KTextarea",
});

withDefaults(defineProps<TextareaProps>(), {
  modelValue: "",
  size: "md",
  disabled: false,
  readonly: false,
  rows: 4,
  autofocus: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  input: [value: string];
  blur: [];
  focus: [];
}>();

const textareaRef = ref<any>(null);

const handleInput = (event: CustomEvent) => {
  const value = event.detail as string;
  emit("update:modelValue", value);
  emit("input", value);
};

const handleBlur = () => {
  emit("blur");
};

const handleFocus = () => {
  emit("focus");
};

const validate = (allValues?: any) => {
  return textareaRef.value?.validate(allValues) || "";
};

const markTouchedAndValidate = (allValues?: any) => {
  return textareaRef.value?.markTouchedAndValidate(allValues) || "";
};

defineExpose({
  validate,
  markTouchedAndValidate,
});
</script>
