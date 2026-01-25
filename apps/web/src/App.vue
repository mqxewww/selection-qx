<script setup lang="ts">
import { onMounted, ref } from "vue";
import { client } from "~/libs/client.ts";

const message = ref<number>(0);

onMounted(async () => {
  const courses = await client.courses[":id"].$get({ param: { id: "4" } });
  const res = await client.port.$get();

  if (courses.ok) {
    const data = await courses.json();
    console.log(data);
  }

  if (res.ok) {
    const data = await res.json();
    message.value = data.port;
  }
});
</script>

<template>
  <h1 class="text-red-500">You did it!</h1>
  <p>API runs on port : {{ message }}</p>
</template>
