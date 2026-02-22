<script setup lang="ts">
import { ChevronDown, ChevronUp, Plus } from "lucide-vue-next";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ButtonComponent from "~/components/ButtonComponent.vue";
import { useApi } from "~/composables/useApi.ts";
import { usePagination } from "~/composables/usePagination.ts";
import CourseCardComponent from "~/domains/courses/components/CourseCardComponent.vue";
import CoursesEmptyListState from "~/domains/courses/components/CoursesEmptyListState.vue";
import {
  CoursesResponse,
  coursesService,
} from "~/domains/courses/courses.service.ts";
import CourseCreateModal from "~/domains/courses/modals/CourseCreateModal.vue";
import { getFullMonths } from "~/libs/utils.ts";

const PAGE_SIZE = 6;

const route = useRoute();
const router = useRouter();

const { loading, execute, data } = useApi<CoursesResponse>({
  items: [],
  meta: { totalItems: 0 },
});

const { currentPage, totalPages, goToPage } = usePagination(
  PAGE_SIZE,
  computed(() => data.value.meta.totalItems),
);

const fetchCourses = async () => {
  await execute(() => coursesService.getAll(currentPage.value, PAGE_SIZE));
};

watch(currentPage, (newPage) => {
  router.replace({ query: { ...route.query, page: newPage } });

  fetchCourses();
});

const isModalOpen = ref(false);

if (route.query.page) {
  currentPage.value = Number(route.query.page);
}

onMounted(fetchCourses);
</script>

<template>
  <div class="mx-auto flex w-full max-w-6xl flex-col">
    <div
      class="flex items-center justify-between border-b border-zinc-800 pb-6"
    >
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-zinc-100">
          Formations
        </h1>
        <p class="mt-1 text-sm text-zinc-400">
          Observez le catalogue des formations disponibles.
        </p>
      </div>
      <ButtonComponent :disabled="loading" @click="isModalOpen = true">
        <Plus class="h-4 w-4" />
        Nouvelle formation
      </ButtonComponent>
    </div>

    <div class="flex gap-4 pt-6">
      <div class="min-w-0 flex-1">
        <div v-if="loading" class="grid grid-cols-3 gap-4">
          <div
            v-for="n in 6"
            :key="n"
            class="flex flex-col overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-800"
          >
            <div class="h-40 w-full animate-pulse bg-zinc-700" />
            <div class="flex flex-1 flex-col p-4">
              <div
                class="mb-2 h-5 w-2/3 animate-pulse rounded-md bg-zinc-700"
              />
              <div
                class="mb-1 h-3 w-full animate-pulse rounded-md bg-zinc-700"
              />
              <div
                class="mb-4 h-3 w-4/5 animate-pulse rounded-md bg-zinc-700"
              />
              <div
                class="mt-auto flex items-center justify-between border-t border-zinc-700/50 pt-3"
              >
                <div class="flex gap-3">
                  <div class="h-4 w-12 animate-pulse rounded-md bg-zinc-700" />
                  <div class="h-4 w-16 animate-pulse rounded-md bg-zinc-700" />
                </div>
                <div class="h-7 w-7 animate-pulse rounded-full bg-zinc-700" />
              </div>
            </div>
          </div>
        </div>

        <div
          v-else-if="!data.items.length"
          class="flex h-full items-center justify-center"
        >
          <CoursesEmptyListState />
        </div>

        <div v-else class="grid grid-cols-3 gap-4">
          <RouterLink
            v-for="course in data.items"
            :key="course.id"
            :to="`/courses/${course.id}`"
            class="block"
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
              :bg-image="course.bgImage"
            />
          </RouterLink>
        </div>
      </div>

      <div
        v-if="totalPages > 1"
        class="flex flex-col items-center gap-2 self-center pl-2"
      >
        <ButtonComponent
          :disabled="currentPage === 1"
          :variant="'ghost'"
          @click="goToPage(currentPage - 1)"
        >
          <ChevronUp class="h-4 w-4" />
        </ButtonComponent>

        <ButtonComponent
          v-for="page in totalPages"
          :key="page"
          :variant="page === currentPage ? 'primary' : 'secondary'"
          @click="goToPage(page)"
        >
          {{ page }}
        </ButtonComponent>

        <ButtonComponent
          :disabled="currentPage === totalPages"
          :variant="'ghost'"
          @click="goToPage(currentPage + 1)"
        >
          <ChevronDown class="h-4 w-4" />
        </ButtonComponent>

        <span
          class="mt-2 text-xs font-medium tracking-widest text-zinc-600 uppercase"
        >
          {{ currentPage }}/{{ totalPages }}
        </span>
      </div>
    </div>
  </div>

  <CourseCreateModal
    :is-open="isModalOpen"
    @close="isModalOpen = false"
    @success="fetchCourses"
  />
</template>
