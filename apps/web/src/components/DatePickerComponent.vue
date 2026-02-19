<script setup lang="ts">
import { Calendar } from "lucide-vue-next";
import { ref } from "vue";

type Props = {
  label: string;
  modelValue: string;
  min?: string;
  max?: string;
  error?: string;
};

defineProps<Props>();
const model = defineModel<string>({ required: true });
const inputRef = ref<HTMLInputElement | null>(null);

const openPicker = () => {
  inputRef.value?.showPicker();
};
</script>

<template>
  <div class="space-y-1.5">
    <label
      v-if="label"
      class="text-[11px] font-bold tracking-wider text-zinc-500 uppercase"
    >
      {{ label }}
    </label>

    <div class="relative cursor-pointer" @click="openPicker">
      <Calendar
        class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors"
        :class="error ? 'text-red-400' : 'text-zinc-500'"
      />

      <input
        ref="inputRef"
        v-model="model"
        type="date"
        required
        :min="min"
        :max="max"
        class="w-full appearance-none rounded-xl bg-zinc-900/50 py-2.5 pr-4 pl-10 text-sm placeholder-zinc-600 [color-scheme:dark] transition-all outline-none focus:ring-1"
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

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none !important;
  opacity: 0;
}
</style>
