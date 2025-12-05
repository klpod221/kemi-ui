<template>
  <ui-progress
    :percent="percent"
    :status="status"
    :show-info="showInfo"
    :stroke-width="strokeWidth"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: "KProgress",
});

defineProps<{
  percent?: number;
  status?: "success" | "error" | "warning" | "active";
  showInfo?: boolean;
  strokeWidth?: number;
}>();
</script>
