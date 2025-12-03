<script lang="ts" setup>
import { FileText, GraduationCap, LogOut, UserRound } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

type HeaderRoute = {
  label: string;
  iconComponent: unknown;
  url: string;
  urlPrefix: string;
};

const routes: HeaderRoute[] = [
  {
    label: "Formations",
    iconComponent: GraduationCap,
    url: "/courses",
    urlPrefix: "courses",
  },
  {
    label: "Candidatures",
    iconComponent: FileText,
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
    <nav class="flex items-center justify-between">
      <ul class="flex gap-2">
        <li v-for="route in routes" :key="route.urlPrefix">
          <RouterLink :to="route.url">
            <Button
              :variant="isActive(route.urlPrefix) ? 'default' : 'ghost'"
              class="hover:cursor-pointer"
            >
              <component :is="route.iconComponent" class="h-4 w-4" />
              {{ route.label }}
            </Button>
          </RouterLink>
        </li>
      </ul>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar class="cursor-pointer transition hover:opacity-90">
            <AvatarFallback>
              <UserRound class="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent class="mt-1.5 mr-4 w-fit">
          <DropdownMenuItem class="text-red-600 hover:cursor-pointer">
            <LogOut class="h-4 w-4" />
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  </header>
</template>
