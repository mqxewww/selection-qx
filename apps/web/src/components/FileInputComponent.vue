<script setup lang="ts">
import type { Component } from "vue";

type Props = {
  label: string;
  icon: Component;
  accept?: string;
  error?: string;
};

defineProps<Props>();

const model = defineModel<File | null>({ required: true });

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  model.value =
    target.files && target.files?.length > 0 ? target.files[0]! : null;
};
</script>

<template>
  <div class="space-y-1.5">
    <label class="text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
      {{ label }}
    </label>

    <div class="relative">
      <component
        :is="icon"
        class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors"
        :class="error ? 'text-red-400' : 'pointer-events-none text-zinc-500'"
      />

      <input
        type="file"
        :accept="accept"
        class="w-full cursor-pointer rounded-xl bg-zinc-900/50 py-1.5 pr-4 pl-10 text-sm text-zinc-400 transition-all outline-none file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-zinc-800 file:px-4 file:py-1 file:text-xs file:font-semibold file:text-zinc-200 file:shadow-sm file:transition-all hover:file:bg-zinc-700 hover:file:text-white focus:ring-1"
        :class="
          error
            ? 'border border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
            : 'border border-zinc-700/50 focus:border-blue-500/50 focus:ring-blue-500/20'
        "
        @change="handleFileChange"
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
