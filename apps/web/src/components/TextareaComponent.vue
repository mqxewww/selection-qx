<script setup lang="ts">
import type { Component } from "vue";

type Props = {
  label: string;
  icon: Component;
  rows?: number;
  placeholder?: string;
  error?: string;
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
        class="absolute top-3 left-3 h-4 w-4 transition-colors"
        :class="error ? 'text-red-400' : 'text-zinc-500'"
      />
      <textarea
        v-model="model"
        :rows="rows || 3"
        required
        :placeholder="placeholder"
        class="w-full resize-none rounded-xl bg-zinc-900/50 py-2.5 pr-4 pl-10 text-sm placeholder-zinc-600 transition-all outline-none focus:ring-1"
        :class="
          error
            ? 'border border-red-500/50 text-zinc-100 focus:border-red-500 focus:ring-red-500/20'
            : 'border border-zinc-700/50 text-zinc-200 focus:border-blue-500/50 focus:ring-blue-500/20'
        "
      />
    </div>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
    >
      <p v-if="error" class="text-xs font-medium text-red-400">
        {{ error }}
      </p>
    </Transition>
  </div>
</template>
