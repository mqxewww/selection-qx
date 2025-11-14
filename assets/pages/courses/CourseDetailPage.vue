<script lang="ts" setup>
import {
  PhArrowLeft,
  PhArrowUDownLeft,
  PhCalendar,
  PhCalendarDots,
  PhDoorOpen,
  PhFloppyDisk,
  PhPencil,
  PhPlus,
  PhTrash,
  PhUser,
} from "@phosphor-icons/vue";
import { onMounted, ref } from "vue";
import ContainerComponent from "../../components/ContainerComponent.vue";
import SubContainerComponent from "../../components/SubContainerComponent.vue";
import { Course, getCourse } from "../../services/course.service";
import { Criteria, getCriterias } from "../../services/criteria.service";

type Props = {
  idCourse: string;
};

const props = defineProps<Props>();

const course = ref<Course | null>(null);
const criteria = ref<Criteria[]>([]);

const isEditMode = ref<boolean>(false);

onMounted(async () => {
  if (!props.idCourse || isNaN(Number(props.idCourse))) return;

  course.value = await getCourse(Number(props.idCourse));
  criteria.value = await getCriterias();
});
</script>

<template>
  <ContainerComponent v-if="course" :description="course.description" :title="course.title">
    <template #backwards>
      <router-link
        class="focus:outline-none rounded-md inline-flex items-center text-sm mb-4 hover:pl-3 pr-3 py-1.5 transition-all duration-300 hover:bg-gray-200 hover:cursor-pointer"
        to="/courses"
      >
        <PhArrowLeft class="w-5 h-5 -mb-0.5 lg:mr-1.5" />
        <span class="hidden lg:block">Retour aux formations</span>
      </router-link>
    </template>
    <div class="flex flex-col space-y-6">
      <SubContainerComponent title="Informations">
        <template #button>
          <div class="flex flex-row space-x-1">
            <button
              v-if="!isEditMode"
              class="focus:outline-none rounded-md inline-flex items-center text-sm px-3 py-1.5 transition duration-300 bg-[#24292F] text-white hover:bg-gray-600 hover:cursor-pointer"
              @click="isEditMode = true"
            >
              <PhPencil class="w-5 h-5 -mb-0.5 lg:mr-1.5" />
              <span class="hidden lg:block">Modifier</span>
            </button>
            <button
              v-if="!isEditMode"
              class="focus:outline-none rounded-md inline-flex items-center text-sm px-3 py-1.5 transition duration-300 bg-red-600 text-white hover:bg-red-400 hover:cursor-pointer"
            >
              <PhTrash class="w-5 h-5 -mb-0.5 lg:mr-1.5" />
              <span class="hidden lg:block">Supprimer</span>
            </button>
            <button
              v-if="isEditMode"
              class="focus:outline-none rounded-md inline-flex items-center text-sm px-3 py-1.5 transition duration-300 border border-[#24292F] hover:bg-gray-200 hover:border-gray-400 hover:cursor-pointer"
              @click="isEditMode = false"
            >
              <PhArrowUDownLeft class="w-5 h-5 -mb-0.5 lg:mr-1.5" />
              <span class="hidden lg:block">Annuler</span>
            </button>
            <button
              v-if="isEditMode"
              class="focus:outline-none rounded-md inline-flex items-center text-sm px-3 py-1.5 transition duration-300 bg-[#24292F] text-white hover:bg-gray-600 hover:cursor-pointer"
            >
              <PhFloppyDisk class="w-5 h-5 -mb-0.5 lg:mr-1.5" />
              <span class="hidden lg:block">Enregistrer</span>
            </button>
          </div>
        </template>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-start">
          <div>
            <p class="text-sm text-gray-600 inline-flex items-center">
              <PhCalendarDots class="w-4 h-4 -mb-0.5 mr-1.5" />
              <span>Période</span>
            </p>
            <p class="font-semibold text-gray-900">{{ course.period }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 inline-flex items-center">
              <PhDoorOpen class="w-4 h-4 -mb-0.5 mr-1.5" />
              <label for="capacity">Capacité</label>
            </p>

            <div v-if="isEditMode" class="flex items-center gap-2">
              <input
                id="capacity"
                :value="course.capacity"
                class="w-[5rem] border border-gray-300 rounded px-3 py-2 font-semibold"
                max="99"
                min="1"
                type="number"
              />
              <span class="text-gray-600">places</span>
            </div>
            <p v-else class="font-semibold text-gray-900">{{ course.capacity }} places</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 inline-flex items-center">
              <PhUser class="w-4 h-4 -mb-0.5 mr-1.5" />
              <span>Candidatures</span>
            </p>
            <p class="font-semibold text-gray-900">{{ course.applications_count }} candidatures</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 inline-flex items-center">
              <PhCalendar class="w-4 h-4 -mb-0.5 mr-1.5" />
              <span>Date de création</span>
            </p>
            <p class="font-semibold text-gray-900">{{ course.created_at }}</p>
          </div>
        </div>
      </SubContainerComponent>

      <SubContainerComponent title="Critères">
        <template #button>
          <div
            class="focus:outline-none rounded-md inline-flex items-center text-sm px-3 py-1.5 transition duration-300 bg-[#24292F] text-white hover:bg-gray-600 hover:cursor-pointer"
          >
            <PhPlus class="w-5 h-5 -mb-0.5 lg:mr-1.5" />
            <span class="hidden lg:block">Ajouter</span>
          </div>
        </template>

        <div class="shadow-sm rounded-lg">
          <table class="min-w-full text-left border-collapse">
            <thead>
              <tr
                class="text-gray-700 uppercase text-sm text-center lg:text-left leading-normal bg-gray-50"
              >
                <th class="p-1 lg:py-3 lg:px-4 font-semibold border-b border-gray-300">Nom</th>
                <th class="p-1 lg:py-3 lg:px-4 font-semibold border-b border-gray-300">Notes</th>
                <th class="p-1 lg:py-3 lg:px-4 font-semibold border-b border-gray-300 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="text-gray-800 text-sm">
              <tr
                v-for="criterion in criteria"
                :key="criterion.title"
                class="border-b border-gray-300 hover:bg-gray-50 transition"
              >
                <td class="p-1 lg:py-3 lg:px-4 font-medium">
                  {{ criterion.title }}
                </td>

                <td class="py-3 px-4">
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="mark in criterion.marks"
                      :key="mark.label"
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {{ mark.label }}
                      <span class="ml-1 text-gray-500 text-xs">({{ mark.mark }})</span>
                    </span>
                  </div>
                </td>

                <td class="py-3 px-4 text-center flex flex-col lg:flex-row justify-center gap-2">
                  <div
                    class="focus:outline-none rounded-md inline-flex items-center justify-center text-sm px-2 py-1 transition duration-300 bg-[#24292F] text-white hover:bg-gray-600 cursor-pointer"
                  >
                    <PhPencil class="w-4 h-4" />
                  </div>
                  <div
                    class="focus:outline-none rounded-md inline-flex items-center justify-center text-sm px-2 py-1 transition duration-300 bg-red-600 text-white hover:bg-red-400 cursor-pointer"
                  >
                    <PhTrash class="w-4 h-4" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </SubContainerComponent>
    </div>
  </ContainerComponent>
</template>
