<script setup lang="ts">
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "lucide-vue-next";
import { ToastType, useToast } from "~web/composables/useToast.ts";

const { toasts, removeToast } = useToast();

const getIcon = (type: ToastType) => {
  switch (type) {
    case ToastType.SUCCESS:
      return CheckCircle;

    case ToastType.ERROR:
      return AlertCircle;

    case ToastType.WARNING:
      return AlertTriangle;

    case ToastType.INFO:
    default:
      return Info;
  }
};

const getColorClasses = (type: ToastType) => {
  switch (type) {
    case ToastType.SUCCESS:
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";

    case ToastType.ERROR:
      return "text-red-400 bg-red-500/10 border-red-500/20";

    case ToastType.WARNING:
      return "text-amber-400 bg-amber-500/10 border-amber-500/20";

    case ToastType.INFO:
      return "text-blue-400 bg-blue-500/10 border-blue-500/20";

    default:
      return "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";
  }
};
</script>

<template>
  <div
    class="top pointer-events-none fixed right-4 z-100 flex flex-col gap-3 sm:top-6 sm:right-6"
  >
    <TransitionGroup
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in absolute right-0"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
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
          <p class="text-[15px] leading-relaxed font-medium text-zinc-200">
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
