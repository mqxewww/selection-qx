import { ref } from "vue";

export enum ToastType {
  SUCCESS,
  ERROR,
  INFO,
  WARNING,
}

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const toasts = ref<Toast[]>([]);
let nextId = 0;

export function useToast() {
  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  const addToast = (message: string, type: ToastType, duration = 4000) => {
    const id = nextId++;

    toasts.value.push({ id, message, type });

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  return {
    toasts,
    removeToast,
    showSuccess: (msg: string, duration?: number) =>
      addToast(msg, ToastType.SUCCESS, duration),
    showError: (msg: string, duration?: number) =>
      addToast(msg, ToastType.ERROR, duration),
    showInfo: (msg: string, duration?: number) =>
      addToast(msg, ToastType.INFO, duration),
    showWarning: (msg: string, duration?: number) =>
      addToast(msg, ToastType.WARNING, duration),
  };
}
