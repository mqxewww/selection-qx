<script lang="ts" setup>
import { Skeleton } from "~/components/ui/skeleton";
</script>

<template>
  <div
    v-for="n in 3"
    :key="'skel-' + n"
    class="rounded-lg shadow-lg overflow-hidden flex flex-col bg-white"
  >
    <div class="w-full h-48">
      <Skeleton class="w-full h-full" />
    </div>

    <div class="p-4 flex flex-col space-y-4 flex-grow">
      <div class="flex flex-col space-y-2">
        <Skeleton class="h-6 w-3/4 rounded-md" />
        <div class="flex space-x-2">
          <Skeleton class="h-4 w-2/3 rounded-md" />
        </div>
      </div>

      <div class="flex flex-col space-y-2">
        <div class="text-center inline-flex items-center text-sm">
          <Skeleton class="h-5 w-5 rounded-full mr-1.5" />
          <Skeleton class="h-4 w-28 rounded-md" />
        </div>
        <div class="text-center inline-flex items-center text-sm">
          <Skeleton class="h-5 w-5 rounded-full mr-1.5" />
          <Skeleton class="h-4 w-28 rounded-md" />
        </div>
        <div class="text-center inline-flex items-center text-sm">
          <Skeleton class="h-5 w-5 rounded-full mr-1.5" />
          <Skeleton class="h-4 w-28 rounded-md" />
        </div>
      </div>

      <div class="flex justify-center">
        <Skeleton class="h-10 w-36 rounded-2xl" />
      </div>
    </div>
  </div>
</template>
