<script setup lang="ts"></script>

<template>
  <header
    class="pointer-events-none fixed top-0 right-0 left-0 z-50 w-full select-none"
  >
    <div class="flex justify-center px-4 pt-4">
      <nav
        class="pointer-events-auto relative flex items-center gap-1 rounded-2xl border border-zinc-700/50 bg-zinc-900/80 px-2 py-2 shadow-xl shadow-black/30 backdrop-blur-md"
      >
        <div class="flex items-center px-1">
          <div class="h-5 w-px bg-zinc-700/60" />
          <img
            width="36"
            height="36"
            src="/favicon.svg"
            alt="icon"
            class="mx-3"
            loading="eager"
          />
          <div class="h-5 w-px bg-zinc-700/60" />
        </div>
      </nav>
    </div>
  </header>

  <main class="flex w-full flex-1 flex-col px-8 pt-32 pb-32">
    <router-view />
  </main>
</template>
