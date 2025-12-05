<template>
  <ui-pagination
    :current="modelValue"
    :total="total"
    :page-size="pageSize"
    :show-size-changer="showSizeChanger"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: "KPagination",
});

defineProps<{
  modelValue?: number;
  total: number;
  pageSize?: number;
  showSizeChanger?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [page: number];
  change: [page: number, pageSize: number];
}>();

const handleChange = (event: CustomEvent) => {
  const { page, pageSize } = event.detail;
  emit("update:modelValue", page);
  emit("change", page, pageSize);
};
</script>
