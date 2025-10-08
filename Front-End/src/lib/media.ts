export const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"
).replace(/\/+$/, "");

export function toImgUrl(pathOrUrl?: string) {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${API_BASE}/${pathOrUrl.replace(/^\/+/, "")}`;
}
