<template>
  <div class="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-primary/10 dark:bg-primary/20">
    <p class="text-black/80 dark:text-white/80 text-base font-medium">
      {{ label }}
    </p>
    <p class="text-black dark:text-white text-3xl font-bold">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
})
</script>
