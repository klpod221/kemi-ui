<template>
  <ui-badge :variant="variant" :dot="dot">
    <slot></slot>
  </ui-badge>
</template>

<script setup lang="ts">
defineOptions({
  name: "KBadge",
});

defineProps<{
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  dot?: boolean;
}>();
</script>
