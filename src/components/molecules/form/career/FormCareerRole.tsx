"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CareerOptionsRole } from "@/constants/career-options-role";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  category: z.enum(["Role 1", "Role 2", "Role 3", "Role 4", "Other"]),
  role: z.string().optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface FormCareerRoleProps {
  onNext: (data: { role: string }) => void;
}

export function FormCareerRole({ onNext }: FormCareerRoleProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "Role 1", // atau "" kalau mau mulai kosong
      role: "",
    },
  });

  const category = form.watch("category");

  function onSubmit(data: FormSchemaType) {
    const finalData = {
      role: data.category === "Other" ? data.role || "" : data.category,
    };
    console.log("Role submitted:", finalData);
    onNext(finalData);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>What’s your role?</CardTitle>
        <CardDescription>
          Tell us your role so others know what you do.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Category Select */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CareerOptionsRole.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Kalau pilih Other, baru keluar input */}
            {category === "Other" && (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your role" {...field} />
                    </FormControl>
                    <p className="text-muted-foreground mb-2 text-sm">
                      Ex: Designer, Freelancer, Writer, Programmer
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button className="w-full" type="submit">
              Next
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
