<template>
  <ui-input
    :ref="(el: any) => inputRef = el"
    :id="id"
    :value="modelValue"
    :type="type"
    :label="label"
    :placeholder="placeholder"
    :rules="rules"
    :helper-text="helperText"
    :error-message="errorMessage"
    :size="size"
    :disabled="disabled"
    :readonly="readonly"
    :autocomplete="autocomplete"
    :autofocus="autofocus"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  >
    <slot name="icon-left" slot="icon-left"></slot>
    <slot name="icon-right" slot="icon-right"></slot>
  </ui-input>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { InputProps } from "../types";

defineOptions({
  name: "KInput",
});

withDefaults(defineProps<InputProps>(), {
  type: "text",
  modelValue: "",
  size: "md",
  disabled: false,
  readonly: false,
  autocomplete: "off",
  autofocus: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  input: [value: string];
  blur: [];
  focus: [];
}>();

const inputRef = ref<any>(null);

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

// Expose validate method for form validation
const validate = (allValues?: any) => {
  return inputRef.value?.validate(allValues) || "";
};

const markTouchedAndValidate = (allValues?: any) => {
  return inputRef.value?.markTouchedAndValidate(allValues) || "";
};

defineExpose({
  validate,
  markTouchedAndValidate,
});
</script>
