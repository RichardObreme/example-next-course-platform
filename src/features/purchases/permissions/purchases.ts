import { UserRole } from "@/drizzle/schema";

export function canRefundPurchases({
  role,
}: {
  role: string | UserRole | undefined;
}) {
  return role === "admin";
}
