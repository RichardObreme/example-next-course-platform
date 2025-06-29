import { db } from "@/drizzle/db";
import {
  CourseSectionTable,
  CourseTable,
  LessonStatus,
  LessonTable,
  UserCourseAccessTable,
  UserRole,
} from "@/drizzle/schema";
import { getUserCourseAccessUserTag } from "@/features/courses/db/cache/userCourseAccess";
import { wherePublicCourseSections } from "@/features/courseSection/permissions/sections";
import { and, eq, or } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { getLessonIdTag } from "../db/cache/lessons";

export function canCreateLessons({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}

export function canUpdateLessons({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}

export function canDeleteLessons({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}

export async function canViewLesson(
  {
    role,
    userId,
  }: {
    role: UserRole | string | undefined;
    userId: string | null;
  },
  lesson: { id: string; status: LessonStatus }
) {
  "use cache";
  if (role === "admin" || lesson.status === "preview") return true;
  if (userId == null || lesson.status === "private") return false;

  cacheTag(getUserCourseAccessUserTag(userId), getLessonIdTag(lesson.id));

  const [data] = await db
    .select({ courseId: CourseTable.id })
    .from(UserCourseAccessTable)
    .leftJoin(CourseTable, eq(CourseTable.id, UserCourseAccessTable.courseId))
    .leftJoin(
      CourseSectionTable,
      and(
        eq(CourseSectionTable.courseId, CourseTable.id),
        wherePublicCourseSections
      )
    )
    .leftJoin(
      LessonTable,
      and(eq(LessonTable.sectionId, CourseSectionTable.id), wherePublicLessons)
    )
    .where(
      and(
        eq(LessonTable.id, lesson.id),
        eq(UserCourseAccessTable.userId, userId)
      )
    )
    .limit(1);

  return data != null && data.courseId != null;
}

export const wherePublicLessons = or(
  eq(LessonTable.status, "public"),
  eq(LessonTable.status, "preview")
);
