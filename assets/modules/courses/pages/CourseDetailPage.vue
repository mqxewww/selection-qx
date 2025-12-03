<script lang="ts" setup>
import { parseDate } from "@internationalized/date";
import {
  ArrowLeftToLine,
  Calendar1,
  CalendarDays,
  CornerDownLeft,
  DoorOpen,
  PencilLine,
  SaveAll,
  Trash,
  UserRound,
} from "lucide-vue-next";
import { DateValue } from "reka-ui";
import { computed, onMounted, ref } from "vue";
import ContainerComponent from "~/components/ContainerComponent.vue";
import DatePicker from "~/components/DatePicker.vue";
import SubContainerComponent from "~/components/SubContainerComponent.vue";
import { Button } from "~/components/ui/button";
import { NumberField, NumberFieldContent, NumberFieldInput } from "~/components/ui/number-field";
import { Spinner } from "~/components/ui/spinner";
import { isoToDate } from "~/lib/utils.ts";
import { CourseDeleteDialog, CourseEmpty } from "~/modules/courses/components";
import { CourseUpdatePayload } from "~/modules/courses/types.ts";
import { useCoursesActions } from "~/modules/courses/useCoursesActions.ts";
import { CriteriaList } from "~/modules/criteria/components";

type Props = {
  idCourse: string;
};

const { idCourse } = defineProps<Props>();

const { isFetchingDetails, isUpdating, courseDetails, fetchDetails, updateCourse } =
  useCoursesActions();

const initialFormState = {
  periodStart: undefined as DateValue | undefined,
  periodEnd: undefined as DateValue | undefined,
  capacity: 1,
};

const form = ref({ ...initialFormState });

const isValid = computed(() => {
  return form.value.periodStart && form.value.periodEnd && form.value.capacity > 0;
});

const isEditMode = ref<boolean>(false);
const isDeleteCourseDialogOpen = ref<boolean>(false);

const refreshForm = () => {
  if (!courseDetails.value) return;

  form.value = {
    capacity: courseDetails.value.capacity,
    periodStart: parseDate(courseDetails.value.periodStart),
    periodEnd: parseDate(courseDetails.value.periodEnd),
  };
};

const closeEditMode = () => {
  isEditMode.value = false;

  refreshForm();
};

const onSubmit = async () => {
  if (!courseDetails.value || !isValid.value || isUpdating.value) return;

  const payload: CourseUpdatePayload = {
    capacity: form.value.capacity,
    periodStart: form.value.periodStart!.toString(),
    periodEnd: form.value.periodEnd!.toString(),
  };

  try {
    await updateCourse(courseDetails.value.id, payload);

    isEditMode.value = false;
  } catch (e) {
    console.error(e);
  }
};

onMounted(async () => {
  if (!idCourse || isNaN(Number(idCourse))) return;

  await fetchDetails(Number(idCourse));

  refreshForm();
});
</script>

<template>
  <ContainerComponent
    :description="courseDetails?.description"
    :is-loading="isFetchingDetails"
    :title="courseDetails?.title"
  >
    <template #backwards>
      <RouterLink to="/courses">
        <Button class="mb-4 hover:cursor-pointer" variant="ghost" @click="$router.push('/courses')">
          <ArrowLeftToLine class="mt-0.5 h-5 w-5" />
          Retour aux formations
        </Button>
      </RouterLink>
    </template>

    <template #button>
      <div class="flex flex-row space-x-1">
        <Button v-if="!isEditMode" class="hover:cursor-pointer" @click="isEditMode = true">
          <PencilLine class="h-4 w-4" />
          <span class="hidden lg:block">Modifier</span>
        </Button>
        <Button
          v-if="!isEditMode"
          class="hover:cursor-pointer"
          variant="destructive"
          @click="isDeleteCourseDialogOpen = true"
        >
          <Trash class="h-4 w-4" />
          <span class="hidden lg:block">Supprimer</span>
        </Button>
        <Button
          v-if="isEditMode"
          class="hover:cursor-pointer"
          variant="outline"
          @click="closeEditMode"
        >
          <CornerDownLeft class="h-4 w-4" />
          <span class="hidden lg:block">Annuler</span>
        </Button>
        <Button
          v-if="isEditMode"
          :disabled="isUpdating || !isValid"
          class="hover:cursor-pointer"
          @click="onSubmit"
        >
          <SaveAll v-if="!isUpdating" class="h-4 w-4" />
          <Spinner v-else class="h-4 w-4" />
          <span class="hidden lg:block">Enregistrer</span>
        </Button>
      </div>
    </template>

    <CourseEmpty v-if="!isFetchingDetails && !courseDetails" />
    <template v-else-if="courseDetails && !isFetchingDetails">
      <div class="flex flex-col space-y-6">
        <SubContainerComponent title="Informations">
          <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-8">
            <div>
              <p class="inline-flex items-center text-sm text-gray-600">
                <CalendarDays class="mr-1.5 h-4 w-4" />
                <span>Période</span>
              </p>
              <p class="space-x-2 font-semibold text-gray-900">
                <span>Du</span>
                <DatePicker v-model="form.periodStart as DateValue" :is-disabled="!isEditMode" />
                <span>au</span>
                <DatePicker v-model="form.periodEnd as DateValue" :is-disabled="!isEditMode" />
              </p>
            </div>
            <div>
              <label class="inline-flex items-center text-sm text-gray-600" for="form-capacity">
                <DoorOpen class="mr-1.5 h-4 w-4" />
                Capacité
              </label>

              <div class="flex items-center gap-2">
                <NumberField id="form-capacity" v-model="form.capacity" :disabled="!isEditMode">
                  <NumberFieldContent>
                    <NumberFieldInput class="w-[6ch]" />
                  </NumberFieldContent>
                </NumberField>
                <span class="text-gray-600">places</span>
              </div>
            </div>
            <div>
              <p class="inline-flex items-center text-sm text-gray-600">
                <UserRound class="mr-1.5 h-4 w-4" />
                <span>Candidatures</span>
              </p>
              <p class="font-semibold text-gray-900">
                {{ courseDetails.applicationsCount }} candidatures
              </p>
            </div>
            <div>
              <p class="inline-flex items-center text-sm text-gray-600">
                <Calendar1 class="mr-1.5 h-4 w-4" />
                <span>Date de création</span>
              </p>
              <p class="font-semibold text-gray-900">
                {{ isoToDate(courseDetails.createdAt) }}
              </p>
            </div>
          </div>
        </SubContainerComponent>

        <CriteriaList :course="courseDetails" @success="fetchDetails(courseDetails.id)" />
      </div>

      <CourseDeleteDialog v-model="isDeleteCourseDialogOpen" :course="courseDetails" />
    </template>
  </ContainerComponent>
</template>
