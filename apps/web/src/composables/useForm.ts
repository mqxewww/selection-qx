import { Reactive, reactive } from "vue";

/**
 * Reactive form state initialized with the provided value.
 * @param initialValue Value used to initialize and reset the form
 * @param callback Optional callback function invoked when updateForm is called.
 */
export function useForm<T extends Record<string, unknown>>(
  initialValue: T,
  callback?: (form: Reactive<T>) => void,
) {
  const form = reactive<T>({ ...initialValue });

  /** Reset the form state to its initial value. */
  const resetForm = () => Object.assign(form, initialValue);

  /** Invoke the optional callback function with the form value. */
  const updateForm = () => {
    if (callback) callback(form);
  };

  return {
    form,
    resetForm,
    updateForm,
  };
}
