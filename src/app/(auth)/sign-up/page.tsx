"use client";

import LoginDialog from "@/components/LoginDialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type SignUpFormValues = {
  email: string;
  pseudo: string;
  password: string;
  confirm: string;
};

const signUpFormValues = z
  .object({
    email: z
      .string({ required_error: "Email manquant" })
      .email("Cet email n'est pas valide"),
    pseudo: z
      .string({ required_error: "Pseudo manquant" })
      .min(3, "Votre pseudo doit contenir au moins 3 caractères."),
    password: z
      .string({ required_error: "Veuillez entrer votre mot de passe" })
      .min(6, "Veuillez entrer votre mot de passe d'au moins 6 caractères"),
    confirm: z
      .string({ required_error: "Confirmer votre mot de passe" })
      .min(6, "Veuillez entrer votre mot de passe d'au moins 6 caractères"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Les deux mots de passe ne correspondent pas.",
    path: ["confirm"],
  });

export default function SignUpPage() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormValues),
    defaultValues: {
      email: "",
      pseudo: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (formData) => {
    console.log(formData);

    const { data, error } = await authClient.signUp.email(
      {
        email: formData.email, // user email address
        password: formData.password, // user password -> min 8 characters by default
        name: formData.pseudo, // user display name
        callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("onRequest:", ctx);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log("onSuccess:", ctx);
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
    console.log(data, error);
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
            name="pseudo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pseudo</FormLabel>
                <FormControl>
                  <Input placeholder="Pseudo" {...field} />
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
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmation</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create an account</Button>
          <p className="text-xs">
            Already member ?
            <LoginDialog>
              <Button
                variant="link"
                className="hover:cursor-pointer underline text-xs hover:text-gray-400"
              >
                Connection
              </Button>
            </LoginDialog>
          </p>
        </form>
      </Form>
    </div>
  );
}
