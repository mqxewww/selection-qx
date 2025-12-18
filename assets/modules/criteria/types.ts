import {
  CriterionMarkCreatePayload,
  CriterionMarkListItem,
  CriterionMarkUpdatePayload,
} from "~/modules/criterion-marks/types.ts";

interface CriterionBase {
  title: string;
}

interface Criterion extends CriterionBase {
  id: number;
}

export interface CriterionListItem extends Criterion {
  marks: CriterionMarkListItem[];
}

export interface CriterionCreatePayload extends CriterionBase {
  course: string;
  marks: CriterionMarkCreatePayload[];
}

export interface CriterionUpdatePayload extends CriterionBase {
  marks: CriterionMarkUpdatePayload[];
}
