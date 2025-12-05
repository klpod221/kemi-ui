<template>
  <ui-spin :spinning="spinning" :size="size">
    <slot></slot>
  </ui-spin>
</template>

<script setup lang="ts">
defineOptions({
  name: "KSpin",
});

defineProps<{
  spinning?: boolean;
  size?: "sm" | "md" | "lg";
}>();
</script>
