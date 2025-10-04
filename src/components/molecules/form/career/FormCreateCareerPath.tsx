"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { careerSchema, CareerType } from "@/validators/career/career-validator";
import { useCreateCareerPath } from "@/http/career/create-career-path";
import { usePredictCareer } from "@/http/career/predict-career-path";
import { careerOptionsInspire } from "@/constants/career-options-inspire";
import { careerOptionsPrefer } from "@/constants/career-options-prefer";
import { careerOptionsChallenge } from "@/constants/career-options-challange";
import { CareerOptionsSoftSkill } from "@/constants/career-options-softskill";
import {
  HardSkill,
  HardSkillCategory,
} from "@/constants/career-options-hardskill";
import {
  CareerRole,
  CareerRoleCategory,
} from "@/constants/career-options-role";
import { useRouter } from "next/navigation";

type OptionItem = {
  value: string;
  label: string;
};

export default function FormCreateCareerPath() {
  const form = useForm<CareerType>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      work_inspires: "",
      work_prefer: "",
      work_challenge: "",
      work_roles: "",
      work_hardskills: [],
      work_softskills: [],
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [touchedSteps, setTouchedSteps] = useState<Record<string, boolean>>({});

  const { mutateAsync: createCareerPath, isPending: isCreating } =
    useCreateCareerPath();

  const { mutateAsync: predictCareer, isPending: isPredicting } =
    usePredictCareer();

  const isPending = isCreating || isPredicting;

  const inspireValue = useWatch({
    control: form.control,
    name: "work_inspires",
  });

  useEffect(() => {
    form.setValue("work_hardskills", []);
    form.setValue("work_roles", "");
    setTouchedSteps((p) => ({
      ...p,
      work_hardskills: false,
      work_roles: false,
    }));
  }, [inspireValue, form]);

  const inspireToCategoryMap: Record<
    string,
    HardSkillCategory & CareerRoleCategory
  > = {
    Technology: "technology",
    "Health & Biotechnology": "health",
    "Environment & Sustainability": "environment",
    "Social & Humanities": "social",
    "Arts & Creative": "arts",
    "Business & Entrepreneurship": "business",
    "Science & Research": "science",
  };

  const steps = [
    {
      title: "What Inspires You the Most?",
      description:
        "This helps us understand your passion and guide you toward a suitable career path.",
      name: "work_inspires",
      options: careerOptionsInspire,
      type: "single",
    },
    {
      title: "What Kind of Work Do You Prefer?",
      description: "Tell us what kind of environment or job suits you best.",
      name: "work_prefer",
      options: careerOptionsPrefer,
      type: "single",
    },
    {
      title: "What Challenges Excite You?",
      description: "Share what kind of problems you enjoy solving.",
      name: "work_challenge",
      options: careerOptionsChallenge,
      type: "single",
    },
    {
      title: "Your Hard Skills",
      description: "Select your technical or specialized strengths.",
      name: "work_hardskills",
      options:
        inspireValue && inspireToCategoryMap[inspireValue]
          ? HardSkill[inspireToCategoryMap[inspireValue]]
          : [],
      type: "multi",
    },
    {
      title: "Your Soft Skills",
      description: "Select your interpersonal or communication strengths.",
      name: "work_softskills",
      options: CareerOptionsSoftSkill,
      type: "multi",
    },
    {
      title: "What Role Would You Like to Take?",
      description: "What position or role do you imagine yourself thriving in?",
      name: "work_roles",
      options:
        inspireValue && inspireToCategoryMap[inspireValue]
          ? CareerRole[inspireToCategoryMap[inspireValue]]
          : [],
      type: "single",
    },
  ];

  const currentStep = steps[step - 1];
  const currentFieldValue = useWatch({
    control: form.control,
    name: currentStep.name as keyof CareerType,
  });

  const isEmpty = (val: string | string[] | undefined) =>
    Array.isArray(val) ? val.length === 0 : !val;

  const handleNext = () => {
    setTouchedSteps((p) => ({ ...p, [currentStep.name]: true }));
    if (!isEmpty(currentFieldValue) && !isPending && step < steps.length) {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = form.handleSubmit(async (body: CareerType) => {
    const toastId = toast.loading("Creating your career profile...");
    try {
      await createCareerPath(body);
      toast.success("Career path created successfully!", { id: toastId });

      toast.loading("Predicting your career path...", { id: toastId });
      await predictCareer();

      toast.success("Career path prediction completed!", { id: toastId });

      queryClient.invalidateQueries({ queryKey: ["get-career-path"] });
      router.push("/career-path");
    } catch (_) {
      toast.error("Failed to create or predict career path!", { id: toastId });
    }
  });

  return (
    <div className="w-full min-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>{currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Steps */}
              {steps.map((stepItem, index) => (
                <div
                  key={stepItem.name}
                  className={index + 1 === step ? "block" : "hidden"}
                >
                  <FormField
                    control={form.control}
                    name={stepItem.name as keyof CareerType}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ScrollArea className="h-72">
                            {stepItem.type === "multi" ? (
                              stepItem.options.length > 0 ? (
                                <div className="flex flex-col gap-3">
                                  {stepItem.options.map(
                                    (option: OptionItem) => {
                                      const checked = Array.isArray(field.value)
                                        ? field.value.includes(option.value)
                                        : false;
                                      return (
                                        <Card
                                          key={option.value}
                                          className="flex w-full flex-row items-center p-3"
                                        >
                                          <Checkbox
                                            checked={checked}
                                            onCheckedChange={(checkedState) => {
                                              setTouchedSteps((p) => ({
                                                ...p,
                                                [stepItem.name]: true,
                                              }));
                                              const isChecked =
                                                checkedState === true;
                                              const prev = Array.isArray(
                                                field.value,
                                              )
                                                ? field.value
                                                : [];
                                              field.onChange(
                                                isChecked
                                                  ? [...prev, option.value]
                                                  : prev.filter(
                                                      (v: string) =>
                                                        v !== option.value,
                                                    ),
                                              );
                                            }}
                                          />
                                          <span>{option.label}</span>
                                        </Card>
                                      );
                                    },
                                  )}
                                </div>
                              ) : (
                                <p className="text-muted-foreground p-4 text-sm">
                                  Please select your inspiration first.
                                </p>
                              )
                            ) : (
                              <RadioGroup
                                value={
                                  Array.isArray(field.value)
                                    ? (field.value[0] ?? "")
                                    : (field.value ?? "")
                                }
                                onValueChange={(val) => {
                                  setTouchedSteps((p) => ({
                                    ...p,
                                    [stepItem.name]: true,
                                  }));
                                  field.onChange(val);
                                }}
                                className="flex flex-col gap-3"
                              >
                                {stepItem.options.map((option: OptionItem) => (
                                  <Card
                                    key={option.value}
                                    className="flex w-full flex-row items-center p-3"
                                  >
                                    <RadioGroupItem value={option.value} />
                                    <span>{option.label}</span>
                                  </Card>
                                ))}
                              </RadioGroup>
                            )}
                          </ScrollArea>
                        </FormControl>
                        {(touchedSteps[stepItem.name] ||
                          form.formState.isSubmitted) && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              {/* Navigation */}
              <div className="flex justify-between">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrev}
                    disabled={isPending}
                  >
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < steps.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isPending || isEmpty(currentFieldValue)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Analyzing..." : "Submit & Predict"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
