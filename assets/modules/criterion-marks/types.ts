interface CriterionMarkBase {
  label: string;
  mark: number;
}

interface CriterionMark extends CriterionMarkBase {
  id: number;
}

export type CriterionMarkListItem = CriterionMark;

export type CriterionMarkCreatePayload = CriterionMarkBase;

export interface CriterionMarkUpdateItem extends CriterionMarkBase {
  id?: number;
  shouldDelete?: boolean;
}

export interface CriterionMarkUpdatePayload extends CriterionMarkBase {
  "@id"?: string;
}
