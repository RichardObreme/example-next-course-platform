import Link from "next/link";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";

type LoginFormValues = {
  email: string;
  password: string;
};

const loginFormValues = z.object({
  email: z
    .string({ required_error: "Email manquant" })
    .email("Cet email n'est pas valide"),
  password: z
    .string({ required_error: "Veuillez entrer votre mot de passe" })
    .min(1, "Veuillez entrer votre mot de passe"),
});

export default function LoginForm(/* {  }: LoginFormProps */) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormValues),
    defaultValues: {
      email: "admin@test.test",
      password: "azertyuiop",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (formData) => {
    const { data, error } = await authClient.signIn.email(
      {
        /**
         * The user email
         */
        email: formData.email,
        /**
         * The user password
         */
        password: formData.password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/",
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        rememberMe: false,
      },
      {
        //callbacks
      }
    );
    console.log("SignIn:", data, error);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="adresse@mail.fr" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Connection</Button>
        </form>
      </Form>
      <p className="mt-4 text-xs">
        Not yet a member ?{" "}
        <Link
          href="/sign-up"
          className="hover:cursor-pointer underline text-xs hover:text-gray-400"
        >
          Registration
        </Link>
      </p>
    </div>
  );
}
