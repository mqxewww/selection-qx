<script lang="ts" setup>
import { FilePlusCorner, FileQuestionMark } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";

const isOpen = defineModel<boolean>();
</script>

<template>
  <div class="grid grid-cols-1 items-center">
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileQuestionMark />
        </EmptyMedia>
        <EmptyTitle>Aucune formation ajoutée</EmptyTitle>
        <EmptyDescription>
          Vous n'avez pas encore ajouté de formations. Commencez par ajouter votre première
          formation avec le bouton ci-dessous.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button class="hover:cursor-pointer" @click="isOpen = true">
          <FilePlusCorner class="mt-0.5 h-4 w-4" />
          <span class="hidden lg:block">Ajouter une formation</span>
        </Button>
      </EmptyContent>
    </Empty>
  </div>
</template>
