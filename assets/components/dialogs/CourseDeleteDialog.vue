<script lang="ts" setup>
import { AlertCircleIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "~/components/ui/dialog";
import { Spinner } from "~/components/ui/spinner";
import { useCourseDelete } from "~/composables/courses/useCourseDelete.ts";

type Props = {
  title: string;
  courseId: string;
};

const router = useRouter();

const props = defineProps<Props>();
const isOpen = defineModel<boolean>();

const { loading, success, deleteCourse } = useCourseDelete();

const confirmDelete = async () => {
  if (loading.value) return;

  await deleteCourse(Number(props.courseId));

  if (success) {
    isOpen.value = false;

    await router.push("/courses");
  }
};
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-xl font-semibold text-gray-900">
          Supprimer la formation '{{ props.title }}' ?
        </DialogTitle>
      </DialogHeader>

      <p class="text-sm text-gray-500">
        Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce cours ?
      </p>

      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Des candidatures sont encore liées à cette formation</AlertTitle>
        <AlertDescription>
          <p>Si ne voulez pas supprimer les candidatures encore associées :</p>
          <ul class="mt-2 list-inside list-disc space-y-1">
            <li>Pour chacune des candidatures, changez la formation qui leur est associée.</li>
          </ul>
        </AlertDescription>
      </Alert>

      <DialogFooter>
        <Button class="hover:cursor-pointer" variant="outline" @click="isOpen = false">
          Annuler
        </Button>

        <Button
          :disabled="loading"
          class="hover:cursor-pointer"
          variant="destructive"
          @click="confirmDelete"
        >
          <Spinner :class="`w-4 h-4 ${!loading && 'hidden'}`" />
          Supprimer
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
