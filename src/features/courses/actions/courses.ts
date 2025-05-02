"use server";

import { z } from "zod";
import { courseSchema } from "../schemas/courses";
import { redirect } from "next/navigation";
import {
  insertCourse,
  deleteCourse as deleteCourseDB,
  updateCourse as updateCourseDB,
} from "../db/courses";
import {
  canCreateCourses,
  canDeleteCourses,
  canUpdateCourses,
} from "../permissions/courses";
import { getCurrentUser } from "@/features/users/db/users";

export async function createCourse(unsafeData: z.infer<typeof courseSchema>) {
  const { success, data } = courseSchema.safeParse(unsafeData);

  if (!success || !canCreateCourses(await getCurrentUser())) {
    return { error: true, message: "There was an error creating your course" };
  }

  const course = await insertCourse(data);

  redirect(`/admin/courses/${course.id}/edit`);
}

export async function updateCourse(
  id: string,
  unsafeData: z.infer<typeof courseSchema>
) {
  const { success, data } = courseSchema.safeParse(unsafeData);

  if (!success || !canUpdateCourses(await getCurrentUser())) {
    return { error: true, message: "There was an error updating your course" };
  }

  await updateCourseDB(id, data);

  return { error: false, message: "Successfully updated your course" };
}

export async function deleteCourse(id: string) {
  if (!canDeleteCourses(await getCurrentUser())) {
    return { error: true, message: "Error deleting your course" };
  }

  await deleteCourseDB(id);

  return { error: false, message: "Successfuly deleted your course" };
}
