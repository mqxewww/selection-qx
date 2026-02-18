<script setup lang="ts">
import HeaderComponent from "~/layouts/components/HeaderComponent.vue";
</script>

<template>
  <HeaderComponent />

  <main class="flex w-full flex-1 flex-col px-4 pt-32 pb-32 sm:px-6 lg:px-8">
    <router-view />
  </main>
</template>
