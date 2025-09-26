import CardCurrentActivity from "@/components/molecules/card/CardCurrentActivity";
import CardProfileFeed from "@/components/molecules/card/CardProfileFeed";

export default function HomeLeftContent() {
  return (
    <div className="sticky top-24 flex hidden flex-col gap-6 md:flex">
      <CardProfileFeed />
      <CardCurrentActivity />
    </div>
  );
}
