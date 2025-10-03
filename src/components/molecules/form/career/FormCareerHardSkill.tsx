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

import {
  HardSkill,
  HardSkillCategory,
} from "@/constants/career-options-hardskill";

const FormSchema = z.object({
  categories: z.array(z.string()).min(1, {
    message: "You must select at least one skill.",
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface FormCareerHardSkillProps {
  category: HardSkillCategory;
  onNext: (data: { category: HardSkillCategory; skills: string[] }) => void;
}

export function FormCareerHardSkill({
  category,
  onNext,
}: FormCareerHardSkillProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: { categories: [] },
  });

  const options = HardSkill[category] || [];

  function onSubmit(data: FormSchemaType) {
    console.log("Hard skills submitted:", {
      category,
      skills: data.categories,
    });
    onNext({ category, skills: data.categories });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Hard Skills</CardTitle>
        <CardDescription>
          Pick the skills you enjoy using the most.
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
                  <div className="mt-2 space-y-3">
                    {options.map((option) => (
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
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
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
