<script setup lang="ts">
import { ArrowLeft, ListChecks, Pencil, Plus, Trash } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ButtonComponent from "~web/components/ButtonComponent.vue";
import { useApi } from "~web/composables/useApi.ts";
import CriteriaEmptyListState from "~web/domains/criteria/components/CriteriaEmptyListState.vue";
import {
  CriteriaResponse,
  criteriaService,
  Criterion,
} from "~web/domains/criteria/criteria.service.ts";
import CriterionCreateOrEditModal from "~web/domains/criteria/modals/CriterionCreateOrEditModal.vue";
import CriterionDeleteModal from "~web/domains/criteria/modals/CriterionDeleteModal.vue";

const props = defineProps<{ id: string }>();
const router = useRouter();

const { execute, data, loading } = useApi<CriteriaResponse>();

const fetchCriteria = async () => {
  await execute(() => criteriaService.getByCourseId(props.id));
};

const selectedCriterion = ref<Criterion | null>(null);
const isCreateOrEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const openCreateOrEditModal = (criterion?: Criterion) => {
  if (criterion) selectedCriterion.value = criterion;

  isCreateOrEditModalOpen.value = true;
};

const closeModal = () => {
  selectedCriterion.value = null;
  isCreateOrEditModalOpen.value = false;
  isDeleteModalOpen.value = false;
};

const openDeleteModal = (criterion: Criterion) => {
  selectedCriterion.value = criterion;
  isDeleteModalOpen.value = true;
};

onMounted(fetchCriteria);
</script>

<template>
  <div class="mx-auto w-full max-w-6xl space-y-6 pb-24">
    <div class="flex items-center justify-between">
      <ButtonComponent
        variant="ghost"
        @click="router.push(`/courses/${props.id}`)"
      >
        <ArrowLeft
          class="h-4 w-4 transition-transform group-hover:-translate-x-1"
        />
        Retour à la formation
      </ButtonComponent>

      <div class="flex items-center gap-3">
        <ButtonComponent variant="primary" @click="openCreateOrEditModal()">
          <Plus class="h-4 w-4" />
          Ajouter un critère
        </ButtonComponent>
      </div>
    </div>

    <div class="rounded-2xl border border-zinc-700/50 bg-zinc-800 p-6 md:p-8">
      <div class="flex flex-col">
        <span
          v-if="data"
          class="mb-2 text-[11px] font-bold tracking-widest text-zinc-500 uppercase"
        >
          {{ data.title }}
        </span>
        <div
          v-else
          class="mb-2 h-5 w-20 animate-pulse rounded-md bg-zinc-700/50"
        />

        <h1 class="text-3xl font-extrabold tracking-tight text-zinc-100">
          Critères de notation
        </h1>

        <p class="mt-4 leading-relaxed text-zinc-400">
          Définissez ici les barèmes et compétences qui seront évalués pour
          cette formation.
        </p>
      </div>
    </div>

    <div
      v-if="loading"
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="n in 3"
        :key="n"
        class="flex flex-col rounded-2xl border border-zinc-700/50 bg-zinc-800 p-6"
      >
        <div class="mb-6 flex items-center gap-3">
          <div class="h-5 w-5 animate-pulse rounded-md bg-zinc-700/50" />
          <div class="h-6 w-2/3 animate-pulse rounded-md bg-zinc-700/50" />
        </div>
        <div class="mb-6 flex-1 space-y-3">
          <div
            v-for="i in 3"
            :key="i"
            class="h-10 w-full animate-pulse rounded-xl bg-zinc-900/50"
          />
        </div>
        <div class="mt-auto flex gap-3 border-t border-zinc-700/50 pt-5">
          <div class="h-10 flex-1 animate-pulse rounded-lg bg-zinc-700/50" />
          <div class="h-10 w-12 animate-pulse rounded-lg bg-zinc-700/50" />
        </div>
      </div>
    </div>

    <div
      v-else-if="!data || data.criteria.length === 0"
      class="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700/50 bg-zinc-800/30 py-24"
    >
      <CriteriaEmptyListState />
    </div>

    <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="criterion in data.criteria"
        :key="criterion.id"
        class="group flex flex-col rounded-2xl border border-zinc-700/50 bg-zinc-800 p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
      >
        <div class="mb-6 flex items-start justify-between">
          <h3 class="flex items-center gap-2 text-lg font-bold text-zinc-100">
            <ListChecks class="h-5 w-5 text-zinc-400" />
            {{ criterion.title }}
          </h3>
        </div>

        <div class="mb-6 flex-1 space-y-2">
          <div
            v-for="mark in criterion.marks"
            :key="mark.id"
            class="flex items-center justify-between rounded-xl bg-zinc-900/40 px-4 py-2.5 text-sm"
          >
            <span class="text-zinc-300">{{ mark.label }}</span>
            <span class="font-semibold text-zinc-100">{{ mark.mark }} pts</span>
          </div>
        </div>

        <div
          class="mt-auto flex items-center gap-3 border-t border-zinc-700/50 pt-5"
        >
          <ButtonComponent
            variant="secondary"
            class="flex-1"
            @click="openCreateOrEditModal(criterion)"
          >
            <Pencil class="h-4 w-4" /> Modifier
          </ButtonComponent>
          <ButtonComponent variant="danger" @click="openDeleteModal(criterion)">
            <Trash class="h-4 w-4" />
          </ButtonComponent>
        </div>
      </div>
    </div>

    <CriterionCreateOrEditModal
      :is-open="isCreateOrEditModalOpen"
      :course-id="Number(props.id)"
      :criterion="selectedCriterion"
      @close="closeModal()"
      @success="fetchCriteria()"
    />

    <CriterionDeleteModal
      :is-open="isDeleteModalOpen"
      :criterion="selectedCriterion"
      @close="closeModal()"
      @success="fetchCriteria()"
    />
  </div>
</template>
