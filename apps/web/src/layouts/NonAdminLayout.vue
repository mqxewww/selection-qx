<script setup lang="ts">
import HeaderComponent from "~web/layouts/components/HeaderComponent.vue";
</script>

<template>
  <HeaderComponent />

  <main class="flex w-full flex-1 flex-col px-8 pt-20 pb-12">
    <router-view />
  </main>
</template>
