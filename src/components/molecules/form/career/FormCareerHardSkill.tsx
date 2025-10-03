"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { careerOptionsChallenge } from "@/constants/career-options-challange";

const FormSchema = z.object({
  categories: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one category.",
  }),
});

export function FormCareerHardSkill({ onNext }: { onNext: () => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Hard skills submitted:", data);
    onNext();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Hard Skills</CardTitle>
        <CardDescription>
          Highlight the skills you enjoy using the most.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="categories"
              render={() => (
                <FormItem>
                  <FormLabel>Select your career categories</FormLabel>
                  <div className="mt-2 space-y-3">
                    {careerOptionsChallenge.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                          <FormItem
                            key={option.value}
                            className="flex flex-row items-start space-x-3 rounded-md border p-3"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        option.value,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (val) => val !== option.value,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                              <p className="text-muted-foreground text-xs">
                                {option.desc}
                              </p>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
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
