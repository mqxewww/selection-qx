<script lang="ts" setup>
import HeaderComponent from "~/components/HeaderComponent.vue";
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <div class="flex flex-1 flex-col">
      <HeaderComponent />

      <section class="flex-1 overflow-y-auto bg-gray-50 p-2 lg:p-4">
        <slot />
      </section>
    </div>
  </div>
</template>
