"use server";

import { getCurrentUser } from "@/features/users/db/users";
import { canUpdateUserLessonCompleteStatus } from "../permissions/userLessonComplete";
import { updateLessonCompleteStatus as updateLessonCompleteStatusDb } from "../db/userLessonComplete";

export async function updateLessonCompleteStatus(
  lessonId: string,
  isComplete: boolean
) {
  const { id: userId } = await getCurrentUser();
  const hasPermission = await canUpdateUserLessonCompleteStatus(
    userId,
    lessonId
  );

  if (userId == null || !hasPermission) {
    return { error: true, message: "Error updating lesson complete status" };
  }

  await updateLessonCompleteStatusDb({ lessonId, userId, isComplete });

  return {
    error: false,
    message: "Successfully updated lesson completion status.",
  };
}
