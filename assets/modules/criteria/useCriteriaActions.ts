import { useApiRequest } from "~/composables/useApiRequest.ts";
import api from "~/lib/api.ts";
import { CriterionCreatePayload, CriterionUpdatePayload } from "~/modules/criteria/types.ts";

export const useCriteriaActions = () => {
  const createApi = useApiRequest();
  const updateApi = useApiRequest();
  const deleteApi = useApiRequest();

  const createCriterion = async (body: CriterionCreatePayload) => {
    return await createApi.execute(async () => await api.post("/criteria", body));
  };

  const updateCriterion = async (id: number, body: CriterionUpdatePayload) => {
    return await updateApi.execute(async () => await api.patch(`/criteria/${id}`, body));
  };

  const deleteCriterion = async (id: number) => {
    return await deleteApi.execute(async () => await api.delete(`/criteria/${id}`));
  };

  return {
    isCreating: createApi.isLoading,
    createError: createApi.error,
    createCriterion,

    isUpdating: updateApi.isLoading,
    updateError: updateApi.error,
    updateCriterion,

    isDeleting: deleteApi.isLoading,
    deleteError: deleteApi.error,
    deleteCriterion,
  };
};
