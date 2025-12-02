<script lang="ts" setup>
import { Eye, FilePlusCorner, FileQuestionMark } from "lucide-vue-next";
import { onMounted, ref, watch } from "vue";
import ContainerComponent from "~/components/ContainerComponent.vue";
import { Button } from "~/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ApplicationStatus } from "~/modules/applications/enums/application-status.ts";
import { useApplicationsActions } from "~/modules/applications/useApplicationsActions.ts";

const { isFetchingList, applicationsDto, fetchApplicationsList } = useApplicationsActions();

const itemsPerPage = ref<number>(5);
const page = ref<number>(1);
const optionSelected = ref<number>(0);

const isCreateDialogOpen = ref(false);

onMounted(async () => {
  await fetchApplicationsList(page.value, itemsPerPage.value, optionSelected.value);
});

watch([page, optionSelected], async () => {
  await fetchApplicationsList(page.value, itemsPerPage.value, optionSelected.value);
});
</script>

<template>
  <ContainerComponent
    description="Voir et modifier les candidatures disponibles"
    title="Candidatures"
  >
    <template #button>
      <template v-if="isFetchingList">
        <Skeleton class="h-10 w-48 rounded-2xl" />
      </template>
      <template v-else-if="!applicationsDto || applicationsDto.applications.length === 0" />
      <template v-else>
        <Button class="hover:cursor-pointer" @click="isCreateDialogOpen = true">
          <FilePlusCorner class="w-4 h-4 mt-0.5" />
          <span class="hidden lg:block">Ajouter une candidature</span>
        </Button>
      </template>
    </template>

    <template
      v-if="!isFetchingList && (!applicationsDto || applicationsDto.applications.length === 0)"
    >
      <div class="grid grid-cols-1 items-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileQuestionMark />
            </EmptyMedia>
            <EmptyTitle>Aucune candidature ajoutée</EmptyTitle>
            <EmptyDescription>
              Vous n'avez pas encore ajouté de candidatures. Commencez par ajouter votre première
              candidature avec le bouton ci-dessous.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button class="hover:cursor-pointer" @click="isCreateDialogOpen = true">
              <FilePlusCorner class="w-4 h-4 mt-0.5" />
              <span class="hidden lg:block">Ajouter une candidature</span>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col gap-6">
        <Select v-model:model-value="optionSelected">
          <SelectTrigger class="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <!--              <template v-for="option in coursesOptions" :key="option.id">-->
              <!--                <SelectItem :value="option.id">-->
              <!--                  {{ option.title }}-->
              <!--                </SelectItem>-->
              <!--              </template>-->
            </SelectGroup>
          </SelectContent>
        </Select>

        <div class="w-full max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[8ch]"> Numéro </TableHead>
                <TableHead class="w-[20ch]"> Étudiant </TableHead>
                <TableHead>Formation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ajoutée le</TableHead>
                <TableHead class="text-right"> Actions </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <template v-if="isFetchingList">
                <TableRow v-for="n in 5" :key="'skel-' + n">
                  <TableCell class="font-semibold">
                    <Skeleton class="h-5 w-[5ch] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton class="h-5 w-[12ch] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton class="h-5 w-[14ch] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton class="h-5 w-[10ch] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton class="h-5 w-[12ch] rounded-md" />
                  </TableCell>
                  <TableCell class="text-right">
                    <Button class="w-8 h-8 hover:cursor-pointer">
                      <Eye class="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </template>
              <template v-else-if="applicationsDto">
                <TableRow v-for="application in applicationsDto.applications" :key="application.id">
                  <TableCell class="font-semibold">
                    {{ `#000${application.id}` }}
                  </TableCell>
                  <TableCell>
                    <span class="font-semibold">{{ application.lastname }}</span>
                    {{ application.firstname }}
                  </TableCell>
                  <TableCell>
                    {{ application.course_title }}
                  </TableCell>
                  <TableCell>
                    <span
                      :class="`inline-flex items-center px-2 py-1 rounded-lg text-xs border ${application.status === ApplicationStatus.PENDING ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : application.status === ApplicationStatus.ACCEPTED ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`"
                    >
                      {{ application.status }}
                    </span>
                  </TableCell>
                  <TableCell>
                    {{ application.createdAt }}
                  </TableCell>
                  <TableCell class="text-right">
                    <Button class="w-8 h-8 hover:cursor-pointer">
                      <Eye class="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </template>
            </TableBody>
          </Table>
        </div>

        <Pagination
          v-model:page="page"
          :default-page="1"
          :items-per-page="itemsPerPage"
          :total="applicationsDto?.total ?? 0"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationPrevious />

            <template v-for="(item, index) in items" :key="index">
              <PaginationItem
                v-if="item.type === 'page'"
                :is-active="item.value === page"
                :value="item.value"
              >
                {{ item.value }}
              </PaginationItem>
            </template>

            <PaginationNext />
          </PaginationContent>
        </Pagination>
      </div>
    </template>
  </ContainerComponent>
</template>
