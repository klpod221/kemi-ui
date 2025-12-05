<template>
  <ui-button
    :variant="variant"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :title="title"
    :type="type"
    @click="handleClick"
  >
    <slot name="icon" slot="icon"></slot>
    <slot></slot>
    <slot name="icon-right" slot="icon-right"></slot>
  </ui-button>
</template>

<script setup lang="ts">
import type { ButtonProps } from "../types";

defineOptions({
  name: "KButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  type: "button",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>
