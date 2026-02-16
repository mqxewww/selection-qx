import { reactive } from "vue";

export function useForm<T extends Record<string, unknown>>(initialValues: T) {
  const form = reactive<T>({ ...initialValues });

  const reset = () => {
    Object.assign(form, initialValues);
  };

  return {
    form,
    reset,
  };
}
