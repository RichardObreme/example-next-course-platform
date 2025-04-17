"use client";

import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { canAccessAdminPages } from "@/permissions/general";
import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
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
          <Link className="text-lg hover:underline" href={"/"}>
            Web Dev Simplified
          </Link>
          <Badge>Admin</Badge>
        </div>
        <>
          {/* //TODO: 
            //! ONLY For logged user 
        */}
          <AdminLink />
          <Link
            className="hover:bg-accent/10 flex items-center px-2"
            href="/admin/courses"
          >
            My Courses
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
          <div className="size-8 self-center">
            <button>Sign-in</button>
          </div>
          <div className="size-8 self-center">
            <button>Sign-out</button>
          </div>
        </>
      </nav>
    </header>
  );
}

function AdminLink() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  if (!user || user == undefined) return null;

  if (!canAccessAdminPages(user)) return null;

  return (
    <Link className="hover:bg-accent/10 flex items-center px-2" href="/admin">
      Admin
    </Link>
  );
}
