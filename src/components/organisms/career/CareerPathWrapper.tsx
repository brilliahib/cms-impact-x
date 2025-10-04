"use client";

import BreadcrumbContent from "@/components/atoms/breadcrumb/BreadcrumbItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCareerPath } from "@/http/career/get-career-path";
import { useSession } from "next-auth/react";

export default function CareerPathWrapper() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetCareerPath(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  if (isPending) {
    return (
      <section className="flex animate-pulse flex-col gap-6 py-10 text-center">
        <p className="text-muted-foreground">Loading your career path...</p>
      </section>
    );
  }

  const paths = data?.data.career_paths ?? [];

  return (
    <section className="flex flex-col gap-6">
      <div className="w-full">
        <BreadcrumbContent />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-black">
          The Career Path for You
        </h3>
        <p className="text-muted-foreground text-sm">
          We analyze your skills and interests to guide you toward the right
          career path.
        </p>
      </div>

      <Tabs defaultValue={paths[0]?.title ?? ""} className="w-full">
        <TabsList>
          {paths.map((career, index) => (
            <TabsTrigger key={index} value={career.title}>
              {career.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {paths.map((career, index) => (
          <TabsContent key={index} value={career.title} className="mt-6">
            <div className="space-y-10">
              <h4 className="text-xl font-bold">{career.title}</h4>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="bg-border absolute top-2 left-[11px] h-full w-[2px]" />
                    <div className="flex flex-col space-y-8">
                      {career.roadmap.map((step, index) => (
                        <div key={index} className="relative pl-10">
                          <div className="text-foreground absolute top-1.5 -left-1 z-10 flex size-8 items-center justify-center rounded-full border bg-white text-sm font-semibold">
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
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardContent>
                      <h1 className="mb-4 text-base font-semibold">Overview</h1>
                      <p className="text-muted-foreground">
                        {career.description}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent>
                      <h1 className="mb-4 text-base font-semibold">
                        Average Salary
                      </h1>
                      <p className="text-muted-foreground">
                        {career.average_salary}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent>
                      <h1 className="mb-4 text-base font-semibold">
                        Requirements
                      </h1>
                      <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                        {career.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent>
                      <h1 className="mb-4 text-base font-semibold">
                        Recommended Majors
                      </h1>
                      <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                        {career.recommended_majors.map((major, i) => (
                          <li key={i}>{major}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent>
                      <h1 className="mb-4 text-base font-semibold">
                        Recommended Companies
                      </h1>
                      <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                        {career.recommended_companies.map((company, i) => (
                          <li key={i}>{company}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
