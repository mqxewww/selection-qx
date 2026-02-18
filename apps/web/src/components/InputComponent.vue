<script setup lang="ts">
import type { Component } from "vue";

type Props = {
  label: string;
  icon: Component;
  type?: string;
  placeholder?: string;
  modelValue: string | number;
};

defineProps<Props>();
const model = defineModel<string | number>({ required: true });
</script>

<template>
  <div class="space-y-1.5">
    <label class="text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
      {{ label }}
    </label>
    <div class="relative">
      <component
        :is="icon"
        class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500"
      />

      <input
        v-model="model"
        :type="type || 'text'"
        required
        :placeholder="placeholder"
        class="w-full [appearance:textfield] rounded-xl border border-zinc-700/50 bg-zinc-900/50 py-2.5 pr-4 pl-10 text-sm text-zinc-200 placeholder-zinc-600 transition-all outline-none focus:border-blue-500/50 focus:bg-zinc-900 focus:ring-1 focus:ring-blue-500/20 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </div>
  </div>
</template>
