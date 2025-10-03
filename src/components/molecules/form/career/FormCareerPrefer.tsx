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
import {
  careerOptionsPrefer,
  CareerPreferCategory,
} from "@/constants/career-options-prefer";

const FormSchema = z.object({
  category: z.enum([
    "Collaborative",
    "Independent",
    "environment",
    "Research-oriented",
    "Leadership",
  ] as [CareerPreferCategory, ...CareerPreferCategory[]]),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface FormCareerPreferProps {
  onNext: (data: FormSchemaType) => void;
}

export function FormCareerPrefer({ onNext }: FormCareerPreferProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: FormSchemaType) {
    console.log("Prefer submitted:", data);
    onNext(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>How Do You Prefer to Work?</CardTitle>
        <CardDescription>
          Everyone has their own style of working. Pick the one that feels most
          natural to you.
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
                  <FormControl>
                    <ScrollArea className="h-72">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-3"
                      >
                        {careerOptionsPrefer.map((option) => (
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
