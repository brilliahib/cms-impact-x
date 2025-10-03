import { FormCareer } from "@/components/molecules/form/career/FormCareer";

export default function CareerWrapper() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <FormCareer />
      </div>
    </div>
  );
}
