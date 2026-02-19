import { ref } from "vue";
import { useToast } from "~/composables/useToast.ts";
import {
  isZodValidationError,
  parseZodValidationErrorToRecord,
} from "~/libs/utils.ts";

export function useApi<T>() {
  const loading = ref(false);
  const validationErrors = ref<Record<string, string>>({});
  const genericError = ref<string | null>(null);
  const data = ref<T | null>(null);
  const { showError, showSuccess } = useToast();

  const execute = async (
    call: () => Promise<T>,
    options?: {
      successMessage?: string;
      delay_ms?: number;
    },
  ): Promise<T> => {
    loading.value = true;
    genericError.value = null;
    validationErrors.value = {};

    if (options?.delay_ms)
      await new Promise((resolve) => setTimeout(resolve, options.delay_ms));

    try {
      data.value = await call();

      if (options?.successMessage) showSuccess(options.successMessage);

      return data.value;
    } catch (err) {
      if (isZodValidationError(err)) {
        validationErrors.value = parseZodValidationErrorToRecord(err);
      } else {
        const errorMsg = (err as Error)?.message || "Une erreur est survenue";

        genericError.value = errorMsg;
        showError(errorMsg);
      }

      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    validationErrors,
    genericError,
    data,
    execute,
  };
}
