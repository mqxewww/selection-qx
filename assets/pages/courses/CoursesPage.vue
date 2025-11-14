<script lang="ts" setup>
import { PhCalendarDots, PhEye, PhPlus, PhUser } from "@phosphor-icons/vue";
import { onMounted, ref } from "vue";
import ContainerComponent from "../../components/ContainerComponent.vue";
import { Course, getCoursesList } from "../../services/course.service";

const courses = ref<Course[]>([]);

onMounted(async () => {
  courses.value = await getCoursesList();
});
</script>

<template>
  <ContainerComponent description="Voir et modifier les formations disponibles" title="Formations">
    <template #button>
      <div
        class="focus:outline-none rounded-md inline-flex items-center text-sm px-4 py-2 transition duration-300 bg-[#24292F] text-white hover:bg-gray-600 hover:cursor-pointer"
      >
        <PhPlus class="w-5 h-5 -mb-0.5 lg:mr-1.5" />
        <span class="hidden lg:block">Ajouter une formation</span>
      </div>
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
              <PhCalendarDots class="w-5 h-5 mr-1.5" />
              <p>
                <span class="font-semibold">{{ course.period }}</span>
              </p>
            </div>

            <div class="text-center inline-flex items-center text-sm">
              <PhUser class="w-5 h-5 mr-1.5" />
              <p>
                <span class="font-semibold">{{ course.applications_count }}</span>
                candidatures
              </p>
            </div>
          </div>

          <div class="flex justify-center">
            <router-link
              :to="`/courses/${course.id}`"
              class="focus:outline-none rounded-md inline-flex items-center text-sm px-4 py-2 transition duration-300 bg-[#24292F] text-white hover:bg-gray-600"
            >
              <PhEye class="w-5 h-5 -mb-0.5 mr-1.5" />
              <span>Voir les détails</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </ContainerComponent>
</template>
