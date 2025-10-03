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

import { CareerOptionsSoftSkill } from "@/constants/career-options-softskill";
import { Input } from "@/components/ui/input";

// pakai refine biar string kosong ga bisa
const FormSchema = z.object({
  category: z.string().refine((val) => val !== "", {
    message: "You must select a category.",
  }),
});

export function FormCareerRole({ onNext }: { onNext: () => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Role submitted:", data);
    onNext();
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
                        {CareerOptionsSoftSkill.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <div className="my-2 border-t" />
                  <Input placeholder="Enter your role" />
                  <p className="text-muted-foreground mb-2 text-sm">
                    Ex: Designer, Freelancer, Writer, Programmer
                  </p>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Next
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
