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
import { CareerOptionsSoftSkill } from "@/constants/career-options-softskill";

const FormSchema = z.object({
  categories: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one category.",
  }),
});

type SoftSkillFormData = z.infer<typeof FormSchema>;

interface FormCareerSoftSkillProps {
  onNext: (data: SoftSkillFormData) => void;
}

export function FormCareerSoftSkill({ onNext }: FormCareerSoftSkillProps) {
  // Gunakan tipe yang sudah dibuat untuk useForm
  const form = useForm<SoftSkillFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: [],
    },
  });

  function onSubmit(data: SoftSkillFormData) {
    console.log("Soft skills submitted:", data);
    onNext(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Soft Skills</CardTitle>
        <CardDescription>
          Tell us about your personal skills to highlight your strengths.
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
                    {CareerOptionsSoftSkill.map((option) => (
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
