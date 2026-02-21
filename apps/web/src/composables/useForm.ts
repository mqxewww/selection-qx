import { Reactive, reactive } from "vue";

export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  setForm?: (form: Reactive<T>) => void,
) {
  const form = reactive<T>({ ...initialValues });

  const reset = () => Object.assign(form, initialValues);

  const set = () => {
    if (setForm) setForm(form);
  };

  return {
    form,
    reset,
    set,
  };
}
