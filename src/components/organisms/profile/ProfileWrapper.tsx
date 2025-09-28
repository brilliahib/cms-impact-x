import CardProfile from "@/components/molecules/card/CardProfile";
import ProfileRightContent from "./ProfileRightContent";
import ProfileScrollContent from "./ProfileScrollContent";

export default function ProfileWrapper() {
  return (
    <>
      <section className="flex w-full flex-col gap-6 md:flex-row">
        <div className="md:w-3/4">
          <CardProfile />
          <ProfileScrollContent />
        </div>
        <div className="md:w-1/4">
          <ProfileRightContent />
        </div>
      </section>
    </>
  );
}
