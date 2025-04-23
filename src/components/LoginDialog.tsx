"user client";

import { ReactNode } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";

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

type LoginDialogProps = { children: ReactNode };

export default function LoginDialog({ children }: LoginDialogProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormValues),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connexion</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
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
            <Button type="submit">Connexion</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
