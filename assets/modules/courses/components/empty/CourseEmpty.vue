<script lang="ts" setup>
import { FileQuestionMark } from "lucide-vue-next";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FileQuestionMark />
      </EmptyMedia>
      <EmptyTitle>Une erreur est survenue.</EmptyTitle>
      <EmptyDescription>
        Une erreur est survenue lors de la récupération des données. Veuillez retourner sur la
        précédente page.
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
</template>
