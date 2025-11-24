import { useApiRequest } from "~/composables/useApiRequest.ts";
import api from "~/lib/api";

export type CourseListDTO = {
  id: number;
  title: string;
  description: string;
  capacity: number;
  periodStart: string;
  periodEnd: string;
  applicationsCount: number;
};

export function useCourseList() {
  const { loading, error, success, data, execute } = useApiRequest<CourseListDTO[]>();

  const fetchCoursesList = async () => {
    return await execute(async () => {
      const response = await api.get<CourseListDTO[]>("/courses");

      return response.data;
    });
  };

  return {
    loading,
    error,
    success,
    data,
    fetchCoursesList,
  };
}
