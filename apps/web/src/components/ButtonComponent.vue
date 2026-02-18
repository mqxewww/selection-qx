<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import { computed } from "vue";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface Props {
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  loading: false,
  disabled: false,
  type: "button",
  class: "",
});

const baseClasses =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-[13px] font-bold transition-all focus:outline-none active:scale-95 disabled:opacity-50 hover:cursor-pointer disabled:hover:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/30",

  secondary:
    "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 hover:bg-zinc-500/20 hover:text-zinc-200 hover:border-zinc-500/30",

  danger:
    "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30",

  ghost: "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800",
};

const classes = computed(() => {
  return [baseClasses, variants[props.variant], props.class].join(" ");
});
</script>

<template>
  <button
    :type="props.type"
    :class="classes"
    :disabled="props.disabled || props.loading"
  >
    <Loader2 v-if="props.loading" class="h-4 w-4 animate-spin" />
    <slot v-else />
  </button>
</template>
