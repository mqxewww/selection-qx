export function isoToDate(iso: string) {
  const date = new Date(iso);

  return date.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}
