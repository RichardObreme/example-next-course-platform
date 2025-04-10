import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { CourseTable } from "./course";
import { ProductTable } from "./product";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";

export const CourseProdcutTable = pgTable(
  "course_products",
  {
    courseId: uuid()
      .notNull()
      .references(() => CourseTable.id, { onDelete: "restrict" }),
    productId: uuid()
      .notNull()
      .references(() => ProductTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.courseId, t.productId] })]
);

export const CourseProductRelationships = relations(
  CourseProdcutTable,
  ({ one }) => ({
    course: one(CourseTable, {
      fields: [CourseProdcutTable.courseId],
      references: [CourseTable.id],
    }),
    product: one(ProductTable, {
      fields: [CourseProdcutTable.productId],
      references: [ProductTable.id],
    }),
  })
);
