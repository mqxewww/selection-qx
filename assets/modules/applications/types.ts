import { ApplicationStatus } from "~/modules/applications/enums/application-status.ts";

interface ApplicationBase {
  firstname: string;
  lastname: string;
  status: ApplicationStatus;
}

interface Application extends ApplicationBase {
  id: number;
  createdAt: string;
}

export interface ApplicationListItem extends Application {
  createdAt: string;
  course_id: number;
  course_title: string;
}

export interface ApplicationListItemDTO {
  total: number;
  applications: ApplicationListItem[];
}
