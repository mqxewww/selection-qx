<script setup lang="ts">
import { AlignLeft, Type, X } from "lucide-vue-next";
import { computed, watch } from "vue";
import ButtonComponent from "~/components/ButtonComponent.vue";
import DatePickerComponent from "~/components/DatePickerComponent.vue";
import InputComponent from "~/components/InputComponent.vue";
import TextareaComponent from "~/components/TextareaComponent.vue";
import { useApi } from "~/composables/useApi.ts";
import { useForm } from "~/composables/useForm.ts";
import {
  CourseCreateInput,
  coursesService,
} from "~/domains/courses/courses.service.ts";

const emit = defineEmits(["close", "success"]);
const props = defineProps<{ isOpen: boolean }>();

const { loading, execute, validationErrors } = useApi();

const { form, resetForm } = useForm<CourseCreateInput>({
  title: "",
  description: "",
  capacity: 0,
  periodStart: "",
  periodEnd: "",
});

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

const handleSubmit = async () => {
  try {
    await execute(() => coursesService.create(form), {
      delay_ms: 500,
    });

    emit("success");
    emit("close");

    resetForm();
  } catch (error) {
    console.error(error);
  }
};

const handleCloseModal = () => {
  emit("close");
  resetForm();
};

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
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="props.isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <Transition
        appear
        enter-active-class="transition duration-300 ease-out delay-75"
        enter-from-class="opacity-0 scale-95 translate-y-4"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4"
      >
        <div
          class="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 shadow-2xl shadow-black/50"
        >
          <div
            class="flex items-center justify-between border-b border-zinc-700/50 px-6 py-4"
          >
            <h2 class="text-base font-bold text-zinc-100">
              Nouvelle formation
            </h2>
            <button
              class="rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
              @click="handleCloseModal()"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <form class="space-y-6 p-6" @submit.prevent="handleSubmit">
            <div class="space-y-4">
              <InputComponent
                v-model="form.title"
                label="Nom"
                :icon="Type"
                placeholder="Ex: BTS Informatique"
                :error="validationErrors.title"
              />

              <TextareaComponent
                v-model="form.description"
                label="Description"
                :icon="AlignLeft"
                :rows="3"
                placeholder="Détails de la formation..."
                :error="validationErrors.description"
              />

              <InputComponent
                v-model="form.capacity"
                label="Capacité"
                :icon="Type"
                placeholder="27"
                :error="validationErrors.capacity"
              />

              <div class="grid grid-cols-2 gap-4">
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
              class="flex items-center justify-end gap-3 border-t border-zinc-700/30 pt-4"
            >
              <ButtonComponent variant="ghost" @click="handleCloseModal()">
                Annuler
              </ButtonComponent>

              <ButtonComponent
                type="submit"
                variant="primary"
                :loading="loading"
                :disabled="isSubmitDisabled"
              >
                {{ loading ? "Enregistrement..." : "Enregistrer" }}
              </ButtonComponent>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
