<template>
  <ui-code-editor
    :ref="(el: any) => editorRef = el"
    :value="modelValue"
    :language="language"
    :readonly="readonly"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "KCodeEditor",
});

defineProps<{
  modelValue?: string;
  language?: string;
  readonly?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const editorRef = ref<any>(null);

const handleChange = (event: CustomEvent) => {
  const value = event.detail.value;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>
