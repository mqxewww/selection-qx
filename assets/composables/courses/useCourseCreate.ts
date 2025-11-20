import { useApiRequest } from "~/composables/useApiRequest.ts";
import api from "~/lib/api";

export type CourseCreateDTO = {
  title: string;
  description: string;
  capacity: number;
  periodStart: string;
  periodEnd: string;
};

export function useCourseCreate() {
  const { loading, error, success, data, execute } = useApiRequest<void>();

  const createCourse = async (body: CourseCreateDTO) => {
    return await execute(async () => await api.post("/courses", body));
  };

  return {
    loading,
    error,
    success,
    data,
    createCourse,
  };
}
