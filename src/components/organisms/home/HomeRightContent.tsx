import CardPeopleSuggest from "@/components/molecules/card/CardPeopleSuggest";
import CardRecomendation from "@/components/molecules/card/CardRecomendation";

export default function HomeRightContent() {
  return (
    <div className="flex hidden flex-col gap-6 md:flex">
      <CardPeopleSuggest />
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
