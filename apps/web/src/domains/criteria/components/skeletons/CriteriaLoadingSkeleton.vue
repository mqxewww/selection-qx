<script setup lang="ts"></script>

<template>
  <div class="rounded-2xl border border-zinc-700/50 bg-zinc-800 p-6 md:p-8">
    <div class="h-24 animate-pulse rounded-md" />
  </div>

  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="n in 3"
      :key="n"
      class="flex flex-col rounded-2xl border border-zinc-700/50 bg-zinc-800 p-6"
    >
      <div class="mb-6 flex items-center gap-3">
        <div class="h-5 w-5 animate-pulse rounded-md bg-zinc-700/50" />
        <div class="h-6 w-2/3 animate-pulse rounded-md bg-zinc-700/50" />
      </div>
      <div class="mb-6 flex-1 space-y-3">
        <div
          v-for="i in 2"
          :key="i"
          class="h-10 w-full animate-pulse rounded-xl bg-zinc-900/50"
        />
      </div>
      <div class="mt-auto flex gap-3 border-t border-zinc-700/50 pt-5">
        <div class="h-10 flex-1 animate-pulse rounded-lg bg-zinc-700/50" />
        <div class="h-10 w-12 animate-pulse rounded-lg bg-zinc-700/50" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
