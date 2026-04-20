<script setup lang="ts"></script>

<template>
  <div
    class="relative h-64 w-full animate-pulse overflow-hidden rounded-3xl border border-zinc-700/50 bg-zinc-800 shadow-xl"
  ></div>

  <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
    <div class="space-y-6 lg:col-span-2">
      <div class="rounded-2xl border border-zinc-700/50 bg-zinc-800 p-6 md:p-8">
        <div class="space-y-6">
          <div class="h-80 animate-pulse" />
        </div>
      </div>
    </div>

    <div class="space-y-6">
      <div class="rounded-2xl border border-zinc-700/50 bg-zinc-800 p-6">
        <div class="space-y-5">
          <div class="h-24 animate-pulse" />
        </div>
      </div>

      <div
        class="rounded-2xl border border-zinc-700/50 bg-zinc-800/50 px-6 py-5"
      >
        <div class="mb-4 h-20 animate-pulse" />
      </div>
    </div>
  </div>
</template>
