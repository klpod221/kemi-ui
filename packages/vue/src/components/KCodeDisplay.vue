<template>
  <ui-code-display
    :language="language"
    :code="code"
    :show-line-numbers="showLineNumbers"
  >
    <slot></slot>
  </ui-code-display>
</template>

<script setup lang="ts">
defineOptions({
  name: "KCodeDisplay",
});

defineProps<{
  language?: string;
  code?: string;
  showLineNumbers?: boolean;
}>();
</script>
