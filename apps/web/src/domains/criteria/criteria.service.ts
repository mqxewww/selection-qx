import { InferResponseType } from "hono/client";
import { client } from "~web/libs/client.ts";

export type Criterion = CriteriaResponse[number];

export type CriteriaResponse = InferResponseType<
  (typeof client.criteria)[":id"]["$get"]
>;

export type CriteriaCreateInput = {
  title: string;
  courseId: number;
  marks: {
    label: string;
    mark: number;
    id?: number;
    shouldDelete?: boolean;
  }[];
};

export type CriteriaUpdateInput = CriteriaCreateInput;

export const criteriaService = {
  async getByCourseId(id: string) {
    const res = await client.criteria[":id"].$get({ param: { id } });

    if (!res.ok) throw await res.json();

    return res.json();
  },

  async create(data: CriteriaCreateInput) {
    const res = await client.criteria.$post({ json: data });

    if (!res.ok) throw await res.json();

    return res.json();
  },

  async patch(id: string, data: CriteriaUpdateInput) {
    const res = await client.criteria[":id"].$patch({
      param: { id },
      json: data,
    });

    if (!res.ok) throw await res.json();

    return res.json();
  },

  async delete(id: string) {
    const res = await client.criteria[":id"].$delete({ param: { id } });

    if (!res.ok) throw await res.json();

    return res.json();
  },
};
