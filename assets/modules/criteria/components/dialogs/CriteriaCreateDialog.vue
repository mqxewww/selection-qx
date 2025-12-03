<script lang="ts" setup>
import { SquarePlus, Trash } from "lucide-vue-next";
import { computed, ref } from "vue";
import SubContainerComponent from "~/components/SubContainerComponent.vue";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { NumberField, NumberFieldContent, NumberFieldInput } from "~/components/ui/number-field";
import { Spinner } from "~/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { CourseDetails } from "~/modules/courses/types.ts";
import { CriteriaCreateDialogEmpty } from "~/modules/criteria/components";
import { CriterionCreatePayload } from "~/modules/criteria/types.ts";
import { useCriteriaActions } from "~/modules/criteria/useCriteriaActions.ts";
import { CriterionMarkCreatePayload } from "~/modules/criterion-marks/types.ts";

type Emits = {
  (e: "success"): void;
};

type Props = {
  course: CourseDetails;
};

const emit = defineEmits<Emits>();
const { course } = defineProps<Props>();
const isOpen = defineModel<boolean>();
const { isCreating, createCriterion } = useCriteriaActions();

const initialFormState = {
  title: "",
  marks: [{ label: "", mark: 0 }] as CriterionMarkCreatePayload[],
};

const form = ref({ ...initialFormState });

const isValid = computed(() => {
  return form.value.title && form.value.marks.length > 1;
});

const onSubmit = async () => {
  if (!isValid.value || isCreating.value) return;

  const payload: CriterionCreatePayload = {
    title: form.value.title,
    courseId: course.id,
    marks: form.value.marks,
  };

  try {
    await createCriterion(payload);

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
        <DialogTitle class="text-xl font-semibold text-gray-900">Nouveau critère</DialogTitle>
      </DialogHeader>

      <p class="text-sm text-gray-500">
        Veuillez rentrer les informations nécessaires à la création d'un nouveau critère de
        notation.
      </p>

      <div>
        <label class="pb-2 text-sm text-gray-600" for="form-title">Titre</label>
        <Input id="form-title" v-model="form.title" required />
      </div>

      <SubContainerComponent title="Notes">
        <template #button>
          <Button
            v-if="form.marks.length > 0"
            class="hover:cursor-pointer"
            @click="form.marks.push({ label: '', mark: 0 })"
          >
            <SquarePlus class="mt-0.5" />
            <span class="hidden lg:block">Nouvelle note</span>
          </Button>
        </template>

        <CriteriaCreateDialogEmpty v-if="form.marks.length === 0" v-model="form.marks" />
        <template v-else>
          <div class="w-full max-w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-[20ch]">Nom</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead class="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(mark, i) in form.marks.values()" :key="`key-${i}`">
                  <TableCell class="font-medium">
                    <Input v-model="mark.label" required />
                  </TableCell>
                  <TableCell class="font-medium">
                    <NumberField v-model="mark.mark">
                      <NumberFieldContent>
                        <NumberFieldInput class="w-[6ch]" />
                      </NumberFieldContent>
                    </NumberField>
                  </TableCell>
                  <TableCell class="text-right">
                    <Button
                      class="h-8 w-8 hover:cursor-pointer"
                      variant="destructive"
                      @click="form.marks.splice(i, 1)"
                    >
                      <Trash class="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </template>
      </SubContainerComponent>

      <DialogFooter>
        <Button class="hover:cursor-pointer" variant="outline" @click="isOpen = false">
          Fermer
        </Button>

        <Button :disabled="isCreating" class="hover:cursor-pointer" @click="onSubmit">
          <Spinner :class="`h-4 w-4 ${!isCreating && 'hidden'}`" />
          Créer
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
