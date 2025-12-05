<template>
  <ui-popover :trigger="trigger" :placement="placement" :title="title">
    <slot></slot>
    <slot name="content" slot="content"></slot>
  </ui-popover>
</template>

<script setup lang="ts">
defineOptions({
  name: "KPopover",
});

defineProps<{
  trigger?: "click" | "hover";
  placement?: "top" | "bottom" | "left" | "right";
  title?: string;
}>();
</script>
