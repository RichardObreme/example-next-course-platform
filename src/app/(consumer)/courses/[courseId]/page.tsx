import PageHeader from "@/components/PageHeader";
import { db } from "@/drizzle/db";
import { CourseTable } from "@/drizzle/schema";
import { getCourseIdTag } from "@/features/courses/db/cache/courses";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { notFound } from "next/navigation";

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = await getCourse(courseId);

  console.log(course);

  if (course == null) return notFound();

  return (
    <div className="container my-6">
      <PageHeader title={course.name} className="mb-2" />
      <p className="text-muted-foreground">{course.description}</p>
    </div>
  );
}

async function getCourse(id: string) {
  "use cache";
  cacheTag(getCourseIdTag(id));

  return db.query.CourseTable.findFirst({
    columns: { id: true, name: true, description: true },
    where: eq(CourseTable.id, id),
  });
}
