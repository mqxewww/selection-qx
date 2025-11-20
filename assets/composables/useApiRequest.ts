import { ref } from "vue";

export function useApiRequest<TResponse>() {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const success = ref<boolean>(false);
  const data = ref<TResponse | null>(null);

  const execute = async (fn: () => Promise<TResponse>) => {
    loading.value = true;
    error.value = null;
    success.value = false;
    data.value = null;

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      data.value = await fn();
      success.value = true;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, success, data, execute };
}
