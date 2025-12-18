import { AxiosError } from "axios";
import { ref } from "vue";

type ApiError = {
  message: string;
};

export const useApiRequest = () => {
  const isLoading = ref(false);
  const error = ref<ApiError | null>(null);

  const execute = async <T>(fn: () => Promise<T>): Promise<T | undefined> => {
    isLoading.value = true;
    error.value = null;

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      return await fn();
    } catch (err) {
      const axiosError = err as AxiosError<unknown>;

      error.value = {
        message: axiosError.message || "Une erreur est survenue",
      };

      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, error, execute };
};
