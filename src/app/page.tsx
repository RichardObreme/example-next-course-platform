"use client";

import { userRoles } from "@/drizzle/schema";
import { authClient } from "@/lib/auth-client";

const admin = {
  email: "admin@admin.local",
  password: "adminadmin",
  name: "Admin",
  role: userRoles[1],
};

export default function Home() {
  const { data: session } = authClient.useSession();
  console.log(session);

  async function signup() {
    const { data, error } = await authClient.signUp.email(
      {
        email: admin.email,
        password: admin.password,
        name: admin.name,
        role: admin.role,
      },
      {
        onRequest: (ctx) => {
          // show loading
        },
        onSuccess: (ctx) => {
          // redirect to the callbackUrl
        },
        onError: (ctx) => {
          // display error message
          console.log(ctx.error.message);
        },
      }
    );
  }

  async function signin() {
    const { data, error } = await authClient.signIn.email({
      email: admin.email,
      password: admin.password,
      rememberMe: false,
    });
    console.log("sign-in", data, error);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex flex-col items-center justify-center gap-2">
        <button onClick={signup} className="hover:cursor-pointer">
          Sign Up
        </button>
        <button onClick={signin} className="hover:cursor-pointer">
          Sign In
        </button>
        <span>{session ? session.user.name : "Not authenticated"}</span>
        <button
          onClick={() => authClient.signOut()}
          className="hover:cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
