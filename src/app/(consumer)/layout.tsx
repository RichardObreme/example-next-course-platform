import LoginDialog from "@/components/LoginDialog";
import SignOut from "@/components/SignOut";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/features/users/db/users";
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

async function Navbar() {
  const { role } = await getCurrentUser();

  return (
    <header className="flex h-12 shadow bg-background z-10">
      <nav className="flex gap-4 container">
        <Link
          className="mr-auto text-lg hover:underline flex items-center"
          href={"/"}
        >
          Web Dev Simplified
        </Link>
        <>
          <AdminLink />
          {role && (
            <Link
              className="hover:bg-accent/10 flex items-center px-2"
              href="/courses"
            >
              My Courses
            </Link>
          )}
          {role && (
            <Link
              className="hover:bg-accent/10 flex items-center px-2"
              href="/purchases"
            >
              Purchase History
            </Link>
          )}
          {!role ? (
            <div className="flex items-center">
              <LoginDialog>
                <Button>Sign-in</Button>
              </LoginDialog>
            </div>
          ) : (
            <div className="flex items-center">
              <SignOut />
            </div>
          )}
        </>
      </nav>
    </header>
  );
}

async function AdminLink() {
  if (!canAccessAdminPages(await getCurrentUser())) return null;

  return (
    <Link className="hover:bg-accent/10 flex items-center px-2" href="/admin">
      Admin
    </Link>
  );
}
