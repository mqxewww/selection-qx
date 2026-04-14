import { Reactive, reactive } from "vue";

/**
 * Reactive form state initialized with the provided value.
 * @param initialValueFn Function returning the initial state of the form
 * @param callback Optional callback function invoked when updateForm is called.
 */
export function useForm<T extends Record<string, unknown>>(
  initialValueFn: () => T,
  callback?: (form: Reactive<T>) => void,
) {
  const form = reactive<T>(initialValueFn());

  /** Reset the form state to its initial value. */
  const resetForm = () => Object.assign(form, initialValueFn());

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
