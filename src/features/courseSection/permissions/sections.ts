import { CourseSectionTable, UserRole } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export function canCreateCourseSections({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}

export function canUpdateCourseSections({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}

export function canDeleteCourseSections({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}

export const wherePublicCourseSections = eq(
  CourseSectionTable.status,
  "public"
);
