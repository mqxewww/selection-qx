<script lang="ts" setup>
import { parseDate } from "@internationalized/date";
import {
  ArrowLeftToLine,
  Calendar1,
  CalendarDays,
  CornerDownLeft,
  DoorOpen,
  FileQuestionMark,
  PencilLine,
  SaveAll,
  SquarePlus,
  Trash,
  UserRound,
} from "lucide-vue-next";
import { DateValue } from "reka-ui";
import { onMounted, ref } from "vue";
import ContainerComponent from "~/components/ContainerComponent.vue";
import DatePicker from "~/components/DatePicker.vue";
import CourseDeleteDialog from "~/components/dialogs/CourseDeleteDialog.vue";
import CriteriaCreateDialog from "~/components/dialogs/CriteriaCreateDialog.vue";
import CriteriaUpdateDialog from "~/components/dialogs/CriteriaUpdateDialog.vue";
import SubContainerComponent from "~/components/SubContainerComponent.vue";
import { Button } from "~/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";
import { NumberField, NumberFieldContent, NumberFieldInput } from "~/components/ui/number-field";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Spinner } from "~/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Criterion, useCourseById } from "~/composables/courses/useCourseById.ts";
import { CourseUpdateDTO, useCourseUpdate } from "~/composables/courses/useCourseUpdate.ts";
import { useCriteriaDelete } from "~/composables/criteria/useCriteriaDelete.ts";
import { isoToDate } from "~/lib/utils.ts";

type Props = {
  idCourse: string;
};

const props = defineProps<Props>();

const periodStartRef = ref<DateValue>();
const periodEndRef = ref<DateValue>();
const capacityRef = ref<number>(0);
const isEditMode = ref<boolean>(false);

const criteriaToUpdate = ref<Criterion | null>(null);

const isDeleteCourseDialogOpen = ref<boolean>(false);
const isCreateCriteriaDialogOpen = ref<boolean>(false);
const isUpdateCriteriaDialogOpen = ref<boolean>(false);

const { loading: courseListLoading, data: course, fetchCourseById } = useCourseById();
const {
  loading: courseUpdateLoading,
  success: courseUpdateSuccess,
  updateCourse,
} = useCourseUpdate();
const {
  loading: criteriaDeleteLoading,
  success: criteriaDeleteSuccess,
  deleteCriteria,
} = useCriteriaDelete();

const initRefs = () => {
  if (course.value) {
    periodStartRef.value = parseDate(course.value.periodStart);
    periodEndRef.value = parseDate(course.value.periodEnd);
    capacityRef.value = course.value.capacity;
  }
};

const closeEditMode = () => {
  isEditMode.value = false;

  initRefs();
};

const saveCourse = async () => {
  if (
    courseUpdateLoading.value ||
    !periodStartRef.value ||
    !periodEndRef.value ||
    !capacityRef.value
  )
    return;

  const payload: CourseUpdateDTO = {
    periodStart: periodStartRef.value.toString(),
    periodEnd: periodEndRef.value.toString(),
    capacity: capacityRef.value,
  };

  await updateCourse(Number(props.idCourse), payload);

  if (courseUpdateSuccess) isEditMode.value = false;
};

const confirmDeleteCriteria = async (id: number) => {
  if (criteriaDeleteLoading.value) return;

  await deleteCriteria(id);

  if (criteriaDeleteSuccess) {
    await fetchCourseById(Number(props.idCourse));
  }
};

const openUpdateCriteriaDialog = (criterion: Criterion) => {
  isUpdateCriteriaDialogOpen.value = true;

  criteriaToUpdate.value = criterion;
};

onMounted(async () => {
  if (!props.idCourse || isNaN(Number(props.idCourse))) return;

  await fetchCourseById(Number(props.idCourse));

  initRefs();
});
</script>

<template>
  <ContainerComponent
    :description="course?.description"
    :is-loading="courseListLoading"
    :title="course?.title"
  >
    <template #backwards>
      <Button class="hover:cursor-pointer mb-4" variant="ghost" @click="$router.push('/courses')">
        <ArrowLeftToLine class="w-5 h-5 mt-0.5" />
        Retour aux formations
      </Button>
    </template>

    <template v-if="!courseListLoading && !course">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestionMark />
          </EmptyMedia>
          <EmptyTitle>Une erreur est survenue.</EmptyTitle>
          <EmptyDescription>
            Une erreur est survenue lors de la récupération des données. Veuillez retourner sur la
            précédente page.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </template>
    <template v-else-if="course">
      <div class="flex flex-col space-y-6">
        <SubContainerComponent title="Informations">
          <template #button>
            <div class="flex flex-row space-x-1">
              <Button v-if="!isEditMode" class="hover:cursor-pointer" @click="isEditMode = true">
                <PencilLine class="w-4 h-4" />
                <span class="hidden lg:block">Modifier</span>
              </Button>
              <Button
                v-if="!isEditMode"
                class="hover:cursor-pointer"
                variant="destructive"
                @click="isDeleteCourseDialogOpen = true"
              >
                <Trash class="w-4 h-4" />
                <span class="hidden lg:block">Supprimer</span>
              </Button>
              <Button
                v-if="isEditMode"
                class="hover:cursor-pointer"
                variant="outline"
                @click="closeEditMode"
              >
                <CornerDownLeft class="w-4 h-4" />
                <span class="hidden lg:block">Annuler</span>
              </Button>
              <Button
                v-if="isEditMode"
                :disabled="courseUpdateLoading"
                class="hover:cursor-pointer"
                @click="saveCourse"
              >
                <SaveAll v-if="!courseUpdateLoading" class="w-4 h-4" />
                <Spinner v-else class="w-4 h-4" />
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
              <p class="font-semibold text-gray-900 space-x-2">
                <span>Du</span>
                <DatePicker v-model="periodStartRef" :is-disabled="!isEditMode" />
                <span>au</span>
                <DatePicker v-model="periodEndRef" :is-disabled="!isEditMode" />
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-600 inline-flex items-center">
                <DoorOpen class="w-4 h-4 mr-1.5" />
                <label for="capacity">Capacité</label>
              </p>

              <div class="flex items-center gap-2">
                <NumberField v-model="capacityRef" :disabled="!isEditMode">
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
              <p class="font-semibold text-gray-900">{{ course.applicationsCount }} candidatures</p>
            </div>
            <div>
              <p class="text-sm text-gray-600 inline-flex items-center">
                <Calendar1 class="w-4 h-4 mr-1.5" />
                <span>Date de création</span>
              </p>
              <p class="font-semibold text-gray-900">{{ isoToDate(course.createdAt) }}</p>
            </div>
          </div>
        </SubContainerComponent>

        <SubContainerComponent title="Critères">
          <template #button>
            <Button
              v-if="course.criterias.length > 0"
              class="hover:cursor-pointer"
              @click="isCreateCriteriaDialogOpen = true"
            >
              <SquarePlus class="mt-0.5" />
              <span class="hidden lg:block">Nouveau critère</span>
            </Button>
          </template>

          <template v-if="course.criterias.length === 0">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>Aucune critère ajouté</EmptyTitle>
                <EmptyDescription>
                  Créez votre premier critère avec le bouton ci-dessous.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button class="hover:cursor-pointer" @click="isCreateCriteriaDialogOpen = true">
                  <SquarePlus class="mt-0.5" />
                  <span class="hidden lg:block">Nouveau critère</span>
                </Button>
              </EmptyContent>
            </Empty>
          </template>
          <template v-else>
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
                  <TableRow v-for="criterion in course.criterias" :key="criterion.title">
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
                      <Button
                        class="w-8 h-8 hover:cursor-pointer"
                        @click="openUpdateCriteriaDialog(criterion)"
                      >
                        <PencilLine class="w-4 h-4" />
                      </Button>
                      <Popover>
                        <PopoverTrigger>
                          <Button class="w-8 h-8 hover:cursor-pointer" variant="destructive">
                            <Trash class="w-4 h-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          class="mr-10 text-base w-fit space-y-2 shadow-2xl rounded-xl"
                        >
                          <div class="text-gray-900 font-semibold">
                            Supprimer le critère '{{ criterion.title }}' ?
                          </div>
                          <div class="flex flex-row justify-end">
                            <Button
                              :disabled="criteriaDeleteLoading"
                              class="hover:cursor-pointer"
                              @click="confirmDeleteCriteria(criterion.id)"
                            >
                              <Spinner :class="`w-4 h-4 ${!criteriaDeleteLoading && 'hidden'}`" />
                              <span class="hidden lg:block">Confirmer</span>
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </template>
        </SubContainerComponent>
      </div>
      <CourseDeleteDialog
        v-model="isDeleteCourseDialogOpen"
        :course-id="props.idCourse"
        :title="course.title"
      />
      <CriteriaCreateDialog
        v-model="isCreateCriteriaDialogOpen"
        :course-id="props.idCourse"
        :fetch-course="fetchCourseById"
      />
      <CriteriaUpdateDialog
        v-model="isUpdateCriteriaDialogOpen"
        :course-id="props.idCourse"
        :criteria-data="criteriaToUpdate"
        :fetch-course="fetchCourseById"
      />
    </template>
  </ContainerComponent>
</template>
