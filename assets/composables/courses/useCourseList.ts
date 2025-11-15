import { ref } from "vue";
import api from "~/lib/api";
import type { HydraResponse } from "~/types/hydra-response";

export type CourseListDTO = {
  id: number;
  title: string;
  description: string;
  periodStart: string;
  periodEnd: string;
};

export function useCourseList() {
  const courses = ref<CourseListDTO[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchCoursesList = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get<HydraResponse<CourseListDTO>>("/courses");

      courses.value = response.data.member;
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return { courses, loading, error, fetchCoursesList };
}
