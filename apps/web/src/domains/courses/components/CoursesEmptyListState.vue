<script setup lang="ts">
import { BookOpen } from "lucide-vue-next";

type Props = {
  isError?: boolean;
};

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center py-24">
    <div class="mb-8 flex items-center justify-center">
      <div
        class="flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-700/60 bg-zinc-800/80 shadow-lg shadow-black/30 backdrop-blur-sm"
      >
        <BookOpen class="h-9 w-9 text-zinc-500" />

        <span
          class="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-zinc-700"
        />
        <span
          class="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-zinc-700"
        />
        <span
          class="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-zinc-700"
        />
        <span
          class="absolute -right-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-700"
        />
      </div>
    </div>

    <div class="text-center">
      <h2 class="text-xl font-bold tracking-tight text-zinc-200">
        {{
          props.isError
            ? "Une erreur est survenue"
            : "Aucune formation disponible"
        }}
      </h2>
      <p class="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
        {{
          props.isError
            ? "Impossible de récupérer les formations. Vérifiez votre connexion ou réessayez dans quelques instants."
            : "Le catalogue est vide pour le moment. Commencez par créer votre première formation."
        }}
      </p>
    </div>

    <div class="mt-10 flex items-center gap-3">
      <div class="h-px w-16 bg-linear-to-r from-transparent to-zinc-700" />
      <div class="h-1 w-1 rounded-full bg-zinc-600" />
      <div class="h-px w-16 bg-linear-to-r from-transparent to-zinc-700" />
    </div>
  </div>
</template>
