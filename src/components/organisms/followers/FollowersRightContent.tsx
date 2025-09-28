import CardRecomendationCompetition from "@/components/molecules/card/CardRecomendationCompetition";
import CardRecomendationProject from "@/components/molecules/card/CardRecomendationProject";
import CardRecomendationVolunteer from "@/components/molecules/card/CardRecomendationVolunteer";

export default function FollowersRightContent() {
  return (
    <>
      <div className="hidden flex-col gap-6 md:flex">
        <CardRecomendationProject />
        <CardRecomendationCompetition />
        <CardRecomendationVolunteer />
      </div>
    </>
  );
}
