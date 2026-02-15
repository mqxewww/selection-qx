<script setup lang="ts">
import { InferResponseType } from "hono/client";
import { Plus } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import CardComponent from "~/components/CardComponent.vue";
import { client } from "~/libs/client.ts";
import { getFullMonths } from "~/libs/utils.ts";

type CoursesResponse = InferResponseType<typeof client.courses.$get, 200>;

const courses = ref<CoursesResponse>([]);

onMounted(async () => {
  const data = await client.courses.$get();

  if (data.ok) {
    courses.value = await data.json();
  }
});
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-gray-800">
          Formations
        </h1>
        <p class="text-sm text-gray-400">
          Gérez le catalogue des programmes et leurs critères.
        </p>
      </div>

      <button
        class="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-[13px] font-bold text-blue-600 transition-all outline-none hover:cursor-pointer hover:bg-blue-100 active:scale-95"
      >
        <Plus class="h-4 w-4" />
        Nouvelle formation
      </button>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="course in courses"
        :key="course.id"
        :to="`/courses/${course.id}`"
      >
        <CardComponent
          :title="course.title"
          :description="course.description"
          :student-count="15"
          :duration="
            getFullMonths(
              new Date(course.periodStart),
              new Date(course.periodEnd),
            )
          "
        ></CardComponent>
      </RouterLink>
    </div>
  </div>
</template>
