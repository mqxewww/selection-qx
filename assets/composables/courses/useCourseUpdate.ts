import { ref } from "vue";
import api from "~/lib/api";

export type CourseUpdateDTO = {
  periodStart: string;
  periodEnd: string;
  capacity: number;
};

export function useCourseUpdate() {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const success = ref<boolean>(false);

  const updateCourse = async (id: number, payload: CourseUpdateDTO) => {
    loading.value = true;
    error.value = null;
    success.value = false;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await api.patch(`/courses/${id}`, payload);

      success.value = true;
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, success, updateCourse };
}
