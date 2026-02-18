<script setup lang="ts">
import type { Component } from "vue";

type Props = {
  label: string;
  icon: Component;
  rows?: number;
  placeholder?: string;
};

defineProps<Props>();
const model = defineModel<string>({ required: true });
</script>

<template>
  <div class="space-y-1.5">
    <label class="text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
      {{ label }}
    </label>
    <div class="relative">
      <component
        :is="icon"
        class="absolute top-3 left-3 h-4 w-4 text-zinc-500"
      />
      <textarea
        v-model="model"
        :rows="rows || 3"
        required
        :placeholder="placeholder"
        class="w-full resize-none rounded-xl border border-zinc-700/50 bg-zinc-900/50 py-2.5 pr-4 pl-10 text-sm text-zinc-200 placeholder-zinc-600 transition-all outline-none focus:border-blue-500/50 focus:bg-zinc-900 focus:ring-1 focus:ring-blue-500/20"
      />
    </div>
  </div>
</template>
