import FormCreateCareerPath from "@/components/molecules/form/career/FormCreateCareerPath";

export default function CareerFormWrapper() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <FormCreateCareerPath />
      </div>
    </div>
  );
}
