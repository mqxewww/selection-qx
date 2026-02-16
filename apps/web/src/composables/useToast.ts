import { ref } from "vue";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const toasts = ref<Toast[]>([]);
let nextId = 0;

export function useToast() {
  const addToast = (message: string, type: ToastType, duration = 3000) => {
    const id = nextId++;

    toasts.value.push({ id, message, type });

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, duration);
  };

  return {
    toasts,
    showSuccess: (msg: string) => addToast(msg, "success"),
    showError: (msg: string) => addToast(msg, "error"),
    showInfo: (msg: string) => addToast(msg, "info"),
    showWarning: (msg: string) => addToast(msg, "warning"),
  };
}
