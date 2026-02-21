import { hcWithType } from "@selection-qx/server/hc";

export interface ZodValidationErrorMessage {
  code: string;
  path: string[];
  message: string;
}

/** Body of the HTTP response when ZodValidator throws a server-side error.  */
export interface ZodValidationErrorPayload {
  success: false;
  error: {
    name: "ZodError";
    message: string;
  };
}

export const client = hcWithType(import.meta.env.VITE_API_URL);
