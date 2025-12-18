import { CriterionListItem } from "~/modules/criteria/types.ts";

interface CourseBase {
  title: string;
  description: string;
  capacity: number;
  periodStart: string;
  periodEnd: string;
}

interface Course extends CourseBase {
  id: number;
  createdAt: string;
}

export interface CourseListItem extends Course {
  applicationsCount: number;
}

export interface CourseDetails extends Course {
  applicationsCount: number;
  criteria: CriterionListItem[];
}

export type CourseCreatePayload = CourseBase;

export type CourseUpdatePayload = Partial<CourseBase>;
