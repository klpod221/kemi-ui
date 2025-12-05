<template>
  <ui-table
    :ref="(el: any) => tableRef = el"
    :columns="columns"
    :data-source="dataSource"
    :loading="loading"
    :pagination="pagination"
    @change="handleChange"
  >
    <slot></slot>
  </ui-table>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TableColumn, DataSourceParams } from "@klpod221/kemi-ui";

defineOptions({
  name: "KTable",
});

defineProps<{
  columns?: TableColumn[];
  dataSource?: any[] | ((params: DataSourceParams) => Promise<any>);
  loading?: boolean;
  pagination?: boolean | object;
}>();

const emit = defineEmits<{
  change: [params: DataSourceParams];
}>();

const tableRef = ref<any>(null);

const handleChange = (event: CustomEvent) => {
  emit("change", event.detail);
};
</script>
