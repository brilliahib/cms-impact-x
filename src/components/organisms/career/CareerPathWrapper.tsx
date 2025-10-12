"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";
import { useGetCareerPath } from "@/http/career/get-career-path";
import { useGetPredictionExists } from "@/http/career/get-prediction-exists";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CareerPathWrapper() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { data: exists, isPending: isExistsPending } = useGetPredictionExists(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data, isPending } = useGetCareerPath(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  useEffect(() => {
    if (!isExistsPending && exists && !exists.data.hasCareerPrediction) {
      router.push("/career");
    }
  }, [exists, isExistsPending, router]);

  if (isPending || isExistsPending) {
    return (
      <section className="flex flex-col gap-6 py-10">
        <div className="w-full">
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>

        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-lg" />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const paths = data?.data.career_paths ?? [];

  return (
    <section className="flex flex-col gap-6">
      <div className="w-full">
        <BreadcrumbContent />
      </div>

      <div className="mb-12 w-full rounded-xl bg-gradient-to-r from-[#4ECDC4] to-[#3B82F6] p-4 py-20 text-white">
        <div className="flex flex-col justify-center space-y-6 text-center">
          <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:items-start">
            <h3 className="text-4xl font-bold text-white">
              The Career Path for You
            </h3>
            <div className="flex flex-row items-center gap-2 rounded-full bg-white p-2 px-4 text-sm text-[#3B82F6]">
              <Sparkles className="h-5 w-5" />{" "}
              <span className="font-semibold">AI Prediction</span>
            </div>
          </div>
          <p className="text-lg text-white/90">
            We analyze your skills and interests to guide you toward the right
            career path.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center">
        <Tabs defaultValue={paths[0]?.title ?? ""}>
          <TabsList className="mb-50 grid grid-cols-2 gap-6 md:mb-40 md:grid-cols-3">
            {paths.map((career, index) => (
              <TabsTrigger
                key={index}
                value={career.title}
                className={cn(
                  "group bg-card flex flex-row items-center justify-center gap-4 rounded-xl border px-4 py-4 shadow-sm transition-all",
                  "hover:border-[#3B82F6]/50 hover:text-[#3B82F6] hover:shadow-md",
                  "data-[state=active]:border-[#3B82F6] data-[state=active]:bg-white data-[state=active]:text-[#3B82F6] data-[state=active]:shadow-md",
                  "data-[state=inactive]:text-muted-foreground",
                )}
              >
                <div
                  className={cn(
                    "border-muted flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                    "group-data-[state=active]:border-[#3B82F6] group-data-[state=active]:bg-[#3B82F6]/20",
                  )}
                >
                  <div
                    className={cn(
                      "h-2.5 w-2.5 rounded-full bg-[#3B82F6] opacity-0 transition-all",
                      "group-data-[state=active]:opacity-100",
                    )}
                  />
                </div>
                <span className="line-clamp-1 text-sm font-medium md:line-clamp-2">
                  {career.title}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {paths.map((career, index) => (
            <TabsContent key={index} value={career.title} className="mt-6">
              <div className="space-y-24">
                <div className="space-y-6 text-center">
                  <h4 className="inline-block bg-gradient-to-r from-[#4ECDC4] to-[#3B82F6] bg-clip-text text-3xl font-extrabold text-transparent">
                    Road Map
                  </h4>
                  <h4 className="text-muted-foreground text-3xl font-black md:text-4xl">
                    {career.title}
                  </h4>
                  <p className="text-2xl font-semibold text-[#3B82F6]">
                    {career.average_salary}
                  </p>
                  <p className="text-muted-foreground leading-9">
                    {career.description}
                  </p>
                </div>

                <div className="relative">
                  <div className="bg-border absolute top-2 left-[11px] h-full w-[2px]" />
                  <div className="flex flex-col space-y-8">
                    {career.roadmap.map((step, index) => (
                      <div key={index} className="relative pl-10">
                        <div className="absolute top-1.5 -left-1 z-10 flex size-8 items-center justify-center rounded-full border bg-[#3B82F6] text-sm font-semibold text-white">
                          {index + 1}
                        </div>

                        <div className="bg-card space-y-1 rounded-lg border p-4 shadow-sm transition hover:shadow-md">
                          <h3 className="text-foreground text-base font-semibold">
                            {step.step}
                          </h3>
                          <p className="text-muted-foreground">
                            {step.explanation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-12 text-center">
                  <h4 className="inline-block bg-gradient-to-r from-[#4ECDC4] to-[#3B82F6] bg-clip-text text-3xl font-extrabold text-transparent">
                    Requirements
                  </h4>
                  <div className="w-full">
                    <ul className="text-muted-foreground list-inside list-disc space-y-3">
                      {career.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-12 text-center">
                  <h4 className="inline-block bg-gradient-to-r from-[#4ECDC4] to-[#3B82F6] bg-clip-text text-3xl font-extrabold text-transparent">
                    Recommended Majors
                  </h4>
                  <div className="flex flex-wrap justify-center gap-4">
                    {career.recommended_majors.map((major, i) => (
                      <Card key={i}>
                        <CardContent>
                          <h3 className="text-muted-foreground">{major}</h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-12 text-center">
                  <h4 className="inline-block bg-gradient-to-r from-[#4ECDC4] to-[#3B82F6] bg-clip-text text-3xl font-extrabold text-transparent">
                    Recommended Companies
                  </h4>
                  <div className="flex flex-wrap justify-center gap-4">
                    {career.recommended_companies.map((company, i) => (
                      <Card key={i}>
                        <CardContent>
                          <h3 className="text-muted-foreground">{company}</h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
