<script lang="ts" setup>
import { CornerDownLeft, SquarePlus, Trash } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
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
import { CriterionListItem, CriterionUpdatePayload } from "~/modules/criteria/types.ts";
import { useCriteriaActions } from "~/modules/criteria/useCriteriaActions.ts";
import { CriterionMarkUpdatePayload } from "~/modules/criterion-marks/types.ts";

type Emits = {
  (e: "success"): void;
};

type Props = {
  criterion: CriterionListItem | null;
};

const emit = defineEmits<Emits>();
const { criterion } = defineProps<Props>();
const isOpen = defineModel<boolean>();
const { isUpdating, updateCriterion } = useCriteriaActions();

const initialFormState = {
  title: "",
  marks: [] as CriterionMarkUpdatePayload[],
};

const form = ref({ ...initialFormState });

const isValid = computed(() => {
  return form.value.title && form.value.marks.length > 1;
});

const onSubmit = async () => {
  if (!criterion || !isValid.value || isUpdating.value) return;

  const payload: CriterionUpdatePayload = {
    title: form.value.title,
    marks: form.value.marks,
  };

  try {
    await updateCriterion(criterion.id, payload);

    emit("success");
    isOpen.value = false;

    form.value = { ...initialFormState };
  } catch (e) {
    console.error(e);
  }
};

const toggleMarkDelete = (i: number, mark: CriterionMarkUpdatePayload) => {
  if (mark.id) {
    mark.delete = true;

    return;
  }

  form.value.marks.splice(i, 1);
};

watch(isOpen, (isOpened) => {
  if (!criterion) return;

  form.value = {
    title: isOpened ? criterion.title : "",
    marks: isOpened
      ? (criterion.marks.map((mark) => {
          return {
            id: mark.id,
            label: mark.label,
            mark: mark.mark,
            delete: false,
          };
        }) as CriterionMarkUpdatePayload[])
      : ([] as CriterionMarkUpdatePayload[]),
  };
});
</script>

<template>
  <Dialog v-if="criterion" v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-xl font-semibold text-gray-900">
          Modification du critère {{ criterion.title }}
        </DialogTitle>
      </DialogHeader>

      <div>
        <label class="pb-2 text-sm text-gray-600" for="form-title">Titre</label>
        <Input id="form-title" v-model="form.title" required />
      </div>

      <SubContainerComponent title="Notes">
        <template #button>
          <Button
            v-if="form.marks.length > 0"
            class="hover:cursor-pointer"
            @click="form.marks.push({ label: '', mark: 0, delete: false })"
          >
            <SquarePlus class="mt-0.5" />
            <span class="hidden lg:block">Nouvelle note</span>
          </Button>
        </template>

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
                  <Input v-model="mark.label" :disabled="mark.delete" required />
                </TableCell>
                <TableCell class="font-medium">
                  <NumberField v-model="mark.mark" :disabled="mark.delete">
                    <NumberFieldContent>
                      <NumberFieldInput class="w-[6ch]" />
                    </NumberFieldContent>
                  </NumberField>
                </TableCell>
                <TableCell class="text-right">
                  <Button
                    v-if="!mark.delete"
                    class="h-8 w-8 hover:cursor-pointer"
                    variant="destructive"
                    @click="toggleMarkDelete(i, mark)"
                  >
                    <Trash class="h-4 w-4" />
                  </Button>
                  <Button v-else class="h-8 w-8 hover:cursor-pointer" @click="mark.delete = false">
                    <CornerDownLeft class="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </SubContainerComponent>

      <DialogFooter>
        <Button class="hover:cursor-pointer" variant="outline" @click="isOpen = false">
          Fermer
        </Button>

        <Button :disabled="isUpdating" class="hover:cursor-pointer" @click="onSubmit">
          <Spinner :class="`h-4 w-4 ${!isUpdating && 'hidden'}`" />
          Modifier
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
