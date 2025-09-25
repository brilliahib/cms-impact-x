import { FormAuthLogin } from "@/components/molecules/form/auth/FormAuthLogin";

export default function AuthLoginWrapper() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <FormAuthLogin />
      </div>
    </div>
  );
}
