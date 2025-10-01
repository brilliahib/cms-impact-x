"use client";

import CardPeopleSuggest from "@/components/molecules/card/CardPeopleSuggest";
import CardRecomendation from "@/components/molecules/card/CardRecomendation";
import { useGetSuggestPeople } from "@/http/suggest/get-suggest-people";
import { useSession } from "next-auth/react";

export default function HomeRightContent() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetSuggestPeople(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <div className="flex hidden flex-col gap-6 md:flex">
      <CardPeopleSuggest data={data?.data} isPending={isPending} />
      <CardRecomendation
        type="project"
        title="Recomendation Project"
        description="Build your portfolio by working on projects."
      />
      <CardRecomendation
        type="competition"
        title="Recomendation Competition"
        description="Showcase your skills by competing with others."
      />
      <CardRecomendation
        type="volunteer"
        title="Recomendation Volunteer"
        description="Join social activities to make a real impact."
      />
    </div>
  );
}
