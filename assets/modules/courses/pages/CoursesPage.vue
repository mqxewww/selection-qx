<script lang="ts" setup>
import { CalendarDays, DoorOpen, Eye, FilePlusCorner, UserRound } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import ContainerComponent from "~/components/ContainerComponent.vue";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
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
          <FilePlusCorner class="w-4 h-4 mt-0.5" />
          <span class="hidden lg:block">Ajouter une formation</span>
        </Button>
      </template>
    </template>

    <CoursesListEmpty
      v-if="!isFetchingList && (!coursesList || coursesList.length === 0)"
      v-model="isDialogOpen"
    />
    <template v-else>
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">
        <CoursesListSkeleton v-if="isFetchingList" />
        <template v-else>
          <div
            v-for="course in coursesList"
            :key="course.id"
            class="rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <img
              alt="Image de la carte"
              class="w-full h-48 object-cover"
              src="https://picsum.photos/800/400"
            />

            <div class="p-4 flex flex-col space-y-4 flex-grow">
              <div class="flex flex-col space-y-1">
                <h2 class="text-xl font-semibold text-gray-900 w-3/4">
                  {{ course.title }}
                </h2>

                <p class="text-sm text-gray-500 line-clamp-2">
                  {{ course.description }}
                </p>
              </div>

              <div class="flex flex-col space-y-2">
                <div class="text-center inline-flex items-center text-sm">
                  <CalendarDays class="w-5 h-5 mr-1.5" />
                  <p>
                    Année scolaire
                    <span class="font-semibold">
                      {{ course.periodStart }} - {{ course.periodEnd }}
                    </span>
                  </p>
                </div>
                <div class="text-center inline-flex items-center text-sm">
                  <DoorOpen class="w-5 h-5 mr-1.5" />
                  <p>
                    <span class="font-semibold">{{ course.capacity }}</span> étudiants max.
                  </p>
                </div>
                <div class="text-center inline-flex items-center text-sm">
                  <UserRound class="w-5 h-5 mr-1.5" />
                  <p>
                    <span class="font-semibold">{{ course.applicationsCount }}</span> candidatures
                    enregistrées
                  </p>
                </div>
              </div>

              <div class="flex justify-center">
                <RouterLink :to="`/courses/${course.id}`">
                  <Button class="w-full hover:cursor-pointer">
                    <Eye class="w-4 h-4 mr-2" />
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
