<script lang="ts" setup>
import { SquarePlus } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "~/components/ui/empty";

const isOpen = defineModel<boolean>();
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyTitle>Aucune critère ajouté</EmptyTitle>
      <EmptyDescription>Créez votre premier critère avec le bouton ci-dessous.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button class="hover:cursor-pointer" @click="isOpen = true">
        <SquarePlus class="mt-0.5" />
        <span class="hidden lg:block">Nouveau critère</span>
      </Button>
    </EmptyContent>
  </Empty>
</template>
