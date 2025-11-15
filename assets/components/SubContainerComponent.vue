<script lang="ts" setup>
interface Props {
  title: string;
  description?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="w-full rounded-lg p-3 border border-gray-300 lg:p-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900">{{ props.title }}</h2>

      <slot name="button" />
    </div>

    <p class="mb-6 text-sm text-gray-500">{{ props.description }}</p>

    <slot />
  </div>
</template>
