<script lang="ts" setup>
import { CalendarDays, DoorOpen } from "lucide-vue-next";
import { DateValue } from "reka-ui";
import { computed, ref } from "vue";
import DatePicker from "~/components/DatePicker.vue";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { NumberField, NumberFieldContent, NumberFieldInput } from "~/components/ui/number-field";
import { Spinner } from "~/components/ui/spinner";
import { Textarea } from "~/components/ui/textarea";
import { CourseCreatePayload } from "~/modules/courses/types.ts";
import { useCoursesActions } from "~/modules/courses/useCoursesActions.ts";

type Emits = {
  (e: "success"): void;
};

const emit = defineEmits<Emits>();
const isOpen = defineModel<boolean>();

const { isCreating, createCourse } = useCoursesActions();

const initialFormState = {
  title: "",
  description: "",
  capacity: 1,
  periodStart: undefined as DateValue | undefined,
  periodEnd: undefined as DateValue | undefined,
};

const form = ref({ ...initialFormState });

const isValid = computed(() => {
  return (
    form.value.title &&
    form.value.description &&
    form.value.capacity > 0 &&
    form.value.periodStart &&
    form.value.periodEnd
  );
});

const onSubmit = async () => {
  if (!isValid.value || isCreating.value) return;

  const payload: CourseCreatePayload = {
    title: form.value.title,
    description: form.value.description,
    capacity: form.value.capacity,
    periodStart: form.value.periodStart!.toString(),
    periodEnd: form.value.periodEnd!.toString(),
  };

  try {
    await createCourse(payload);

    emit("success");
    isOpen.value = false;

    form.value = { ...initialFormState };
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-xl font-semibold text-gray-900">Nouvelle formation</DialogTitle>
      </DialogHeader>

      <p class="text-sm text-gray-500">
        Veuillez rentrer les informations nécessaires à la création d'une nouvelle formation.
      </p>

      <div>
        <label class="pb-2 text-sm text-gray-600" for="form-title">Titre</label>
        <Input id="form-title" v-model="form.title" required />
      </div>

      <div>
        <label class="pb-2 text-sm text-gray-600" for="form-description">Description</label>
        <Textarea id="form-description" v-model="form.description" required />
      </div>

      <div>
        <label class="inline-flex items-center text-sm text-gray-600" for="form-capacity">
          <DoorOpen class="mr-1.5 h-4 w-4" />
          Capacité
        </label>
        <div class="flex items-center gap-2">
          <NumberField id="form-capacity" v-model="form.capacity" :min="1">
            <NumberFieldContent>
              <NumberFieldInput class="w-[6ch]" />
            </NumberFieldContent>
          </NumberField>
          <span class="text-gray-600">places</span>
        </div>
      </div>

      <div>
        <label class="inline-flex items-center text-sm text-gray-600">
          <CalendarDays class="mr-1.5 h-4 w-4" />
          Début
        </label>
        <!--        <p class="font-semibold text-gray-900">-->
        <DatePicker v-model="form.periodStart as DateValue" :hide-icon="true" />
        <!--        </p>-->
      </div>

      <div>
        <p class="inline-flex items-center text-sm text-gray-600">
          <CalendarDays class="mr-1.5 h-4 w-4" />
          Fin
        </p>
        <!--        <p class="font-semibold text-gray-900">-->
        <DatePicker v-model="form.periodEnd as DateValue" :hide-icon="true" />
        <!--        </p>-->
      </div>

      <DialogFooter>
        <Button class="hover:cursor-pointer" variant="outline" @click="isOpen = false">
          Fermer
        </Button>

        <Button :disabled="isCreating || !isValid" class="hover:cursor-pointer" @click="onSubmit">
          <Spinner :class="`h-4 w-4 ${!isCreating && 'hidden'}`" />
          Créer
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
