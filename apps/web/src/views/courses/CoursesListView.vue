<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import ButtonComponent from "~/components/ButtonComponent.vue";
import { useApi } from "~/composables/useApi.ts";
import CourseCardComponent from "~/domains/courses/components/CourseCardComponent.vue";
import {
  CoursesResponse,
  coursesService,
} from "~/domains/courses/courses.service.ts";
import CourseCreateModal from "~/domains/courses/modals/CourseCreateModal.vue";
import { getFullMonths } from "~/libs/utils.ts";

const { loading, execute } = useApi<CoursesResponse>();

const courses = ref<CoursesResponse>([]);
const isModalOpen = ref(false);

const fetchCourses = async () => {
  courses.value = await execute(() => coursesService.getAll());
};

onMounted(fetchCourses);
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-8">
    <div
      class="flex items-center justify-between border-b border-zinc-800 pb-8"
    >
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-zinc-100">
          Formations
        </h1>
        <p class="mt-1 text-sm text-zinc-400">
          Observez le catalogue des formations disponibles.
        </p>
      </div>

      <ButtonComponent v-if="!loading" @click="isModalOpen = true">
        <Plus class="h-4 w-4" />
        Nouvelle formation
      </ButtonComponent>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="course in courses"
        :key="course.id"
        :to="`/courses/${course.id}`"
        class="block h-full"
      >
        <CourseCardComponent
          :title="course.title"
          :description="course.description"
          :student-count="15"
          :duration="
            getFullMonths(
              new Date(course.periodStart),
              new Date(course.periodEnd),
            )
          "
          class="h-full"
        />
      </RouterLink>
    </div>

    <CourseCreateModal
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @success="fetchCourses"
    />
  </div>
</template>
