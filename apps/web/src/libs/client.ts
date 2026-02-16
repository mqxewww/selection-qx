import { hcWithType } from "@selection-qx/server/hc";

export const client = hcWithType(import.meta.env.VITE_API_URL);
