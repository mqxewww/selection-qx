<script setup lang="ts">
import ToastComponent from "~/components/ToastComponent.vue";
import "./app.css";
</script>

<template>
  <div
    class="flex min-h-screen flex-col bg-zinc-900 bg-linear-to-tl from-zinc-900 to-zinc-800"
  >
    <router-view />

    <ToastComponent />
  </div>
</template>
