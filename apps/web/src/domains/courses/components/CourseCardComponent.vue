<script setup lang="ts">
import { ChevronRight, Clock, Users } from "lucide-vue-next";
import { generateTypeCode } from "~/libs/utils.ts";

type Props = {
  title: string;
  description: string;
  studentCount: number;
  duration: number;
  bgImage: string | null;
};

defineProps<Props>();

const backendUrl = import.meta.env.VITE_API_URL;
</script>

<template>
  <div
    class="group flex flex-col overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
  >
    <div class="relative h-48 w-full overflow-hidden bg-zinc-700">
      <img
        :src="
          bgImage
            ? `${backendUrl}${bgImage}`
            : 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&h=250&auto=format&fit=crop'
        "
        :alt="title"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div class="absolute top-4 left-4">
        <span
          class="rounded-md bg-zinc-900/80 px-2.5 py-1 text-[10px] font-bold tracking-widest text-zinc-300 uppercase shadow-sm backdrop-blur-md"
        >
          {{ generateTypeCode(title) }}
        </span>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <h2
        class="mb-2 text-base font-bold text-zinc-100 transition-colors group-hover:text-blue-300"
      >
        {{ title }}
      </h2>

      <p
        class="mb-5 line-clamp-2 text-xs leading-relaxed font-medium text-zinc-400"
      >
        {{ description }}
      </p>

      <div
        class="mt-auto flex items-center justify-between border-t border-zinc-700/50 pt-4"
      >
        <div class="flex items-center gap-4 text-zinc-500">
          <div class="flex items-center gap-1.5">
            <Users class="h-4 w-4" />
            <span class="text-xs font-semibold text-zinc-400">15</span>
          </div>
          <div class="flex items-center gap-1.5">
            <Clock class="h-4 w-4" />
            <span class="text-xs font-semibold text-zinc-400">
              {{ duration }} mois
            </span>
          </div>
        </div>

        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700/50 text-zinc-400 transition-colors group-hover:bg-blue-500/10 group-hover:text-blue-300"
        >
          <ChevronRight class="h-4 w-4" />
        </div>
      </div>
    </div>
  </div>
</template>
