import SignOut from "@/components/SignOut";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/features/users/db/users";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const role = (await getCurrentUser()).role;
  if (role !== "admin") return notFound();

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function Navbar() {
  return (
    <header className="flex h-12 shadow bg-background z-10">
      <nav className="flex gap-4 container">
        <div className="mr-auto flex items-center gap-2">
          <Link className="text-lg hover:underline" href={"/admin"}>
            Web Dev Simplified
          </Link>
          <Badge>Admin</Badge>
        </div>
        <>
          <Link
            className="hover:bg-accent/10 flex items-center px-2"
            href="/admin/courses"
          >
            Courses
          </Link>
          <Link
            className="hover:bg-accent/10 flex items-center px-2"
            href="/admin/products"
          >
            Products
          </Link>
          <Link
            className="hover:bg-accent/10 flex items-center px-2"
            href="/admin/sales"
          >
            Sales
          </Link>
          <div className="flex items-center">
            <SignOut />
          </div>
        </>
      </nav>
    </header>
  );
}
