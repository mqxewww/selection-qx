import { ref } from "vue";
import { useApiRequest } from "~/composables/useApiRequest.ts";
import api from "~/lib/api.ts";
import { ApplicationListItemDTO } from "~/modules/applications/types.ts";

export const useApplicationsActions = () => {
  const applicationsDto = ref<ApplicationListItemDTO | null>(null);

  const fetchListApi = useApiRequest();

  const fetchApplicationsList = async (offset = 0, limit = 5, course?: number) => {
    return await fetchListApi.execute(async () => {
      let endpoint = `/applications?offset=${offset}&limit=${limit}`;

      if (course) endpoint += `&course=${course}`;

      const response = await api.get<ApplicationListItemDTO>(endpoint);

      applicationsDto.value = response.data;
    });
  };

  return {
    isFetchingList: fetchListApi.isLoading,
    fetchListError: fetchListApi.error,
    applicationsDto,
    fetchApplicationsList,
  };
};
