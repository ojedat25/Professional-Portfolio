export function titleToFilename(title: string): string {
  const parts = title
    .trim()
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean);
  const pascal = parts
    .map((p) => `${p.charAt(0).toUpperCase()}${p.slice(1)}`)
    .join("");
  return `${pascal || "Project"}.tsx`;
}
