import { UserRole } from "@/drizzle/schema";

export function canAccessAdminPages({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}
