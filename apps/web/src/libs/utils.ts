import {
  ZodValidationErrorMessage,
  ZodValidationErrorPayload,
} from "~/libs/client.ts";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Converts a string value into a code according to several rules.
 * @param value Value to convert
 */
export function convertStringValueToCode(value: string) {
  const words = value.trim().split(/\s+/);

  if (words.length < 1) return "";

  const firstInitial = words[0]!.charAt(0).toUpperCase();

  if (words.length === 1) return firstInitial;

  if (words.length === 2) {
    const secondPart = words[1]!.substring(0, 3).toUpperCase();

    return `${firstInitial}-${secondPart}`;
  }

  const otherInitials = words
    .slice(1)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return `${firstInitial}-${otherInitials}`;
}

/**
 * Converts a Unix timestamp (in milliseconds) to a French long date string.
 * @param unixTs Unix timestamp to convert
 */
export function convertUnixTimestampToLongDate(unixTs: string) {
  return new Date(unixTs).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Get the full image URL based on the provided path.
 * @param imagePath Path returned from API (/uploads/*)
 */
export function getImageFullURL(imagePath?: string | null) {
  return imagePath
    ? `${API_URL}${imagePath}`
    : "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&h=400&auto=format&fit=crop";
}

/**
 * Get the number of full months between two dates.
 * @param start Starting date
 * @param end Ending date
 */
export function getFullMonths(start: Date, end: Date) {
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (end.getDate() < start.getDate()) months--;

  return Math.max(0, months);
}

/**
 * Check whether a value is a non-null object.
 * @param value value to check
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Check whether the error matches ZodValidationErrorPayload.
 * @param error Error to check
 */
export function isZodValidationError(
  error: unknown,
): error is ZodValidationErrorPayload {
  if (!isObject(error) || !isObject(error.error)) return false;

  return (
    error.success === false &&
    error.error.name === "ZodError" &&
    typeof error.error.message === "string"
  );
}

/**
 * Parse a ZodValidationErrorPayload error into a Record<string, string> with the key as the error path and the value as the validation error message.
 * @param error Error to parse
 */
export function parseZodValidationErrorToRecord(
  error: ZodValidationErrorPayload,
) {
  const parsedError = JSON.parse(
    error.error.message,
  ) as ZodValidationErrorMessage[];

  return Object.fromEntries(
    parsedError.map((error) => [error.path[0], error.message]),
  ) as Record<string, string>;
}

/**
 * Transform all empty string values ("") from the given object to undefined.
 * @param obj Object to transform
 */
export function transformEmptyToUndefined<T extends object>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === "" ? undefined : value,
    ]),
  ) as T;
}
