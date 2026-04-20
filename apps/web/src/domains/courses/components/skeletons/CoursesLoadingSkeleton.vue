<template>
  <div class="grid grid-cols-3 content-start gap-4">
    <div
      v-for="n in 6"
      :key="n"
      class="flex flex-col overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-800"
    >
      <div class="h-40 w-full animate-pulse bg-zinc-700" />
      <div class="flex flex-1 flex-col p-4">
        <div class="mb-2 h-5 w-2/3 animate-pulse rounded-md bg-zinc-700" />
        <div class="mb-1 h-3 w-full animate-pulse rounded-md bg-zinc-700" />
        <div class="mb-4 h-3 w-4/5 animate-pulse rounded-md bg-zinc-700" />
        <div
          class="mt-auto flex items-center justify-between border-t border-zinc-700/50 pt-3"
        >
          <div class="flex gap-3">
            <div class="h-4 w-12 animate-pulse rounded-md bg-zinc-700" />
            <div class="h-4 w-16 animate-pulse rounded-md bg-zinc-700" />
          </div>
          <div class="h-7 w-7 animate-pulse rounded-full bg-zinc-700" />
        </div>
      </div>
    </div>
  </div>
</template>
