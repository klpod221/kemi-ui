<template>
  <ui-dropdown :trigger="trigger" :placement="placement">
    <slot></slot>
    <slot name="dropdown" slot="dropdown"></slot>
  </ui-dropdown>
</template>

<script setup lang="ts">
defineOptions({
  name: "KDropdown",
});

defineProps<{
  trigger?: "click" | "hover";
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
}>();
</script>
