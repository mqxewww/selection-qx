<script lang="ts" setup>
import { Skeleton } from "~/components/ui/skeleton";

interface Props {
  title?: string;
  description?: string;
  isLoading?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="w-full rounded-lg bg-white p-4 shadow lg:p-6">
    <slot name="backwards" />

    <div class="flex items-center justify-between mb-1">
      <Skeleton v-if="isLoading" class="w-32 h-8 rounded-md" />
      <h2 v-else class="text-2xl font-semibold text-gray-900">{{ props.title }}</h2>

      <slot name="button" />
    </div>

    <Skeleton v-if="isLoading" class="w-64 mt-1 h-4 rounded-md" />
    <p v-else class="mb-6 text-sm text-gray-500">{{ props.description }}</p>

    <slot />
  </div>
</template>
