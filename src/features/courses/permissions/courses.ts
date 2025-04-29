import { UserRole } from "@/drizzle/schema";

export function canCreateCourses({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}
