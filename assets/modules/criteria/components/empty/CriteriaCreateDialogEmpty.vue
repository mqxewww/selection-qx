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
import { CriterionMarkCreatePayload } from "~/modules/criterion-marks/types.ts";

const marks = defineModel<CriterionMarkCreatePayload[]>();
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyTitle>Aucune note ajoutée</EmptyTitle>
      <EmptyDescription>Créez votre premiere note avec le bouton ci-dessous.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button class="hover:cursor-pointer" @click="marks!.push({ label: '', mark: 0 })">
        <SquarePlus class="mt-0.5" />
        <span class="hidden lg:block">Nouvelle note</span>
      </Button>
    </EmptyContent>
  </Empty>
</template>
