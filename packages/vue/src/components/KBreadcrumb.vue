<template>
  <ui-breadcrumb :separator="separator">
    <slot></slot>
  </ui-breadcrumb>
</template>

<script setup lang="ts">
defineOptions({
  name: "KBreadcrumb",
});

defineProps<{
  separator?: string;
}>();
</script>
