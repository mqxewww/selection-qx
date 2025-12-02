interface CriterionMarkBase {
  label: string;
  mark: number;
}

interface CriterionMark extends CriterionMarkBase {
  id: number;
}

export type CriterionMarkListItem = CriterionMark;

export type CriterionMarkCreatePayload = CriterionMarkBase;

export interface CriterionMarkUpdatePayload extends CriterionMarkBase {
  id?: number;
  delete?: boolean;
}
