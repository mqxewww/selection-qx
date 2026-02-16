<script setup lang="ts">
import { AlignLeft, Type, X } from "lucide-vue-next";
import ButtonComponent from "~/components/ButtonComponent.vue";
import DatePickerComponent from "~/components/DatePickerComponent.vue";
import InputComponent from "~/components/InputComponent.vue";
import TextareaComponent from "~/components/TextareaComponent.vue";
import { useApi } from "~/composables/useApi.ts";
import { useForm } from "~/composables/useForm.ts";
import { coursesService } from "~/domains/courses/courses.service.ts";

const emit = defineEmits(["close", "success"]);
defineProps<{ isOpen: boolean }>();

const { form, reset } = useForm({
  title: "",
  description: "",
  capacity: 0,
  periodStart: "",
  periodEnd: "",
});

const { loading, execute } = useApi();

const handleSubmit = async () => {
  try {
    await execute(() => coursesService.create(form), {
      successMessage: "Cours créé avec succès !",
      showSuccessToast: true,
    });
  } finally {
    reset();
    emit("success");
    emit("close");
  }
};
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-60 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
    >
      <div
        class="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
      >
        <div
          class="flex items-center justify-between border-b border-gray-50 px-6 py-4"
        >
          <h2 class="text-base font-bold text-gray-800">Nouvelle formation</h2>
          <button
            class="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
            @click="emit('close')"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <form class="space-y-5 p-6" @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div class="space-y-1.5">
              <InputComponent
                v-model="form.title"
                label="Nom de la formation"
                :icon="Type"
              />
            </div>

            <div class="space-y-1.5">
              <TextareaComponent
                v-model="form.description"
                label="Description"
                :icon="AlignLeft"
              />
            </div>

            <div class="space-y-1.5">
              <InputComponent
                v-model="form.capacity"
                label="Capacité"
                type="number"
                :icon="Type"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <DatePickerComponent
                  v-model="form.periodStart"
                  label="Date de début"
                />
              </div>
              <div class="space-y-1.5">
                <DatePickerComponent
                  v-model="form.periodEnd"
                  label="Date de fin"
                />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <ButtonComponent variant="ghost" @click="emit('close')">
              Annuler
            </ButtonComponent>

            <ButtonComponent type="submit" variant="primary" :loading="loading">
              {{ loading ? "Création..." : "Créer la formation" }}
            </ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>
