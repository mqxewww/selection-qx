<script setup lang="ts">
import {
  AlignLeft,
  ArrowLeft,
  Calendar,
  Clock,
  Pencil,
  Save,
  TrendingUp,
  Type,
  Upload,
  Users,
  X,
} from "lucide-vue-next";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import ButtonComponent from "~/components/ButtonComponent.vue";
import DatePickerComponent from "~/components/DatePickerComponent.vue";
import FileInputComponent from "~/components/FileInputComponent.vue";
import InputComponent from "~/components/InputComponent.vue";
import TextareaComponent from "~/components/TextareaComponent.vue";
import { useApi } from "~/composables/useApi.ts";
import { useForm } from "~/composables/useForm.ts";
import {
  CourseResponse,
  coursesService,
  CourseUpdateInput,
} from "~/domains/courses/courses.service.ts";
import {
  convertUnixTimestampToLongDate,
  getImageFullURL,
} from "~/libs/utils.ts";

const props = defineProps<{ id: string }>();
const router = useRouter();

const {
  loading: fetchLoading,
  execute: fetchExecute,
  data: course,
} = useApi<CourseResponse>();
const {
  loading: saveLoading,
  execute: saveExecute,
  validationErrors,
} = useApi();
const {
  execute: putBgImageExecute,
  validationErrors: putBgImageValidationErrors,
} = useApi();

const { form, updateForm } = useForm<CourseUpdateInput>(
  {
    title: "",
    description: "",
    capacity: 0,
    periodStart: "",
    periodEnd: "",
  },
  (form) => {
    if (!course.value) return;

    form.title = course.value.title;
    form.description = course.value.description;
    form.capacity = course.value.capacity;
    form.periodStart = course.value.periodStart;
    form.periodEnd = course.value.periodEnd;
  },
);

const selectedFile = ref<File | undefined>(undefined);
const isEditing = ref(false);

const fetchCourse = async () => {
  await fetchExecute(() => coursesService.getById(props.id));
};

const handleSave = async () => {
  try {
    await saveExecute(() => coursesService.patch(props.id, form), {
      delay_ms: 500,
    });

    await fetchCourse();
    isEditing.value = false;
  } catch (error) {
    console.error(error);
  }
};

const handleFileUpload = async () => {
  try {
    if (!selectedFile.value) return;

    await putBgImageExecute(
      () => coursesService.putBgImage(props.id, selectedFile.value!),
      {
        delay_ms: 500,
      },
    );

    await fetchCourse();
    isEditing.value = false;
  } catch (error) {
    console.error(error);
  }
};

watch(
  form,
  () => {
    if (
      validationErrors.value &&
      Object.keys(validationErrors.value).length > 0
    ) {
      validationErrors.value = {};
    }
  },
  { deep: true },
);

watch(selectedFile, (file) => {
  if (
    putBgImageValidationErrors.value &&
    Object.keys(putBgImageValidationErrors.value).length > 0
  ) {
    putBgImageValidationErrors.value = {};
  }

  if (file) {
    handleFileUpload();
  }
});

const isSubmitDisabled = computed(() => {
  const hasErrors =
    validationErrors.value && Object.keys(validationErrors.value).length > 0;

  const isMissingData =
    !form.title.trim() ||
    !form.description.trim() ||
    !form.capacity ||
    !form.periodStart ||
    !form.periodEnd;

  return hasErrors || isMissingData;
});

const toggleEdit = () => {
  if (isEditing.value) validationErrors.value = {};

  updateForm();
  isEditing.value = !isEditing.value;
};

onMounted(fetchCourse);
</script>

<template>
  <div
    v-if="fetchLoading && !course"
    class="flex h-64 items-center justify-center"
  >
    <div
      class="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
    ></div>
  </div>

  <div v-else-if="course" class="mx-auto max-w-6xl space-y-6 pb-24">
    <div class="flex items-center justify-between">
      <button
        class="group flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100"
        @click="router.push('/courses')"
      >
        <ArrowLeft
          class="h-4 w-4 transition-transform group-hover:-translate-x-1"
        />
        Retour aux formations
      </button>

      <div class="flex items-center gap-3">
        <template v-if="!isEditing">
          <ButtonComponent variant="primary" @click="toggleEdit">
            <Pencil class="h-4 w-4" />
            Modifier
          </ButtonComponent>
        </template>
        <template v-else>
          <ButtonComponent
            variant="ghost"
            :disabled="saveLoading"
            @click="toggleEdit"
          >
            <X class="h-4 w-4" />
            Annuler
          </ButtonComponent>
          <ButtonComponent
            variant="primary"
            :loading="saveLoading"
            :disabled="isSubmitDisabled"
            @click="handleSave"
          >
            <Save class="h-4 w-4" />
            Enregistrer
          </ButtonComponent>
        </template>
      </div>
    </div>

    <div
      class="relative h-64 w-full overflow-hidden rounded-3xl border border-zinc-700/50 bg-zinc-800 shadow-xl"
    >
      <img
        :src="getImageFullURL(course.bgImagePath)"
        alt="Cover"
        class="h-full w-full object-cover opacity-80"
      />
      <div
        class="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent"
      ></div>

      <div
        v-if="!isEditing"
        class="absolute right-4 bottom-4 z-10 w-72 rounded-xl bg-zinc-900/80 px-4 pt-2.5 pb-3.5 shadow-lg backdrop-blur-md"
      >
        <FileInputComponent
          v-model="selectedFile"
          label="Modifier la couverture"
          :icon="Upload"
          accept="image/*"
          :error="validationErrors.bgImage"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div class="space-y-6 lg:col-span-2">
        <div
          class="rounded-2xl border border-zinc-700/50 bg-zinc-800 p-6 md:p-8"
        >
          <div v-if="!isEditing" class="space-y-6">
            <h1 class="text-3xl font-extrabold tracking-tight text-zinc-100">
              {{ course.title }}
            </h1>
            <div class="prose prose-invert max-w-none">
              <p class="leading-relaxed whitespace-pre-line text-zinc-300">
                {{ course.description }}
              </p>
            </div>
          </div>

          <div v-else class="w-full space-y-6">
            <InputComponent
              v-model="form.title"
              label="Nom"
              :icon="Type"
              :error="validationErrors.title"
            />
            <TextareaComponent
              v-model="form.description"
              label="Description"
              :icon="AlignLeft"
              :rows="8"
              :error="validationErrors.description"
            />
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="rounded-2xl border border-zinc-700/50 bg-zinc-800 p-6">
          <div v-if="!isEditing" class="space-y-5">
            <div class="flex items-center gap-4 text-zinc-300">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-700/50 text-blue-400"
              >
                <Users class="h-5 w-5" />
              </div>
              <div>
                <p class="text-xs text-zinc-500">Capacité maximale</p>
                <p class="font-semibold">{{ course.capacity }} étudiants</p>
              </div>
            </div>

            <div class="flex items-center gap-4 text-zinc-300">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-700/50 text-blue-400"
              >
                <Calendar class="h-5 w-5" />
              </div>
              <div>
                <p class="text-xs text-zinc-500">Période</p>
                <p class="text-sm font-semibold">
                  {{ new Date(course.periodStart).toLocaleDateString() }} -
                  {{ new Date(course.periodEnd).toLocaleDateString() }}
                </p>
              </div>
            </div>
          </div>

          <div v-else class="w-full space-y-4">
            <InputComponent
              v-model="form.capacity"
              label="Capacité"
              type="number"
              :icon="Users"
              :error="validationErrors.capacity"
            />
            <DatePickerComponent
              v-model="form.periodStart"
              label="Date de début"
              :error="validationErrors.periodStart"
            />
            <DatePickerComponent
              v-model="form.periodEnd"
              label="Date de fin"
              :error="validationErrors.periodEnd"
            />
          </div>
        </div>

        <div
          class="rounded-2xl border border-zinc-700/50 bg-zinc-800/50 px-6 py-5"
        >
          <h3
            class="mb-4 text-sm font-bold tracking-widest text-zinc-500 uppercase"
          >
            Statistiques
          </h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-zinc-400">
                <TrendingUp class="h-4 w-4" />
                <span class="text-sm">Candidatures</span>
              </div>
              <span
                class="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-400"
              >
                Soon
              </span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-zinc-400">
                <Clock class="h-4 w-4" />
                <span class="text-sm">Créée le</span>
              </div>
              <span class="text-sm font-medium text-zinc-300">
                {{ convertUnixTimestampToLongDate(course.createdAt) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
