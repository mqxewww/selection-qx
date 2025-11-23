import { useApiRequest } from "~/composables/useApiRequest.ts";
import api from "~/lib/api.ts";

export type CriterionMarkCreateDTO = {
  label: string;
  mark: number;
};

export type CriteriaCreateDTO = {
  title: string;
  courseId: number;
  criterionMarks: CriterionMarkCreateDTO[];
};

export function useCriteriaCreate() {
  const { loading, error, success, data, execute } = useApiRequest<void>();

  const createCriteria = async (body: CriteriaCreateDTO) => {
    return await execute(async () => await api.post("/criteria", body));
  };

  return {
    loading,
    error,
    success,
    data,
    createCriteria,
  };
}
