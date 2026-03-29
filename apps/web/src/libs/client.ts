import type { AppType } from "@selection-qx/server";
import { hc } from "hono/client";
import { API_URL } from "~web/libs/utils.ts";

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

export const client = hc<AppType>(API_URL);
