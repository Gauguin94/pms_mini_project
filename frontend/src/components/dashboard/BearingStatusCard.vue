<template>
  <div :class="['flex flex-col gap-4 rounded-xl border p-4', statusClass]">
    <div class="flex items-center gap-4">
      <div
        :class="[
          'flex h-12 w-12 items-center justify-center rounded-full',
          iconBgClass,
          iconColorClass,
        ]"
      >
        <span class="material-symbols-outlined text-3xl">{{ icon }}</span>
      </div>
      <div class="flex flex-col">
        <p class="text-lg font-bold text-black dark:text-white">{{ bearingId }}</p>
        <p :class="textClass">{{ status }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  bearingId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  statusClass: {
    type: String,
    default: '',
  },
  iconBgClass: {
    type: String,
    default: '',
  },
  iconColorClass: {
    type: String,
    default: '',
  },
  textClass: {
    type: String,
    default: '',
  },
})
</script>
