<template>
  <ui-avatar :src="src" :alt="alt" :size="size" :shape="shape">
    <slot></slot>
  </ui-avatar>
</template>

<script setup lang="ts">
defineOptions({
  name: "KAvatar",
});

defineProps<{
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  shape?: "circle" | "square";
}>();
</script>
