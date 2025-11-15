<script lang="ts" setup>
import DefaultLayout from "~/layouts/DefaultLayout.vue";

const layoutComponent = DefaultLayout;
</script>

<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>
