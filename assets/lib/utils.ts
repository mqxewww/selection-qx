import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { DateValue } from "reka-ui";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function df(date: DateValue) {
  const formatter = new DateFormatter("fr-FR", {
    dateStyle: "long",
  });

  return formatter.format(date.toDate(getLocalTimeZone()));
}

export function isoToDate(iso: string) {
  const date = new Date(iso);

  return date.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}
