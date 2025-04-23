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
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type SignUpFormValues = {
  email: string;
  password: string;
  confirm: string;
};

const signUpFormValues = z
  .object({
    email: z
      .string({ required_error: "Email manquant" })
      .email("Cet email n'est pas valide"),
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
      password: "",
      confirm: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    console.log(data);
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
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    placeholder="mot de passe"
                    type="password"
                    {...field}
                  />
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
                  <Input
                    placeholder="mot de passe"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Créer un compte</Button>
          <p className="text-xs">
            Déjà membre ?
            <LoginDialog>
              <Button
                variant="link"
                className="hover:cursor-pointer underline text-xs hover:text-gray-400"
              >
                Connexion
              </Button>
            </LoginDialog>
          </p>
        </form>
      </Form>
    </div>
  );
}
