import CardFollowersContent from "../../molecules/card/CardFollowersContent";
import FollowersRightContent from "./FollowersRightContent";

export default function FollowersWrapper() {
  return (
    <section className="flex w-full flex-col gap-6 md:flex-row">
      <div className="md:w-3/4">
        <CardFollowersContent />
      </div>
      <div className="md:w-1/4">
        <FollowersRightContent />
      </div>
    </section>
  );
}
