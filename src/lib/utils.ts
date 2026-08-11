import { DateStatus } from "@/types";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return dateString;
  }
}

export function calculateDateStatus(startDateStr: string, endDateStr?: string): DateStatus {
  const now = new Date();
  const start = new Date(startDateStr);
  const end = endDateStr ? new Date(endDateStr) : null;

  if (now < start) {
    return "Upcoming";
  }
  if (end && now > end) {
    return "Completed";
  }
  return "Ongoing";
}

export function isNewUpdate(publishedAtStr: string): boolean {
  if (!publishedAtStr) return false;
  const pubDate = new Date(publishedAtStr);
  const now = new Date();
  const diffHours = (now.getTime() - pubDate.getTime()) / (1000 * 60 * 60);
  return diffHours >= 0 && diffHours <= 48; // New within 48 hours
}
