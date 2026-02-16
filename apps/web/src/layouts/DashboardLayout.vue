<script setup lang="ts">
import DashboardHeader from "~/layouts/DashboardHeader.vue";
</script>

<template>
  <div class="flex min-h-screen min-w-5xl flex-col bg-gray-50">
    <DashboardHeader />

    <main class="flex-1 p-8">
      <div class="mx-auto max-w-7xl">
        <slot />
      </div>
    </main>
  </div>
</template>
