import { computed, ref, Ref, unref } from "vue";

export function usePagination(pageSize: number = 10, dataLength?: Ref<number>) {
  const currentPage = ref(1);
  const limit = ref(pageSize);

  const totalPages = computed(() => {
    const totalItems = unref(dataLength) || 0;

    return Math.max(1, Math.ceil(totalItems / limit.value));
  });

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) currentPage.value = page;
  };

  return {
    currentPage,
    limit,
    totalPages,
    goToPage,
  };
}
