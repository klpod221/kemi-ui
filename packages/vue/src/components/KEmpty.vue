<template>
  <ui-empty :description="description">
    <slot></slot>
  </ui-empty>
</template>

<script setup lang="ts">
defineOptions({
  name: "KEmpty",
});

defineProps<{
  description?: string;
}>();
</script>
