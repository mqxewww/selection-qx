import { ref } from "vue";
import { useApiRequest } from "~/composables/useApiRequest.ts";
import { ApplicationStatus } from "~/enums/ApplicationStatus.ts";
// import api from "~/lib/api.ts";

export type ApplicationList = {
  id: number;
  firstname: string;
  lastname: string;
  status: ApplicationStatus;
  created_at: string;
  course_id: number;
  course_title: string;
};

export type ApplicationListDTO = {
  coursesOptions: CourseOption[];
  total: number;
  applications: ApplicationList[];
};

export type CourseOption = {
  id: number;
  title: string;
};

const applications: ApplicationList[] = [
  {
    id: 1,
    firstname: "Firstname",
    lastname: "LASTNAME",
    status: ApplicationStatus.PENDING,
    created_at: "26/08/2025",
    course_id: 1,
    course_title: "Master of Science",
  },
  {
    id: 2,
    firstname: "Firstname",
    lastname: "LASTNAME",
    status: ApplicationStatus.ACCEPTED,
    created_at: "26/08/2022",
    course_id: 2,
    course_title: "Bachelor CDA",
  },
  {
    id: 3,
    firstname: "Firstname",
    lastname: "LASTNAME",
    status: ApplicationStatus.REJECTED,
    created_at: "26/08/2020",
    course_id: 3,
    course_title: "BTS SIO",
  },
  {
    id: 4,
    firstname: "Firstname",
    lastname: "LASTNAME",
    status: ApplicationStatus.PENDING,
    created_at: "26/08/2025",
    course_id: 1,
    course_title: "Master of Science",
  },
  {
    id: 5,
    firstname: "Firstname",
    lastname: "LASTNAME",
    status: ApplicationStatus.ACCEPTED,
    created_at: "26/08/2022",
    course_id: 2,
    course_title: "Bachelor CDA",
  },
  {
    id: 6,
    firstname: "Firstname",
    lastname: "LASTNAME",
    status: ApplicationStatus.REJECTED,
    created_at: "26/08/2020",
    course_id: 3,
    course_title: "BTS SIO",
  },
  {
    id: 7,
    firstname: "Firstname",
    lastname: "LASTNAME",
    status: ApplicationStatus.PENDING,
    created_at: "26/08/2025",
    course_id: 1,
    course_title: "Master of Science",
  },
  {
    id: 8,
    firstname: "Firstname",
    lastname: "LASTNAME",
    status: ApplicationStatus.ACCEPTED,
    created_at: "26/08/2022",
    course_id: 2,
    course_title: "Bachelor CDA",
  },
  {
    id: 9,
    firstname: "Firstname",
    lastname: "LASTNAME",
    status: ApplicationStatus.REJECTED,
    created_at: "26/08/2020",
    course_id: 3,
    course_title: "BTS SIO",
  },
  {
    id: 10,
    firstname: "Firstname",
    lastname: "LASTNAME",
    status: ApplicationStatus.PENDING,
    created_at: "26/08/2025",
    course_id: 1,
    course_title: "Master of Science",
  },
  {
    id: 11,
    firstname: "Firstname",
    lastname: "LASTNAME",
    status: ApplicationStatus.ACCEPTED,
    created_at: "26/08/2022",
    course_id: 2,
    course_title: "Bachelor CDA",
  },
];

export function useApplicationList() {
  const total = ref<number>(0);
  const coursesOptions = ref<CourseOption[]>([]);
  const { loading, error, success, data, execute } = useApiRequest<ApplicationList[]>();

  const fetchApplicationsList = async (
    page: number,
    itemsPerPage: number,
    optionSelected: number
  ) => {
    return await execute(async () => {
      // const response = await api.get<ApplicationListDTO>("/applications");

      // total.value = response.total;
      // return response.applications;

      coursesOptions.value = [
        {
          id: 0,
          title: "Toutes les formations",
        },
        {
          id: 1,
          title: "Master of Science",
        },
        {
          id: 2,
          title: "Bachelor CDA",
        },
        {
          id: 3,
          title: "BTS SIO",
        },
      ];

      const applicationsFiltered = applications.filter(
        (application) => optionSelected === 0 || application.course_id === optionSelected
      );

      total.value = applicationsFiltered.length;

      return applicationsFiltered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    });
  };

  return {
    loading,
    error,
    success,
    data,
    total,
    coursesOptions,
    fetchApplicationsList,
  };
}
