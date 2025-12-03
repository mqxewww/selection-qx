<script lang="ts" setup>
import { Skeleton } from "~/components/ui/skeleton";
</script>

<template>
  <div
    v-for="n in 3"
    :key="'skel-' + n"
    class="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg"
  >
    <div class="h-48 w-full">
      <Skeleton class="h-full w-full" />
    </div>

    <div class="flex flex-grow flex-col space-y-4 p-4">
      <div class="flex flex-col space-y-2">
        <Skeleton class="h-6 w-3/4 rounded-md" />
        <div class="flex space-x-2">
          <Skeleton class="h-4 w-2/3 rounded-md" />
        </div>
      </div>

      <div class="flex flex-col space-y-2">
        <div class="inline-flex items-center text-center text-sm">
          <Skeleton class="mr-1.5 h-5 w-5 rounded-full" />
          <Skeleton class="h-4 w-28 rounded-md" />
        </div>
        <div class="inline-flex items-center text-center text-sm">
          <Skeleton class="mr-1.5 h-5 w-5 rounded-full" />
          <Skeleton class="h-4 w-28 rounded-md" />
        </div>
        <div class="inline-flex items-center text-center text-sm">
          <Skeleton class="mr-1.5 h-5 w-5 rounded-full" />
          <Skeleton class="h-4 w-28 rounded-md" />
        </div>
      </div>

      <div class="flex justify-center">
        <Skeleton class="h-10 w-36 rounded-2xl" />
      </div>
    </div>
  </div>
</template>
