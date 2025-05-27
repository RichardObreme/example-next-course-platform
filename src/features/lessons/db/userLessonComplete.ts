import { db } from "@/drizzle/db";
import { UserLessonCompleteTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { revalidateUserLessonCompleteCache } from "./cache/userLessonComplete";

export async function updateLessonCompleteStatus({
  lessonId,
  userId,
  isComplete,
}: {
  lessonId: string;
  userId: string;
  isComplete: boolean;
}) {
  let completion: { lessonId: string; userId: string } | undefined;
  if (isComplete) {
    const [c] = await db
      .insert(UserLessonCompleteTable)
      .values({ lessonId, userId })
      .onConflictDoNothing()
      .returning();
    completion = c;
  } else {
    const [c] = await db
      .delete(UserLessonCompleteTable)
      .where(
        and(
          eq(UserLessonCompleteTable.lessonId, lessonId),
          eq(UserLessonCompleteTable.userId, userId)
        )
      )
      .returning();
    completion = c;
  }

  if (completion == null) return;

  revalidateUserLessonCompleteCache({
    lessonId: completion.lessonId,
    userId: completion.userId,
  });

  return completion;
}
