<script lang="ts" setup>
import { ref } from "vue";

type User = {
  name: string;
};

const count = ref(0);

const user = ref<User>({ name: "Maxence" });

function increment(): void {
  count.value++;
}
</script>

<template>
  <div>Welcome to Vue.js {{ user.name }} !</div>
  <button @click="increment">Count is: {{ count }}</button>
</template>

<style scoped></style>
