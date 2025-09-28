import HomeLeftContent from "./HomeLeftContent";
import HomeRightContent from "./HomeRightContent";
import HomeScrollContent from "./HomeScrollContent";

export default function HomeWrapper() {
  return (
    <section className="flex w-full flex-col gap-6 md:flex-row">
      <div className="md:w-1/4">
        <HomeLeftContent />
      </div>
      <div className="md:w-2/4">
        <HomeScrollContent />
      </div>
      <div className="md:w-1/4">
        <HomeRightContent />
      </div>
    </section>
  );
}
