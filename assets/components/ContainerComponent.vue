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

    <div class="mb-1 flex items-center justify-between">
      <Skeleton v-if="isLoading" class="h-8 w-32 rounded-md" />
      <h2 v-else class="text-2xl font-semibold text-gray-900">
        {{ props.title }}
      </h2>

      <slot name="button" />
    </div>

    <Skeleton v-if="isLoading" class="mt-1 h-4 w-64 rounded-md" />
    <p v-else class="mb-6 text-sm text-gray-500">
      {{ props.description }}
    </p>

    <slot />
  </div>
</template>
