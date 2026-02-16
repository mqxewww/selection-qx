<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { onMounted, ref } from "vue";
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
  try {
    courses.value = await execute(() => coursesService.getAll());
  } finally {
  }
};

onMounted(fetchCourses);
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
        v-if="!loading"
        class="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-[13px] font-bold text-blue-600 transition-all outline-none hover:cursor-pointer hover:bg-blue-100 active:scale-95"
        @click="isModalOpen = true"
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
        ></CourseCardComponent>
      </RouterLink>
    </div>

    <CourseCreateModal
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @success="fetchCourses"
    />
  </div>
</template>
