<script setup lang="ts">
import { BookOpen, ChevronDown, ChevronUp, Plus } from "lucide-vue-next";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ButtonComponent from "~web/components/ButtonComponent.vue";
import EmptyOrErrorComponent from "~web/components/EmptyOrErrorComponent.vue";
import { useApi } from "~web/composables/useApi.ts";
import { usePagination } from "~web/composables/usePagination.ts";
import CourseCardComponent from "~web/domains/courses/components/CourseCardComponent.vue";
import CoursesLoadingSkeleton from "~web/domains/courses/components/skeletons/CoursesLoadingSkeleton.vue";
import {
  CoursesResponse,
  coursesService,
} from "~web/domains/courses/courses.service.ts";
import CourseCreateModal from "~web/domains/courses/modals/CourseCreateModal.vue";
import { getFullMonths } from "~web/libs/utils.ts";

const PAGE_SIZE = 6;

const route = useRoute();
const router = useRouter();

const { loading, execute, data, genericError } = useApi<CoursesResponse>({
  items: [],
  meta: { totalItems: 0 },
});

const isModalOpen = ref(false);

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
      <ButtonComponent
        :disabled="loading || !!genericError"
        @click="isModalOpen = true"
      >
        <Plus class="h-4 w-4" />
        Nouvelle formation
      </ButtonComponent>
    </div>

    <div class="flex min-h-175 gap-4 pt-6">
      <div class="min-w-0 flex-1">
        <CoursesLoadingSkeleton v-if="loading" />

        <div
          v-else-if="genericError"
          class="flex h-full items-center justify-center"
        >
          <EmptyOrErrorComponent :icon="BookOpen" />
        </div>

        <div
          v-else-if="data.items.length === 0"
          class="flex h-full items-center justify-center"
        >
          <EmptyOrErrorComponent
            :icon="BookOpen"
            custom-title="Aucune formation disponible"
            custom-desc="Le catalogue est vide pour le moment. Commencez par créer votre première formation."
          />
        </div>

        <div v-else class="grid grid-cols-3 content-start gap-4">
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
              :bg-image="course.bgImagePath"
            />
          </RouterLink>
        </div>
      </div>

      <div
        v-if="totalPages > 1"
        class="flex flex-col items-center justify-center gap-2 pl-2"
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
