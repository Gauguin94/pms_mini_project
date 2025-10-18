<template>
  <div v-if="logId" class="flex flex-col gap-4">
    <h2 class="text-black dark:text-white text-2xl font-bold">로그 #{{ logId }}</h2>
    <div class="rounded-lg border border-primary/20 dark:border-primary/30 bg-zinc-900 p-4">
      <div class="h-64 overflow-y-auto font-mono text-sm text-white">
        <p v-for="(logLine, index) in logLines" :key="index" v-html="logLine"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  logId: {
    type: String,
    default: null,
  },
  logLines: {
    type: Array,
    default: () => [],
  },
})
</script>
