<script lang="ts" setup>
import { CalendarDays, Eye, FilePlusCorner, UserRound } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { Button } from "~/components/ui/button";
import { Course, getCoursesList } from "~/services/course.service";
import ContainerComponent from "../../components/ContainerComponent.vue";

const courses = ref<Course[]>([]);

onMounted(async () => {
  courses.value = await getCoursesList();
});
</script>

<template>
  <ContainerComponent description="Voir et modifier les formations disponibles" title="Formations">
    <template #button>
      <Button class="hover:cursor-pointer">
        <FilePlusCorner class="w-4 h-4 mt-0.5" />
        <span class="hidden lg:block">Ajouter une formation</span>
      </Button>
    </template>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">
      <div
        v-for="course in courses"
        :key="course.id"
        class="rounded-lg shadow-lg overflow-hidden flex flex-col"
      >
        <img :src="course.image_url" alt="Image de la carte" class="w-full h-48 object-cover" />

        <div class="p-4 flex flex-col space-y-4 flex-grow">
          <div class="flex flex-col space-y-1">
            <h2 class="text-xl font-semibold text-gray-900 w-3/4">
              {{ course.title }}
            </h2>

            <p class="text-sm text-gray-500">
              {{ course.description }}
            </p>
          </div>

          <div class="flex flex-col space-y-1">
            <div class="text-center inline-flex items-center text-sm">
              <CalendarDays class="w-5 h-5 mr-1.5" />
              <p>
                <span class="font-semibold">{{ course.period }}</span>
              </p>
            </div>

            <div class="text-center inline-flex items-center text-sm">
              <UserRound class="w-5 h-5 mr-1.5" />
              <p>
                <span class="font-semibold">{{ course.applications_count }}</span>
                candidatures
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
    </div>
  </ContainerComponent>
</template>
