<template>
  <ui-tag :variant="variant" :closable="closable" @close="handleClose">
    <slot></slot>
  </ui-tag>
</template>

<script setup lang="ts">
defineOptions({
  name: "KTag",
});

defineProps<{
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  closable?: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const handleClose = () => {
  emit("close");
};
</script>
