<script setup lang="ts">
import { X } from "lucide-vue-next";
import ButtonComponent from "~web/components/ButtonComponent.vue";
import { useApi } from "~web/composables/useApi.ts";
import {
  criteriaService,
  Criterion,
} from "~web/domains/criteria/criteria.service.ts";

const emit = defineEmits(["close", "success"]);
const props = defineProps<{ isOpen: boolean; criterion: Criterion | null }>();

const { loading, execute } = useApi();

const handleSubmit = async () => {
  const criterionId = props.criterion ? `${props.criterion.id}` : null;

  if (!criterionId) return;

  try {
    await execute(() => criteriaService.delete(criterionId), {
      delay_ms: 500,
      successMessage: "Critère suprimé !",
    });

    emit("close");
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
      @click.self="handleCloseModal()"
    >
      <Transition
        appear
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          class="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 shadow-2xl shadow-black/50"
        >
          <div
            class="flex items-center justify-between border-b border-zinc-700/50 px-6 py-4"
          >
            <div class="flex items-center gap-3">
              <h2 class="text-base font-bold text-zinc-100">
                Supprimer ce critère de notation
              </h2>
            </div>
            <ButtonComponent variant="ghost" @click="handleCloseModal()">
              <X class="h-5 w-5" />
            </ButtonComponent>
          </div>

          <form class="p-6" @submit.prevent="handleSubmit">
            <div class="mb-8 space-y-2">
              <p class="text-sm leading-relaxed font-medium text-zinc-400">
                Êtes-vous sûr de vouloir supprimer ce critère de notation ?
                Cette action est irréversible.
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
