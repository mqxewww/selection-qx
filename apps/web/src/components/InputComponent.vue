<script setup lang="ts">
import type { Component } from "vue";

type Props = {
  label: string;
  icon: Component;
  type?: string;
  placeholder?: string;
};

defineProps<Props>();
const model = defineModel<string | number>({ required: true });
</script>

<template>
  <div class="space-y-1.5">
    <label
      class="text-[11px] font-bold tracking-wider text-gray-400 uppercase"
      >{{ label }}</label
    >
    <div class="relative">
      <component
        :is="icon"
        class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300"
      />
      <input
        v-model="model"
        :type="type || 'text'"
        required
        :placeholder="placeholder"
        class="w-full rounded-xl border border-gray-100 bg-gray-50/50 py-2.5 pr-4 pl-10 text-sm transition-all outline-none focus:border-blue-200 focus:bg-white"
      />
    </div>
  </div>
</template>
