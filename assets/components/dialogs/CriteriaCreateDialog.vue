<script lang="ts" setup>
import { SquarePlus, Trash } from "lucide-vue-next";
import { ref } from "vue";
import SubContainerComponent from "~/components/SubContainerComponent.vue";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "~/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "~/components/ui/empty";
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
import {
  CriteriaCreateDTO,
  CriterionMarkCreateDTO,
  useCriteriaCreate,
} from "~/composables/criteria/useCriteriaCreate.ts";

type Props = {
  courseId: string;
  fetchCourse: (id: number) => Promise<void>;
};

const props = defineProps<Props>();
const isOpen = defineModel<boolean>();

const titleRef = ref<string>("");
const criterionMarksRef = ref<CriterionMarkCreateDTO[]>([{ label: "", mark: 0 }]);

const { loading, success, createCriteria } = useCriteriaCreate();

const confirmCreate = async () => {
  if (loading.value || !titleRef.value) return;

  const payload: CriteriaCreateDTO = {
    title: titleRef.value,
    courseId: Number(props.courseId),
    criterionMarks: criterionMarksRef.value,
  };

  await createCriteria(payload);

  if (success) {
    isOpen.value = false;

    await props.fetchCourse(Number(props.courseId));
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
            @click="criterionMarksRef.push({ label: '', mark: 0 })"
          >
            <SquarePlus class="mt-0.5" />
            <span class="hidden lg:block">Nouvelle note</span>
          </Button>
        </template>

        <template v-if="criterionMarksRef.length === 0">
          <Empty>
            <EmptyHeader>
              <EmptyTitle>Aucune note ajoutée</EmptyTitle>
              <EmptyDescription>
                Créez votre premiere note avec le bouton ci-dessous.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                class="hover:cursor-pointer"
                @click="criterionMarksRef.push({ label: '', mark: 0 })"
              >
                <SquarePlus class="mt-0.5" />
                <span class="hidden lg:block">Nouvelle note</span>
              </Button>
            </EmptyContent>
          </Empty>
        </template>
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
                <TableRow v-for="(mark, i) in criterionMarksRef.values()" :key="`key-${i}`">
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
                      class="w-8 h-8 hover:cursor-pointer"
                      variant="destructive"
                      @click="criterionMarksRef.splice(i, 1)"
                    >
                      <Trash class="w-4 h-4" />
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

        <Button :disabled="loading" class="hover:cursor-pointer" @click="confirmCreate">
          <Spinner :class="`w-4 h-4 ${!loading && 'hidden'}`" />
          Créer
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
