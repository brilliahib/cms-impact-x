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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { careerOptionsInspire } from "@/constants/career-options-inspire";

// Schema validasi pakai zod
const FormSchema = z.object({
  category: z
    .enum([
      "technology",
      "health",
      "environment",
      "social",
      "arts",
      "business",
      "science",
    ])
    .refine((val) => !!val, {
      message: "You need to select a category.",
    }),
});

export function FormCareerInspire({ onNext }: { onNext: () => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Inspire submitted:", data);

    // Setelah submit valid, lanjut ke step berikutnya
    onNext();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>What Inspires You the Most?</CardTitle>
        <CardDescription>
          This helps us understand your passion and guide you toward a suitable
          career path.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  {/* <FormLabel>Select your career category</FormLabel> */}
                  <FormControl>
                    <ScrollArea className="h-72">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-3"
                      >
                        {careerOptionsInspire.map((option) => (
                          <FormItem
                            key={option.value}
                            className="flex items-center gap-1"
                          >
                            <Card className="flex w-full flex-row items-center p-3">
                              <FormControl>
                                <RadioGroupItem value={option.value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </Card>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </ScrollArea>
                  </FormControl>
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
