import { useApiRequest } from "~/composables/useApiRequest.ts";
import api from "~/lib/api.ts";

type Mark = {
  id: number;
  label: string;
  mark: number;
};

export type Criterion = {
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
  const { loading, error, success, data, execute } = useApiRequest<CourseByIdDTO>();

  const fetchCourseById = async (id: number) => {
    return await execute(async () => {
      const response = await api.get<CourseByIdDTO>(`/courses/${id}`);

      return response.data;
    });
  };

  return {
    loading,
    error,
    success,
    data,
    fetchCourseById,
  };
}
