<script setup lang="ts">
import { ListChecks, Plus, Trash, Type, X } from "lucide-vue-next";
import { computed, watch } from "vue";
import ButtonComponent from "~web/components/ButtonComponent.vue";
import InputComponent from "~web/components/InputComponent.vue";
import { useApi } from "~web/composables/useApi.ts";
import { useForm } from "~web/composables/useForm.ts";
import {
  criteriaService,
  CriteriaUpdateInput,
  Criterion,
} from "~web/domains/criteria/criteria.service.ts";

const emit = defineEmits(["close", "success"]);
const props = defineProps<{
  isOpen: boolean;
  courseId: number;
  criterion: Criterion | null;
}>();

const { loading, execute, validationErrors } = useApi();

const { form, updateForm, resetForm } = useForm<CriteriaUpdateInput>(
  () => ({
    title: "",
    courseId: props.courseId,
    marks: [],
  }),
  (form) => {
    if (!props.criterion) return;

    form.title = props.criterion.title;
    form.marks = props.criterion.marks.map((mark) => ({
      ...mark,
      shouldDelete: false,
    }));
  },
);

const visibleMarks = computed(() =>
  form.marks.filter((mark) => !mark.shouldDelete),
);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      updateForm();
    } else {
      resetForm();
    }
  },
);

const addMark = () => {
  form.marks.push({
    label: "",
    mark: 0,
    shouldDelete: false,
    id: undefined,
  });
};

const removeMark = (indexInVisible: number) => {
  const visibleMark = visibleMarks.value[indexInVisible];
  const realIndex = form.marks.findIndex((mark) => mark === visibleMark);

  if (realIndex === -1) return;

  if (form.marks[realIndex].id) {
    form.marks[realIndex].shouldDelete = true;
  } else {
    form.marks.splice(realIndex, 1);
  }
};

const handleSubmit = async () => {
  if (loading.value) return;

  const criterionId = props.criterion ? `${props.criterion.id}` : null;

  try {
    if (criterionId) {
      await execute(() => criteriaService.patch(criterionId, form), {
        delay_ms: 500,
        successMessage: "Modifications enregistrées !",
      });
    } else {
      await execute(() => criteriaService.create(form), {
        delay_ms: 500,
        successMessage: "Nouveau critère ajouté !",
      });
    }

    emit("success");
    emit("close");
  } catch (error) {
    console.error(error);
  }
};

const isSubmitDisabled = computed(() => {
  const hasErrors =
    validationErrors.value && Object.keys(validationErrors.value).length > 0;

  const isMissingData =
    !form.title.trim() ||
    visibleMarks.value.length === 0 ||
    visibleMarks.value.some((m) => !m.label.trim() || m.mark === null);

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
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          class="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 shadow-2xl shadow-black/50"
        >
          <div
            class="flex items-center justify-between border-b border-zinc-700/50 px-6 py-4"
          >
            <h2 class="text-base font-bold text-zinc-100">
              {{ criterion ? "Modifier le critère" : "Nouveau critère" }}
            </h2>
            <ButtonComponent variant="ghost" @click="emit('close')">
              <X class="h-5 w-5" />
            </ButtonComponent>
          </div>

          <form
            class="flex-1 space-y-8 overflow-y-auto p-6"
            @submit.prevent="handleSubmit"
          >
            <div class="space-y-4">
              <InputComponent
                v-model="form.title"
                label="Nom du critère"
                :icon="ListChecks"
                :error="validationErrors.title"
              />
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <label
                  class="text-[11px] font-bold tracking-wider text-zinc-500 uppercase"
                >
                  Notations
                </label>
                <ButtonComponent
                  variant="secondary"
                  class="h-8 px-3"
                  @click="addMark"
                >
                  <Plus class="h-4 w-4" />
                  Ajouter une note
                </ButtonComponent>
              </div>

              <div
                class="space-y-3 rounded-xl border border-zinc-700/50 bg-zinc-900/30 p-4"
              >
                <div
                  v-if="visibleMarks.length === 0"
                  class="py-4 text-center text-sm text-zinc-500"
                >
                  Aucune note définie.
                </div>

                <div
                  v-for="(mark, index) in visibleMarks"
                  :key="index"
                  class="flex items-start gap-3"
                >
                  <div class="flex-1">
                    <InputComponent
                      v-model="mark.label"
                      label="Libellé"
                      :icon="Type"
                    />
                  </div>
                  <div class="w-32">
                    <InputComponent
                      v-model="mark.mark"
                      label="Note"
                      type="number"
                      :icon="ListChecks"
                    />
                  </div>
                  <div class="pt-6">
                    <ButtonComponent
                      variant="danger"
                      class="h-10 px-3"
                      @click="removeMark(index)"
                    >
                      <Trash class="h-4 w-4" />
                    </ButtonComponent>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="flex items-center justify-end gap-3 border-t border-zinc-700/30 pt-4"
            >
              <ButtonComponent variant="ghost" @click="emit('close')">
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
