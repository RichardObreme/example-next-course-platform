import { ProductTable, UserRole } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export function canCreateProducts({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}

export function canUpdateProducts({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}

export function canDeleteProducts({
  role,
}: {
  role: UserRole | string | undefined;
}) {
  return role === "admin";
}

export const wherePublicProducts = eq(ProductTable.status, "public");
