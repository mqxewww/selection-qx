import { ref } from "vue";
import { useApiRequest } from "~/composables/useApiRequest.ts";
import api from "~/lib/api.ts";
import {
  CourseCreatePayload,
  CourseDetails,
  CourseListItem,
  CourseUpdatePayload,
} from "~/modules/courses/types.ts";

export const useCoursesActions = () => {
  const coursesList = ref<CourseListItem[]>([]);
  const courseDetails = ref<CourseDetails | null>(null);

  const fetchListApi = useApiRequest();
  const fetchDetailsApi = useApiRequest();
  const createApi = useApiRequest();
  const updateApi = useApiRequest();
  const deleteApi = useApiRequest();

  const fetchCoursesList = async () => {
    return await fetchListApi.execute(async () => {
      const response = await api.get<CourseListItem[]>("/courses");

      coursesList.value = response.data;
    });
  };

  const fetchDetails = async (id: number) => {
    return await fetchDetailsApi.execute(async () => {
      const response = await api.get<CourseDetails>(`/courses/${id}`);

      courseDetails.value = response.data;
    });
  };

  const createCourse = async (body: CourseCreatePayload) => {
    return await createApi.execute(async () => await api.post("/courses", body));
  };

  const updateCourse = async (id: number, body: CourseUpdatePayload) => {
    return await updateApi.execute(async () => await api.patch(`/courses/${id}`, body));
  };

  const deleteCourse = async (id: number) => {
    return await deleteApi.execute(async () => await api.delete(`/courses/${id}`));
  };

  return {
    isFetchingList: fetchListApi.isLoading,
    fetchListError: fetchListApi.error,
    coursesList,
    fetchCoursesList,

    isFetchingDetails: fetchDetailsApi.isLoading,
    fetchDetailsError: fetchDetailsApi.error,
    courseDetails,
    fetchDetails,

    isCreating: createApi.isLoading,
    createError: createApi.error,
    createCourse,

    isUpdating: updateApi.isLoading,
    updateError: updateApi.error,
    updateCourse,

    isDeleting: deleteApi.isLoading,
    deleteError: deleteApi.error,
    deleteCourse,
  };
};
