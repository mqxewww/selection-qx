<script lang="ts" setup>
interface Props {
  title: string;
  description: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="w-full rounded-lg bg-white p-4 shadow lg:p-6">
    <slot name="backwards" />

    <div class="flex items-center justify-between mb-1">
      <h2 class="text-2xl font-semibold text-gray-900">{{ props.title }}</h2>

      <slot name="button" />
    </div>

    <p class="mb-6 text-sm text-gray-500">{{ props.description }}</p>

    <slot />
  </div>
</template>
