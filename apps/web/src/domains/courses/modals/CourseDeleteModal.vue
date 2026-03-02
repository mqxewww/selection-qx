<script setup lang="ts">
import { X } from "lucide-vue-next";
import ButtonComponent from "~/components/ButtonComponent.vue";
import { useApi } from "~/composables/useApi.ts";
import { coursesService } from "~/domains/courses/courses.service.ts";

const emit = defineEmits(["close", "success"]);
const props = defineProps<{ isOpen: boolean; courseId: string }>();

const { loading, execute } = useApi();

const handleSubmit = async () => {
  try {
    await execute(() => coursesService.delete(props.courseId), {
      delay_ms: 500,
    });

    emit("close");

    await new Promise((resolve) => setTimeout(resolve, 500));

    emit("success");
  } catch (error) {
    console.error(error);
  }
};

const handleCloseModal = () => {
  emit("close");
};
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
            <div class="flex items-center gap-3">
              <h2 class="text-base font-bold text-zinc-100">
                Supprimer la formation
              </h2>
            </div>
            <ButtonComponent variant="ghost" @click="handleCloseModal()">
              <X class="h-5 w-5" />
            </ButtonComponent>
          </div>

          <form class="p-6" @submit.prevent="handleSubmit">
            <div class="mb-8 space-y-2">
              <p class="text-sm leading-relaxed font-medium text-zinc-400">
                Êtes-vous sûr de vouloir supprimer cette formation ? Cette
                action est irréversible.
              </p>
            </div>

            <div
              class="flex items-center justify-end gap-3 border-t border-zinc-700/30 pt-4"
            >
              <ButtonComponent variant="ghost" @click="handleCloseModal()">
                Annuler
              </ButtonComponent>

              <ButtonComponent
                type="submit"
                variant="danger"
                :loading="loading"
              >
                {{ loading ? "Suppression..." : "Supprimer" }}
              </ButtonComponent>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
