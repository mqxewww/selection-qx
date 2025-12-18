<script lang="ts" setup>
import { CalendarDays, DoorOpen, Eye, FilePlusCorner, UserRound } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import ContainerComponent from "~/components/ContainerComponent.vue";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { isoToYear } from "~/lib/utils.ts";
import {
  CourseCreateDialog,
  CoursesListEmpty,
  CoursesListSkeleton,
} from "~/modules/courses/components";
import { useCoursesActions } from "~/modules/courses/useCoursesActions.ts";

const { isFetchingList, coursesList, fetchCoursesList } = useCoursesActions();

const isDialogOpen = ref(false);

onMounted(async () => {
  await fetchCoursesList();
});
</script>

<template>
  <ContainerComponent description="Voir et modifier les formations disponibles" title="Formations">
    <template #button>
      <template v-if="isFetchingList">
        <Skeleton class="h-10 w-48 rounded-2xl" />
      </template>
      <template v-else-if="!coursesList || coursesList.length === 0" />
      <template v-else>
        <Button class="hover:cursor-pointer" @click="isDialogOpen = true">
          <FilePlusCorner class="mt-0.5 h-4 w-4" />
          <span class="hidden lg:block">Ajouter une formation</span>
        </Button>
      </template>
    </template>

    <CoursesListEmpty
      v-if="!isFetchingList && (!coursesList || coursesList.length === 0)"
      v-model="isDialogOpen"
    />
    <template v-else>
      <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <CoursesListSkeleton v-if="isFetchingList" />
        <template v-else>
          <div
            v-for="course in coursesList"
            :key="course.id"
            class="flex flex-col overflow-hidden rounded-lg shadow-lg"
          >
            <img
              alt="Image de la carte"
              class="h-48 w-full object-cover"
              src="https://picsum.photos/800/400"
            />

            <div class="flex flex-grow flex-col space-y-4 p-4">
              <div class="flex flex-col space-y-1">
                <h2 class="w-3/4 text-xl font-semibold text-gray-900">
                  {{ course.title }}
                </h2>

                <p class="line-clamp-2 text-sm text-gray-500">
                  {{ course.description }}
                </p>
              </div>

              <div class="flex flex-col space-y-2">
                <div class="inline-flex items-center text-center text-sm">
                  <CalendarDays class="mr-1.5 h-5 w-5" />
                  <p>
                    Année scolaire
                    <span class="font-semibold">
                      {{ isoToYear(course.periodStart) }} - {{ isoToYear(course.periodEnd) }}
                    </span>
                  </p>
                </div>
                <div class="inline-flex items-center text-center text-sm">
                  <DoorOpen class="mr-1.5 h-5 w-5" />
                  <p>
                    <span class="font-semibold">{{ course.capacity }}</span> étudiants max.
                  </p>
                </div>
                <div class="inline-flex items-center text-center text-sm">
                  <UserRound class="mr-1.5 h-5 w-5" />
                  <p>
                    <span class="font-semibold">{{ course.applicationsCount }}</span> candidatures
                    enregistrées
                  </p>
                </div>
              </div>

              <div class="flex justify-center">
                <RouterLink :to="`/courses/${course.id}`">
                  <Button class="w-full hover:cursor-pointer">
                    <Eye class="mr-2 h-4 w-4" />
                    Voir les détails
                  </Button>
                </RouterLink>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </ContainerComponent>
  <CourseCreateDialog v-model="isDialogOpen" @success="fetchCoursesList" />
</template>
