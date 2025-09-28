import CardPeopleSuggest from "@/components/molecules/card/CardPeopleSuggest";
import CardRecomendationCompetition from "@/components/molecules/card/CardRecomendationCompetition";
import CardRecomendationProject from "@/components/molecules/card/CardRecomendationProject";
import CardRecomendationVolunteer from "@/components/molecules/card/CardRecomendationVolunteer";

export default function HomeRightContent() {
  return (
    <div className="flex hidden flex-col gap-6 md:flex">
      <CardPeopleSuggest />
      <CardRecomendationProject />
      <CardRecomendationCompetition />
      <CardRecomendationVolunteer />
    </div>
  );
}
