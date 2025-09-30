"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  registerSchema,
  RegisterType,
} from "@/validators/auth/register-validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRegister } from "@/http/auth/register";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";

export function FormAuthRegister({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      username: "",
      password_confirmation: "",
    },
    mode: "onChange",
  });

  const router = useRouter();

  const errorMessages: Record<string, string> = {
    email: "Email sudah digunakan.",
    username: "Username sudah digunakan.",
    phone_number: "Nomor telepon sudah digunakan.",
  };

  const [showPassword, setShowPassword] = useState({
    main: false,
    confirm: false,
  });

  const togglePassword = (key: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { mutate: registerRequestHandler, isPending } = useRegister({
    onError: (error) => {
      const errors = error.response?.data?.errors;
      if (errors && typeof errors === "object") {
        Object.entries(errors).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            const translatedMessage = errorMessages[key] || value[0];
            form.setError(key as keyof RegisterType, {
              type: "manual",
              message: translatedMessage,
            });
          }
        });
      } else {
        toast.error("Registration Failed!", {
          description: "An error occurred, please check your data.",
        });
      }
    },
    onSuccess: async () => {
      const res = await signIn("credentials", {
        email: form.getValues("email"),
        password: form.getValues("password"),
        redirect: false,
      });

      if (!res || res.error) {
        toast.error("Login Failed", {
          description: "An error occurred, please try again.",
        });
        return;
      }

      toast.success("Registration Successful!", {
        description:
          "You have successfully registered and logged in to your account.",
      });
      return router.push("/");
    },
  });

  const onSubmit = (body: RegisterType) => {
    registerRequestHandler({ ...body });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-semibold">Register</CardTitle>
          <CardDescription>
            Enter your data below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            id="first-name"
                            placeholder="Enter your first name..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            id="last_name"
                            placeholder="Enter your last name..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="username"
                          placeholder="Enter your username..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="email"
                          placeholder="Enter your e-mail address"
                          {...field}
                        />
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
                        <div className="relative">
                          <Input
                            type={showPassword.main ? "text" : "password"}
                            id="password"
                            placeholder="Masukkan password"
                            {...field}
                            className="h-10 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                            onClick={() => togglePassword("main")}
                            tabIndex={-1}
                          >
                            {showPassword.main ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword.confirm ? "text" : "password"}
                            id="password_confirmation"
                            placeholder="Masukkan konfirmasi password"
                            {...field}
                            className="h-10 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                            onClick={() => togglePassword("confirm")}
                            tabIndex={-1}
                          >
                            {showPassword.confirm ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Do you have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
