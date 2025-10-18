<template>
  <div
    class="flex flex-col gap-4 rounded-xl border border-primary/20 dark:border-primary/30 p-6 bg-background-light dark:bg-background-dark"
  >
    <slot name="header">
      <p class="text-black dark:text-white text-lg font-medium">{{ title }}</p>
    </slot>

    <slot name="content">
      <!-- 차트 내용 -->
    </slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>
