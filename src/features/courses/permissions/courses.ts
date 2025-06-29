import { UserRole } from "@/drizzle/schema";

export function canCreateCourses({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}

export function canUpdateCourses({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}

export function canDeleteCourses({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}
