<script setup lang="ts">
import {
  FileText,
  GraduationCap,
  LogOut,
  UserRound,
  UsersRound,
} from "lucide-vue-next";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

const navigation = [
  { name: "Utilisateurs", href: "/users", icon: UsersRound },
  { name: "Formations", href: "/courses", icon: GraduationCap },
  { name: "Candidatures", href: "/applications", icon: FileText },
];

const route = useRoute();
const isCurrent = (path: string) => route.path.startsWith(path);

const isMenuOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node))
    isMenuOpen.value = false;
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));

const user = {
  name: "Jean Dupont",
  role: "Coordinateur",
};
</script>

<template>
  <header
    class="sticky top-0 z-50 flex h-12 w-full items-center border-b border-gray-200 bg-white px-4 shadow-lg"
  >
    <div class="flex flex-1 items-center gap-2">
      <img src="/favicon.ico" alt="Logo" class="h-6 w-6" />
      <span class="font-bold text-gray-700">SelectionQX</span>
    </div>

    <nav class="flex h-full items-center gap-1">
      <RouterLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="relative flex h-full items-center gap-1.5 px-3 text-[13px] font-medium transition-colors outline-none"
        :class="[
          isCurrent(item.href)
            ? 'text-blue-600'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
        ]"
      >
        <component :is="item.icon" class="h-4 w-4" />
        <span>{{ item.name }}</span>

        <span
          v-if="isCurrent(item.href)"
          class="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600"
        ></span>
      </RouterLink>
    </nav>

    <div class="flex flex-1 justify-end">
      <div ref="menuRef" class="relative">
        <button
          type="button"
          class="flex items-center justify-center rounded-full p-1 text-gray-500 transition-colors outline-none hover:cursor-pointer hover:text-gray-900 focus:outline-none active:outline-none"
          :class="{ 'bg-gray-50 text-gray-900': isMenuOpen }"
          @click="toggleMenu"
        >
          <UserRound class="h-5 w-5" />
        </button>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95 -translate-y-1"
          enter-to-class="transform opacity-100 scale-100 translate-y-0"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100 translate-y-0"
          leave-to-class="transform opacity-0 scale-95 -translate-y-1"
        >
          <div
            v-if="isMenuOpen"
            class="absolute right-0 mt-1 w-max origin-top-right rounded-lg border border-gray-200 bg-white text-right shadow-lg"
          >
            <div class="border-b border-gray-50 px-3 py-2.5">
              <p class="truncate text-sm font-medium text-gray-800">
                {{ user.name }}
              </p>
              <p class="truncate text-xs text-gray-400">{{ user.role }}</p>
            </div>

            <div class="flex justify-end p-1">
              <button
                class="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:cursor-pointer hover:bg-red-50 hover:text-red-600"
              >
                <LogOut class="h-3.5 w-3.5" />
                Se déconnecter
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
