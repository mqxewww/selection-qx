<script lang="ts" setup>
import { AlertCircleIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "~/components/ui/dialog";
import { Spinner } from "~/components/ui/spinner";
import { CourseDetails } from "~/modules/courses/types.ts";
import { useCoursesActions } from "~/modules/courses/useCoursesActions.ts";

type Props = {
  course: CourseDetails;
};

const { course } = defineProps<Props>();
const isOpen = defineModel<boolean>();

const router = useRouter();

const { isDeleting, deleteCourse } = useCoursesActions();

const onSubmit = async () => {
  if (isDeleting.value) return;

  try {
    await deleteCourse(course.id);

    await router.push("/courses");
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-xl font-semibold text-gray-900">
          Supprimer la formation '{{ course.title }}' ?
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
          :disabled="isDeleting"
          class="hover:cursor-pointer"
          variant="destructive"
          @click="onSubmit"
        >
          <Spinner :class="`h-4 w-4 ${!isDeleting && 'hidden'}`" />
          Supprimer
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
