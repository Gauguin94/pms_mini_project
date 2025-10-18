<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-black dark:text-white text-2xl font-bold">재학습 이력</h2>
    <div class="overflow-x-auto rounded-lg border border-primary/20 dark:border-primary/30">
      <table class="w-full text-left text-sm text-black/80 dark:text-white/80">
        <thead
          class="bg-primary/10 dark:bg-primary/20 text-xs uppercase text-black/60 dark:text-white/60"
        >
          <tr>
            <th class="px-6 py-3" scope="col">ID</th>
            <th class="px-6 py-3" scope="col">시작 시간</th>
            <th class="px-6 py-3" scope="col">종료 시간</th>
            <th class="px-6 py-3" scope="col">상태</th>
            <th class="px-6 py-3" scope="col">지속 시간</th>
            <th class="px-6 py-3" scope="col">메시지</th>
            <th class="px-6 py-3" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(log, index) in logs"
            :key="log.id"
            :class="[
              'bg-background-light dark:bg-background-dark',
              index < logs.length - 1 ? 'border-b border-primary/20 dark:border-primary/30' : '',
            ]"
          >
            <td class="px-6 py-4 font-medium">{{ log.id }}</td>
            <td class="px-6 py-4">{{ log.startTime }}</td>
            <td class="px-6 py-4">{{ log.endTime }}</td>
            <td class="px-6 py-4">
              <span :class="log.statusClass">{{ log.status }}</span>
            </td>
            <td class="px-6 py-4">{{ log.duration }}</td>
            <td class="px-6 py-4">{{ log.message }}</td>
            <td class="px-6 py-4 text-right">
              <a
                class="font-medium text-primary hover:underline cursor-pointer"
                @click="$emit('view-log', log.id)"
                >로그 보기</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  logs: {
    type: Array,
    required: true,
  },
})

defineEmits(['view-log'])
</script>
