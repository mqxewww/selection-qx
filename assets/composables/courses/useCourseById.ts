import { ref } from "vue";
import api from "~/lib/api.ts";

type Mark = {
  id: number;
  label: string;
  mark: number;
};

type Criterion = {
  id: number;
  title: string;
  marks: Mark[];
};

export type CourseByIdDTO = {
  id: number;
  title: string;
  description: string;
  capacity: number;
  periodStart: string;
  periodEnd: string;
  createdAt: string;
  applicationsCount: number;
  criterias: Criterion[];
};

export function useCourseById() {
  const course = ref<CourseByIdDTO | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchCourseById = async (id: number) => {
    loading.value = true;
    error.value = null;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await api.get<CourseByIdDTO>(`/courses/${id}`);

      course.value = response.data;
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return { course, loading, error, fetchCourseById };
}
