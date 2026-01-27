<script setup lang="ts">
import { ChevronRight, Clock, Plus, Users } from "lucide-vue-next";
import { ref } from "vue";

const courses = ref([
  {
    id: 1,
    title: "BTS Informatique de Gestion",
    code: "BTS-IG",
    description:
      "Formation complète sur la gestion des parcs informatiques, le développement d'applications et l'administration réseau.",
    studentsCount: 24,
    duration: "2 ans",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&h=250&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Bachelor Web Design",
    code: "B-WD",
    description:
      "Apprenez les fondamentaux de l'UX/UI Design, la suite Adobe et l'intégration web moderne (Tailwind, VueJS).",
    studentsCount: 18,
    duration: "3 ans",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&h=250&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Master Cybersécurité",
    code: "M-CYB",
    description:
      "Spécialisation dans la protection des données, les tests d'intrusion et la sécurité des infrastructures critiques.",
    studentsCount: 12,
    duration: "2 ans",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&h=250&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Licence Pro Marketing Digital",
    code: "LP-MD",
    description:
      "Maîtrisez les leviers du webmarketing : SEO, publicité payante, réseaux sociaux et analyse de données.",
    studentsCount: 30,
    duration: "1 an",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&h=250&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Expert Data Science",
    code: "E-DS",
    description:
      "Analyse avancée de données massives, Machine Learning et Intelligence Artificielle appliquée au business.",
    studentsCount: 15,
    duration: "2 ans",
    image:
      "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=400&h=250&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Bachelor Développement Mobile",
    code: "B-MOB",
    description:
      "Création d'applications natives et cross-platform pour iOS et Android avec Flutter et Swift.",
    studentsCount: 22,
    duration: "3 ans",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&h=250&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Management des Systèmes",
    code: "M-SI",
    description:
      "Direction de projets technologiques complexes et transformation digitale des entreprises.",
    studentsCount: 10,
    duration: "2 ans",
    image:
      "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=400&h=250&auto=format&fit=crop",
  },
]);
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-gray-800">
          Formations
        </h1>
        <p class="text-sm text-gray-400">
          Gérez le catalogue des programmes et leurs critères.
        </p>
      </div>

      <button
        class="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-[13px] font-bold text-blue-600 transition-all outline-none hover:bg-blue-100 active:scale-95"
      >
        <Plus class="h-4 w-4" />
        Nouvelle formation
      </button>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="course in courses"
        :key="course.id"
        :to="`/courses/${course.id}`"
        class="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05)]"
      >
        <div class="relative h-48 w-full overflow-hidden bg-gray-50">
          <img
            :src="course.image"
            :alt="course.title"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div class="absolute top-4 left-4">
            <span
              class="rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-extrabold tracking-widest text-gray-700 uppercase shadow-sm backdrop-blur-md"
            >
              {{ course.code }}
            </span>
          </div>
        </div>

        <div class="flex flex-1 flex-col p-5">
          <h2
            class="mb-2 text-[16px] font-bold text-gray-800 transition-colors group-hover:text-blue-600"
          >
            {{ course.title }}
          </h2>

          <p
            class="mb-5 line-clamp-2 text-xs leading-relaxed font-medium text-gray-400"
          >
            {{ course.description }}
          </p>

          <div
            class="mt-auto flex items-center justify-between border-t border-gray-50 pt-4"
          >
            <div class="flex items-center gap-4 text-gray-400">
              <div class="flex items-center gap-1.5">
                <Users class="h-4 w-4 text-gray-300" />
                <span class="text-[12px] font-semibold">{{
                  course.studentsCount
                }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Clock class="h-4 w-4 text-gray-300" />
                <span class="text-[12px] font-semibold">{{
                  course.duration
                }}</span>
              </div>
            </div>

            <div
              class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-300 transition-all group-hover:bg-blue-50 group-hover:text-blue-500"
            >
              <ChevronRight class="h-4 w-4" />
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
