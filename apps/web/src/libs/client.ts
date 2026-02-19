import { hcWithType } from "@selection-qx/server/hc";

export interface ZodValidationErrorMessage {
  code: string;
  path: string[];
  message: string;
}

export interface ZodValidationErrorPayload {
  success: false;
  error: {
    name: "ZodError";
    message: string;
  };
}

export const client = hcWithType(import.meta.env.VITE_API_URL);
