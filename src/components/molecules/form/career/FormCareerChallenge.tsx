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
import { careerOptionsChallenge } from "@/constants/career-options-challange";

const FormSchema = z.object({
  category: z.enum([
    "Problem Solving",
    "Innovation",
    "Data-driven",
    "Communication",
  ]),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export function FormCareerChallenge({
  onNext,
}: {
  onNext: (data: FormSchemaType) => void;
}) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: FormSchemaType) {
    console.log("Challenge submitted:", data);
    onNext(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>What Kind of Challenge Excites You?</CardTitle>
        <CardDescription>
          Challenges help you grow. Tell us which type motivates you the most.
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
                        {careerOptionsChallenge.map((option) => (
                          <FormItem
                            key={option.value}
                            className="flex items-center gap-1"
                          >
                            <Card className="flex w-full flex-row items-center p-3">
                              <FormControl>
                                <RadioGroupItem value={option.value} />
                              </FormControl>
                              <div className="flex flex-col items-start gap-1">
                                <FormLabel className="font-normal">
                                  {option.label}
                                </FormLabel>
                                <FormLabel className="text-muted-foreground text-xs">
                                  {option.desc}
                                </FormLabel>
                              </div>
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
