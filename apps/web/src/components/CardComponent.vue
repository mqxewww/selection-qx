<script setup lang="ts">
import { ChevronRight, Clock, Users } from "lucide-vue-next";
import { generateTypeCode } from "~/libs/utils.ts";

type Props = {
  title: string;
  description: string;
  studentCount: number;
  duration: number;
};

const p = defineProps<Props>();
</script>

<template>
  <div
    class="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05)]"
  >
    <div class="relative h-48 w-full overflow-hidden bg-gray-50">
      <img
        src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&h=250&auto=format&fit=crop"
        :alt="p.title"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div class="absolute top-4 left-4">
        <span
          class="rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-extrabold tracking-widest text-gray-700 uppercase shadow-sm backdrop-blur-md"
        >
          {{ generateTypeCode(p.title) }}
        </span>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <h2
        class="mb-2 text-[16px] font-bold text-gray-800 transition-colors group-hover:text-blue-600"
      >
        {{ p.title }}
      </h2>

      <p
        class="mb-5 line-clamp-2 text-xs leading-relaxed font-medium text-gray-400"
      >
        {{ p.description }}
      </p>

      <div
        class="mt-auto flex items-center justify-between border-t border-gray-50 pt-4"
      >
        <div class="flex items-center gap-4 text-gray-400">
          <div class="flex items-center gap-1.5">
            <Users class="h-4 w-4 text-gray-300" />
            <span class="text-[12px] font-semibold">15</span>
          </div>
          <div class="flex items-center gap-1.5">
            <Clock class="h-4 w-4 text-gray-300" />
            <span class="text-[12px] font-semibold">{{ p.duration }} mois</span>
          </div>
        </div>

        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-300 transition-all group-hover:bg-blue-50 group-hover:text-blue-500"
        >
          <ChevronRight class="h-4 w-4" />
        </div>
      </div>
    </div>
  </div>
</template>
