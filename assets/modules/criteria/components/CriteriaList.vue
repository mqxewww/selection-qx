<script lang="ts" setup>
import { PencilLine, SquarePlus, Trash } from "lucide-vue-next";
import { ref } from "vue";
import SubContainerComponent from "~/components/SubContainerComponent.vue";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
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
import { CriteriaListEmpty } from "~/modules/criteria/components";
import CriteriaCreateDialog from "~/modules/criteria/components/dialogs/CriteriaCreateDialog.vue";
import CriteriaUpdateDialog from "~/modules/criteria/components/dialogs/CriteriaUpdateDialog.vue";
import { CriterionListItem } from "~/modules/criteria/types.ts";
import { useCriteriaActions } from "~/modules/criteria/useCriteriaActions.ts";

type Emits = {
  (e: "success"): void;
};

type Props = {
  course: CourseDetails;
};

const emit = defineEmits<Emits>();
const { course } = defineProps<Props>();

const { isDeleting, deleteCriterion } = useCriteriaActions();

const selectedCriterion = ref<CriterionListItem | null>(null);
const isCreateDialogOpen = ref<boolean>(false);
const isUpdateDialogOpen = ref<boolean>(false);

const openUpdateCriteriaDialog = (criterion: CriterionListItem) => {
  isUpdateDialogOpen.value = true;
  selectedCriterion.value = criterion;
};

const confirmDelete = async (id: number) => {
  if (isDeleting.value) return;

  try {
    await deleteCriterion(id);

    emit("success");
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <SubContainerComponent title="Critères">
    <template #button>
      <Button
        v-if="course.criteria.length > 0"
        class="hover:cursor-pointer"
        @click="isCreateDialogOpen = true"
      >
        <SquarePlus class="mt-0.5" />
        <span class="hidden lg:block">Nouveau critère</span>
      </Button>
    </template>

    <CriteriaListEmpty v-if="course.criteria.length === 0" v-model="isCreateDialogOpen" />
    <template v-else>
      <div class="w-full max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[20ch]">Nom</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="criterion in course.criteria.values()" :key="criterion.title">
              <TableCell class="font-medium">
                {{ criterion.title }}
              </TableCell>
              <TableCell class="space-x-2">
                <span
                  v-for="mark in criterion.marks"
                  :key="mark.label"
                  class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                >
                  {{ mark.label }}
                  <span class="ml-1 text-xs text-gray-500">({{ mark.mark }})</span>
                </span>
              </TableCell>
              <TableCell class="space-x-2 text-right">
                <Button
                  class="h-8 w-8 hover:cursor-pointer"
                  @click="openUpdateCriteriaDialog(criterion)"
                >
                  <PencilLine class="h-4 w-4" />
                </Button>
                <Popover>
                  <PopoverTrigger>
                    <Button class="h-8 w-8 hover:cursor-pointer" variant="destructive">
                      <Trash class="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="mr-10 w-fit space-y-2 rounded-xl text-base shadow-2xl">
                    <div class="font-semibold text-gray-900">
                      Supprimer le critère '{{ criterion.title }}' ?
                    </div>
                    <div class="flex flex-row justify-end">
                      <Button
                        :disabled="isDeleting"
                        class="hover:cursor-pointer"
                        @click="confirmDelete(criterion.id)"
                      >
                        <Spinner :class="`h-4 w-4 ${!isDeleting && 'hidden'}`" />
                        <span class="hidden lg:block">Confirmer</span>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </template>
  </SubContainerComponent>
  <CriteriaCreateDialog v-model="isCreateDialogOpen" :course="course" @success="emit('success')" />
  <CriteriaUpdateDialog
    v-model="isUpdateDialogOpen"
    :criterion="selectedCriterion"
    @success="emit('success')"
  />
</template>
