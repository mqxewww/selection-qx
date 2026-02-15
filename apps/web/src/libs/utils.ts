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

export function getFullMonths(start: Date, end: Date): number {
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (end.getDate() < start.getDate()) months--;

  return Math.max(0, months);
}
