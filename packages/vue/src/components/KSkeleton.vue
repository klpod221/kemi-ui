<template>
  <ui-skeleton :loading="loading" :rows="rows" :avatar="avatar">
    <slot></slot>
  </ui-skeleton>
</template>

<script setup lang="ts">
defineOptions({
  name: "KSkeleton",
});

defineProps<{
  loading?: boolean;
  rows?: number;
  avatar?: boolean;
}>();
</script>
