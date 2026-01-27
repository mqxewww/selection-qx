<script setup lang="ts">
import { onMounted, ref } from "vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
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
  <DashboardLayout>
    <router-view />
  </DashboardLayout>
</template>
