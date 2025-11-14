<script lang="ts" setup>
import { PhFileText, PhGraduationCap, PhUser } from "@phosphor-icons/vue";
import { useRoute } from "vue-router";
import { HeaderRoute } from "../types/header-route";

const routes: HeaderRoute[] = [
  {
    label: "Formations",
    iconComponent: PhGraduationCap,
    url: "/courses",
    urlPrefix: "courses",
  },
  {
    label: "Candidatures",
    iconComponent: PhFileText,
    url: "/applications",
    urlPrefix: "applications",
  },
];
function isActive(prefix: string) {
  const route = useRoute();

  return route.path.startsWith(`/${prefix}`);
}
</script>

<template>
  <header class="border-b border-gray-200 p-2 lg:p-4">
    <nav class="flex justify-between items-center">
      <ul class="flex gap-2">
        <li v-for="route in routes" :key="route.urlPrefix">
          <router-link
            :class="[
              'focus:outline-none font-medium rounded-md text-center inline-flex items-center text-sm px-4 py-2 transition duration-300',
              isActive(route.urlPrefix) ? 'bg-[#24292F] text-white' : 'hover:bg-gray-300',
            ]"
            :to="route.url"
          >
            <component :is="route.iconComponent" class="w-5 h-5 lg:mr-1.5" />
            <span class="hidden lg:block">{{ route.label }}</span>
          </router-link>
        </li>
      </ul>
      <div
        class="font-semibold border border-gray-200 rounded-md text-center inline-flex items-center text-sm px-3 py-1.5"
      >
        <PhUser class="w-5 h-5 mr-1.5" />
        <p>John Doe</p>
      </div>
    </nav>
  </header>
</template>
