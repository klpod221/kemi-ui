<template>
  <ui-tooltip :placement="placement" :content="content">
    <slot></slot>
  </ui-tooltip>
</template>

<script setup lang="ts">
defineOptions({
  name: "KTooltip",
});

defineProps<{
  placement?: "top" | "bottom" | "left" | "right";
  content?: string;
}>();
</script>
