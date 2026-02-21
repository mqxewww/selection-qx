import {
  ZodValidationErrorMessage,
  ZodValidationErrorPayload,
} from "~/libs/client.ts";

/**
 * Converts a character string into a code according to several rules.
 * @param title Character string to convert
 */
export function generateTypeCode(title: string): string {
  const words = title.trim().split(/\s+/);

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
 * Calculate the number of full months between two dates.
 * @param start Starting date
 * @param end Ending date
 */
export function getFullMonths(start: Date, end: Date): number {
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (end.getDate() < start.getDate()) months--;

  return Math.max(0, months);
}

/**
 * Check if obj is an object.
 * @param obj param to check
 */
export function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null;
}

/**
 * Check if catched error is from ZodValidator
 * @param error error to check
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
 * Transform ZodValidator error messages to a Record with key being the path and value the message
 * @param error Payload catched from ZodValidator
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
 * Transforms an object by removing parameters whose value is “”.
 * @param obj Object to transform
 */
export function transformEmptyToUndefined<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === "" ? undefined : value,
    ]),
  ) as T;
}
