<script setup lang="ts">
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "lucide-vue-next";
import { useToast } from "~web/composables/useToast.ts";

const { toasts, removeToast } = useToast();

const getIcon = (type: string) => {
  switch (type) {
    case "success":
      return CheckCircle;

    case "error":
      return AlertCircle;

    case "warning":
      return AlertTriangle;

    case "info":
    default:
      return Info;
  }
};

const getColorClasses = (type: string) => {
  switch (type) {
    case "success":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";

    case "error":
      return "text-red-400 bg-red-500/10 border-red-500/20";

    case "warning":
      return "text-amber-400 bg-amber-500/10 border-amber-500/20";

    case "info":
      return "text-blue-400 bg-blue-500/10 border-blue-500/20";

    default:
      return "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";
  }
};
</script>

<template>
  <div
    class="pointer-events-none fixed right-4 bottom-4 z-100 flex flex-col gap-3 sm:right-6 sm:bottom-6"
  >
    <TransitionGroup
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in absolute right-0"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-2"
      move-class="transition-transform duration-300"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex w-80 items-center gap-3 rounded-2xl border border-zinc-700/50 bg-zinc-800/95 p-4 shadow-xl shadow-black/40 backdrop-blur-md sm:w-96"
      >
        <div
          :class="[
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
            getColorClasses(toast.type),
          ]"
        >
          <component :is="getIcon(toast.type)" class="h-4 w-4" />
        </div>

        <div class="flex-1">
          <p class="text-[13px] leading-relaxed font-medium text-zinc-200">
            {{ toast.message }}
          </p>
        </div>

        <button
          class="shrink-0 rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-700 hover:text-zinc-300 focus:outline-none"
          @click="removeToast(toast.id)"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
