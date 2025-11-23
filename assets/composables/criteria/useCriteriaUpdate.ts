import { useApiRequest } from "~/composables/useApiRequest.ts";
import api from "~/lib/api.ts";

type CriterionMarkUpdateDTO = {
  id?: number;
  label: string;
  mark: number;
  delete?: boolean;
};

export type CriteriaUpdateDTO = {
  title: string;
  courseId: number;
  criterionMarks: CriterionMarkUpdateDTO[];
};

export function useCriteriaUpdate() {
  const { loading, error, success, data, execute } = useApiRequest<void>();

  const updateCriteria = async (id: number, body: CriteriaUpdateDTO) => {
    return await execute(async () => await api.patch(`/criteria/${id}`, body));
  };

  return {
    loading,
    error,
    success,
    data,
    updateCriteria,
  };
}
