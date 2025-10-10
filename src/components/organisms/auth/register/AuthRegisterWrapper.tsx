import { FormAuthRegister } from "@/components/molecules/form/auth/FormAuthRegister";

export default function AuthRegisterWrapper() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <FormAuthRegister />
      </div>
    </div>
  );
}
