<template>
  <header
    class="flex items-center justify-between whitespace-nowrap border-b border-primary/20 dark:border-primary/30 px-10 py-3"
  >
    <div class="flex items-center gap-4 text-black dark:text-white">
      <div class="size-6 text-primary">
        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path
            clip-rule="evenodd"
            d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
            fill="currentColor"
            fill-rule="evenodd"
          ></path>
        </svg>
      </div>
      <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">베어링 인사이트</h2>
    </div>
    <div class="flex items-center gap-4">
      <button
        class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20"
      >
        <svg
          fill="currentColor"
          height="20px"
          viewBox="0 0 256 256"
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
          ></path>
        </svg>
      </button>
      <div
        class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
        style="
          background-image: url('https://cdn.usegalileo.ai/stability/d1d6d8b9-6c5f-4e73-b8e4-f878c0e4e1f7.png');
        "
      ></div>
    </div>
  </header>
</template>

<script setup>
// Header 컴포넌트 - 로고, 타이틀, 알림, 프로필
</script>
