import { ref } from "vue";
import { useToast } from "~/composables/useToast.ts";

export function useApi<T>() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<T | null>(null);
  const { showError, showSuccess } = useToast();

  const execute = async (
    call: () => Promise<T>,
    options?: {
      successMessage?: string;
      errorMessage?: string;
      showSuccessToast?: boolean;
    },
  ): Promise<T> => {
    loading.value = true;
    error.value = null;

    try {
      data.value = await call();

      if (options?.showSuccessToast && options?.successMessage)
        showSuccess(options.successMessage);

      return data.value;
    } catch (err) {
      const errorMsg =
        (err as Error)?.message ||
        options?.errorMessage ||
        "Une erreur est survenue";

      error.value = errorMsg;
      showError(errorMsg);

      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    data,
    execute,
  };
}
