import { useApiRequest } from "~/composables/useApiRequest.ts";
import api from "~/lib/api";

export type CourseUpdateDTO = {
  capacity: number;
  periodStart: string;
  periodEnd: string;
};

export function useCourseUpdate() {
  const { loading, error, success, data, execute } = useApiRequest<void>();

  const updateCourse = async (id: number, body: CourseUpdateDTO) => {
    return await execute(async () => await api.patch(`/courses/${id}`, body));
  };

  return {
    loading,
    error,
    success,
    data,
    updateCourse,
  };
}
