import { InferResponseType } from "hono/client";
import { client } from "~/libs/client.ts";

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
  bgImage: File;
};

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
    const res = await client.courses.$post({ form: data });

    if (!res.ok) throw await res.json();

    return res.json();
  },
};
