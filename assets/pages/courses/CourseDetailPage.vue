<script lang="ts" setup>
import {
  ArrowLeftToLine,
  Calendar1,
  CalendarDays,
  CornerDownLeft,
  DoorOpen,
  PencilLine,
  SaveAll,
  SquarePlus,
  Trash,
  UserRound,
} from "lucide-vue-next";
import { onMounted, ref } from "vue";
import ContainerComponent from "~/components/ContainerComponent.vue";
import SubContainerComponent from "~/components/SubContainerComponent.vue";
import { Button } from "~/components/ui/button";
import { NumberField, NumberFieldContent, NumberFieldInput } from "~/components/ui/number-field";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Course, getCourse } from "~/services/course.service";
import { Criteria, getCriterias } from "~/services/criteria.service";

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
      <Button class="hover:cursor-pointer mb-4" variant="ghost" @click="$router.push('/courses')">
        <ArrowLeftToLine class="w-5 h-5 mt-0.5" />
        Retour aux formations
      </Button>
    </template>

    <div class="flex flex-col space-y-6">
      <SubContainerComponent title="Informations">
        <template #button>
          <div class="flex flex-row space-x-1">
            <Button v-if="!isEditMode" class="hover:cursor-pointer" @click="isEditMode = true">
              <PencilLine class="w-4 h-4" />
              <span class="hidden lg:block">Modifier</span>
            </Button>
            <Button v-if="!isEditMode" class="hover:cursor-pointer" variant="destructive">
              <Trash class="w-4 h-4" />
              <span class="hidden lg:block">Supprimer</span>
            </Button>
            <Button
              v-if="isEditMode"
              class="hover:cursor-pointer"
              variant="outline"
              @click="isEditMode = false"
            >
              <CornerDownLeft class="w-4 h-4" />
              <span class="hidden lg:block">Annuler</span>
            </Button>
            <Button v-if="isEditMode" class="hover:cursor-pointer">
              <SaveAll class="w-4 h-4" />
              <span class="hidden lg:block">Enregistrer</span>
            </Button>
          </div>
        </template>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-start">
          <div>
            <p class="text-sm text-gray-600 inline-flex items-center">
              <CalendarDays class="w-4 h-4 mr-1.5" />
              <span>Période</span>
            </p>
            <p class="font-semibold text-gray-900">{{ course.period }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 inline-flex items-center">
              <DoorOpen class="w-4 h-4 mr-1.5" />
              <label for="capacity">Capacité</label>
            </p>

            <div class="flex items-center gap-2">
              <NumberField :default-value="course.capacity" :disabled="!isEditMode">
                <NumberFieldContent>
                  <NumberFieldInput class="w-[6ch]" />
                </NumberFieldContent>
              </NumberField>
              <span class="text-gray-600">places</span>
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-600 inline-flex items-center">
              <UserRound class="w-4 h-4 mr-1.5" />
              <span>Candidatures</span>
            </p>
            <p class="font-semibold text-gray-900">{{ course.applications_count }} candidatures</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 inline-flex items-center">
              <Calendar1 class="w-4 h-4 mr-1.5" />
              <span>Date de création</span>
            </p>
            <p class="font-semibold text-gray-900">{{ course.created_at }}</p>
          </div>
        </div>
      </SubContainerComponent>

      <SubContainerComponent title="Critères">
        <template #button>
          <Button class="hover:cursor-pointer">
            <SquarePlus class="mt-0.5" />
            <span class="hidden lg:block">Nouveau critère</span>
          </Button>
        </template>

        <div class="w-full max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[20ch]">Nom</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="criterion in criteria" :key="criterion.title">
                <TableCell class="font-medium">
                  {{ criterion.title }}
                </TableCell>
                <TableCell class="space-x-2">
                  <span
                    v-for="mark in criterion.marks"
                    :key="mark.label"
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {{ mark.label }}
                    <span class="ml-1 text-gray-500 text-xs">({{ mark.mark }})</span>
                  </span>
                </TableCell>
                <TableCell class="text-right space-x-2">
                  <Button class="w-8 h-8 hover:cursor-pointer">
                    <PencilLine class="w-4 h-4" />
                  </Button>
                  <Button class="w-8 h-8 hover:cursor-pointer" variant="destructive">
                    <Trash class="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </SubContainerComponent>
    </div>
  </ContainerComponent>
</template>
