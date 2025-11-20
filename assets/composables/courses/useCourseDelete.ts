import { useApiRequest } from "~/composables/useApiRequest.ts";
import api from "~/lib/api";

export function useCourseDelete() {
  const { loading, error, success, data, execute } = useApiRequest<void>();

  const deleteCourse = async (id: number) => {
    return await execute(async () => await api.delete(`/courses/${id}`));
  };

  return {
    loading,
    error,
    success,
    data,
    deleteCourse,
  };
}
