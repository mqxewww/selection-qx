import { Ref, ref } from "vue";
import { useToast } from "~/composables/useToast.ts";
import {
  isZodValidationError,
  parseZodValidationErrorToRecord,
} from "~/libs/utils.ts";

type UseApiReturn<T> = {
  data: Ref<T>;
  loading: Ref<boolean>;
  genericError: Ref<string | null>;
  validationErrors: Ref<Record<string, string>>;
  execute: (
    call: () => Promise<T>,
    options?: { successMessage?: string; delay_ms?: number },
  ) => Promise<T>;
};

export function useApi<T>(defaultValue: T): UseApiReturn<T>;
export function useApi<T>(defaultValue?: undefined): UseApiReturn<T | null>;

export function useApi<T>(defaultValue?: T) {
  const data = ref<T | null>(defaultValue ?? null);
  const loading = ref(false);

  const genericError = ref<string | null>(null);
  const validationErrors = ref<Record<string, string>>({});

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
