<script lang="ts" setup>
import { CornerDownLeft, SquarePlus, Trash } from "lucide-vue-next";
import { ref, watch } from "vue";
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
import { Criterion } from "~/composables/courses/useCourseById.ts";
import {
  CriteriaUpdateDTO,
  CriterionMarkUpdateDTO,
  useCriteriaUpdate,
} from "~/composables/criteria/useCriteriaUpdate.ts";

type Props = {
  courseId: string;
  criteriaData: Criterion | null;
  fetchCourse: (id: number) => Promise<void>;
};

const props = defineProps<Props>();
const isOpen = defineModel<boolean>();

const titleRef = ref<string>("");
const criterionMarksRef = ref<CriterionMarkUpdateDTO[]>([]);

const { loading, success, updateCriteria } = useCriteriaUpdate();

const confirmUpdate = async () => {
  if (loading.value || !titleRef.value || !props.criteriaData) return;

  const payload: CriteriaUpdateDTO = {
    title: titleRef.value,
    criterionMarks: criterionMarksRef.value,
  };

  await updateCriteria(props.criteriaData.id, payload);

  if (success) {
    isOpen.value = false;

    await props.fetchCourse(Number(props.courseId));
  }
};

const onBinClick = (i: number, mark: CriterionMarkUpdateDTO) => {
  if (mark.id) {
    mark.delete = true;

    return;
  }

  criterionMarksRef.value.splice(i, 1);
};

watch(isOpen, (value) => {
  if (value && props.criteriaData) {
    titleRef.value = props.criteriaData.title;

    for (const mark of props.criteriaData.marks) {
      criterionMarksRef.value.push({
        id: mark.id,
        label: mark.label,
        mark: mark.mark,
        delete: false,
      });
    }
  } else if (!value) {
    titleRef.value = "";
    criterionMarksRef.value = [];
  }
});
</script>

<template>
  <Dialog v-if="criteriaData" v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-xl font-semibold text-gray-900"
          >Modification du critère {{ criteriaData.title }}</DialogTitle
        >
      </DialogHeader>

      <div>
        <p class="text-sm text-gray-600 pb-2">
          <label for="capacity">Titre</label>
        </p>
        <Input v-model="titleRef" required />
      </div>

      <SubContainerComponent title="Notes">
        <template #button>
          <Button
            v-if="criterionMarksRef.length > 0"
            class="hover:cursor-pointer"
            @click="criterionMarksRef.push({ label: '', mark: 0, delete: false })"
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
              <TableRow v-for="(mark, i) in criterionMarksRef.values()" :key="`key-${i}`">
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
                    class="w-8 h-8 hover:cursor-pointer"
                    variant="destructive"
                    @click="onBinClick(i, mark)"
                  >
                    <Trash class="w-4 h-4" />
                  </Button>
                  <Button v-else class="w-8 h-8 hover:cursor-pointer" @click="mark.delete = false">
                    <CornerDownLeft class="w-4 h-4" />
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

        <Button :disabled="loading" class="hover:cursor-pointer" @click="confirmUpdate">
          <Spinner :class="`w-4 h-4 ${!loading && 'hidden'}`" />
          Modifier
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
