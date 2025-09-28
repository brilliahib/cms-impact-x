import CardDetailActivity from "@/components/molecules/card/CardDetailActivity";
import CardListActivity from "@/components/molecules/card/CardListActivity";

export default function ActivityContent() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <CardListActivity />
      <CardDetailActivity />
    </div>
  );
}
