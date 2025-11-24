<script lang="ts" setup>
import {
  CalendarDays,
  DoorOpen,
  Eye,
  FilePlusCorner,
  FileQuestionMark,
  UserRound,
} from "lucide-vue-next";
import { onMounted, ref } from "vue";
import ContainerComponent from "~/components/ContainerComponent.vue";
import CourseCreateDialog from "~/components/dialogs/CourseCreateDialog.vue";
import { Button } from "~/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";
import { Skeleton } from "~/components/ui/skeleton";
import { useCourseList } from "~/composables/courses/useCourseList";

const { data: courses, fetchCoursesList, loading } = useCourseList();

const isCreateDialogOpen = ref(false);

onMounted(async () => {
  await fetchCoursesList();
});
</script>

<template>
  <ContainerComponent description="Voir et modifier les formations disponibles" title="Formations">
    <template #button>
      <template v-if="loading">
        <Skeleton class="h-10 w-48 rounded-2xl" />
      </template>
      <template v-else-if="courses?.length === 0" />
      <template v-else>
        <Button class="hover:cursor-pointer" @click="isCreateDialogOpen = true">
          <FilePlusCorner class="w-4 h-4 mt-0.5" />
          <span class="hidden lg:block">Ajouter une formation</span>
        </Button>
      </template>
    </template>

    <template v-if="!loading && courses?.length === 0">
      <div class="grid grid-cols-1 items-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileQuestionMark />
            </EmptyMedia>
            <EmptyTitle>Aucune formation ajoutée</EmptyTitle>
            <EmptyDescription>
              Vous n'avez pas encore ajouté de formations. Commencez par ajouter votre première
              formation avec le bouton ci-dessous.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button class="hover:cursor-pointer" @click="isCreateDialogOpen = true">
              <FilePlusCorner class="w-4 h-4 mt-0.5" />
              <span class="hidden lg:block">Ajouter une formation</span>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </template>
    <template v-else>
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">
        <template v-if="loading">
          <div
            v-for="n in 3"
            :key="'skel-' + n"
            class="rounded-lg shadow-lg overflow-hidden flex flex-col bg-white"
          >
            <div class="w-full h-48">
              <Skeleton class="w-full h-full" />
            </div>

            <div class="p-4 flex flex-col space-y-4 flex-grow">
              <div class="flex flex-col space-y-2">
                <Skeleton class="h-6 w-3/4 rounded-md" />
                <div class="flex space-x-2">
                  <Skeleton class="h-4 w-2/3 rounded-md" />
                </div>
              </div>

              <div class="flex flex-col space-y-2">
                <div class="text-center inline-flex items-center text-sm">
                  <Skeleton class="h-5 w-5 rounded-full mr-1.5" />
                  <Skeleton class="h-4 w-28 rounded-md" />
                </div>
                <div class="text-center inline-flex items-center text-sm">
                  <Skeleton class="h-5 w-5 rounded-full mr-1.5" />
                  <Skeleton class="h-4 w-28 rounded-md" />
                </div>
                <div class="text-center inline-flex items-center text-sm">
                  <Skeleton class="h-5 w-5 rounded-full mr-1.5" />
                  <Skeleton class="h-4 w-28 rounded-md" />
                </div>
              </div>

              <div class="flex justify-center">
                <Skeleton class="h-10 w-36 rounded-2xl" />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div
            v-for="course in courses"
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

                <p class="text-sm text-gray-500">
                  {{ course.description }}
                </p>
              </div>

              <div class="flex flex-col space-y-2">
                <div class="text-center inline-flex items-center text-sm">
                  <CalendarDays class="w-5 h-5 mr-1.5" />
                  <p>
                    Année scolaire
                    <span class="font-semibold"
                      >{{ course.periodStart }} - {{ course.periodEnd }}</span
                    >
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
                <Button class="hover:cursor-pointer" @click="$router.push(`courses/${course.id}`)">
                  <Eye class="w-4 h-4 mt-0.5" />
                  Voir les détails
                </Button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </ContainerComponent>
  <CourseCreateDialog v-model="isCreateDialogOpen" :fetch-courses="fetchCoursesList" />
</template>
