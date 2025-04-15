"use client";

import { authClient } from "@/lib/auth-client";
import { canAccessAdminPages } from "@/permissions/general";
import Link from "next/link";
import { ReactNode } from "react";

export default function ConsumerLayout({
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
        <Link
          className="mr-auto text-lg hover:underline px-2 flex items-center"
          href={"/"}
        >
          Web Dev Simplified
        </Link>
        <>
          {/* //TODO: 
            //! ONLY For logged user 
        */}
          <AdminLink />
          <Link
            className="hover:bg-accent/10 flex items-center px-2"
            href="/courses"
          >
            My Courses
          </Link>
          <Link
            className="hover:bg-accent/10 flex items-center px-2"
            href="/purchases"
          >
            Purchase History
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
