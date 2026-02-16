<script setup lang="ts">
defineProps<{
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}>();
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled || loading"
    :class="[
      'flex items-center gap-2 rounded-lg px-6 py-2 text-[13px] font-bold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50',
      variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
      variant === 'secondary' && 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      variant === 'ghost' && 'text-gray-400 hover:bg-gray-50',
      !variant && 'bg-blue-600 text-white hover:bg-blue-700',
    ]"
  >
    <slot />
  </button>
</template>
