import { InferResponseType } from "hono/client";
import { client } from "~/libs/client.ts";
import { transformEmptyToUndefined } from "~/libs/utils.ts";

export type CoursesResponse = InferResponseType<
  typeof client.courses.$get,
  200
>;

export type CourseResponse = InferResponseType<
  (typeof client.courses)[":id"]["$get"],
  200
>;

export type CourseCreateInput = {
  title: string;
  description: string;
  capacity: string;
  periodStart: string;
  periodEnd: string;
};

export type CourseUpdateInput = CourseCreateInput;

export const coursesService = {
  async getAll(): Promise<CoursesResponse> {
    const res = await client.courses.$get();

    if (!res.ok) throw await res.json();

    return res.json();
  },

  async getById(id: string): Promise<CourseResponse> {
    const res = await client.courses[":id"].$get({ param: { id } });

    if (!res.ok) throw await res.json();

    return res.json();
  },

  async create(data: CourseCreateInput) {
    const res = await client.courses.$post({ json: data });

    if (!res.ok) throw await res.json();

    return res.json();
  },

  async putBgImage(id: string, data: File) {
    const res = await client.courses[":id"].$put({
      param: { id },
      form: { bgImage: data },
    });

    if (!res.ok) throw await res.json();

    return res.json();
  },

  async patch(id: string, data: Partial<CourseUpdateInput>) {
    const transformedData = transformEmptyToUndefined(data);

    const res = await client.courses[":id"].$patch({
      param: { id },
      json: transformedData,
    });

    if (!res.ok) throw await res.json();

    return res.json();
  },
};
