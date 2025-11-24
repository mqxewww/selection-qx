import { useApiRequest } from "~/composables/useApiRequest.ts";
import api from "~/lib/api.ts";

export function useCriteriaDelete() {
  const { loading, error, success, data, execute } = useApiRequest<void>();

  const deleteCriteria = async (id: number) => {
    return await execute(async () => await api.delete(`/criteria/${id}`));
  };

  return {
    loading,
    error,
    success,
    data,
    deleteCriteria,
  };
}
