<script lang="ts" setup>
import { CalendarDays, DoorOpen } from "lucide-vue-next";
import { DateValue } from "reka-ui";
import { ref } from "vue";
import DatePicker from "~/components/DatePicker.vue";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { NumberField, NumberFieldContent, NumberFieldInput } from "~/components/ui/number-field";
import { Spinner } from "~/components/ui/spinner";
import { Textarea } from "~/components/ui/textarea";
import { CourseCreateDTO, useCourseCreate } from "~/composables/courses/useCourseCreate.ts";

type Props = {
  fetchCourses: () => Promise<void>;
};

const props = defineProps<Props>();
const isOpen = defineModel<boolean>();

const { loading, success, createCourse } = useCourseCreate();

const titleRef = ref<string>("");
const descriptionRef = ref<string>("");
const capacityRef = ref<number>(0);
const periodStartRef = ref<DateValue | undefined>();
const periodEndRef = ref<DateValue | undefined>();

const confirmCreate = async () => {
  if (
    loading.value ||
    !titleRef.value ||
    !descriptionRef.value ||
    !periodStartRef.value ||
    !periodEndRef.value ||
    !capacityRef.value
  )
    return;

  const payload: CourseCreateDTO = {
    title: titleRef.value,
    description: descriptionRef.value,
    capacity: capacityRef.value,
    periodStart: periodStartRef.value.toString(),
    periodEnd: periodEndRef.value.toString(),
  };

  await createCourse(payload);

  if (success) {
    isOpen.value = false;

    await props.fetchCourses();

    titleRef.value = "";
    descriptionRef.value = "";
    capacityRef.value = 0;
    periodStartRef.value = undefined;
    periodEndRef.value = undefined;
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
        <p class="text-sm text-gray-600 pb-2">
          <label for="capacity">Titre</label>
        </p>
        <Input v-model="titleRef" required />
      </div>

      <div>
        <p class="text-sm text-gray-600 pb-2">
          <label for="capacity">Description</label>
        </p>
        <Textarea v-model="descriptionRef" required />
      </div>

      <div>
        <p class="text-sm text-gray-600 inline-flex items-center">
          <DoorOpen class="w-4 h-4 mr-1.5" />
          <label for="capacity">Capacité</label>
        </p>

        <div class="flex items-center gap-2">
          <NumberField v-model="capacityRef">
            <NumberFieldContent>
              <NumberFieldInput class="w-[6ch]" />
            </NumberFieldContent>
          </NumberField>
          <span class="text-gray-600">places</span>
        </div>
      </div>

      <div>
        <p class="text-sm text-gray-600 inline-flex items-center">
          <CalendarDays class="w-4 h-4 mr-1.5" />
          <span>Début de la période</span>
        </p>
        <p class="font-semibold text-gray-900">
          <DatePicker v-model="periodStartRef" :hide-icon="true" />
        </p>
      </div>

      <div>
        <p class="text-sm text-gray-600 inline-flex items-center">
          <CalendarDays class="w-4 h-4 mr-1.5" />
          <span>Fin de la période</span>
        </p>
        <p class="font-semibold text-gray-900">
          <DatePicker v-model="periodEndRef" :hide-icon="true" />
        </p>
      </div>

      <DialogFooter>
        <Button class="hover:cursor-pointer" variant="outline" @click="isOpen = false">
          Fermer
        </Button>

        <Button :disabled="loading" class="hover:cursor-pointer" @click="confirmCreate">
          <Spinner :class="`w-4 h-4 ${!loading && 'hidden'}`" />
          Créer
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
