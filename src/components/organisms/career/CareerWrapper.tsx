"use client";

import * as React from "react";
import { FormCareerInspire } from "@/components/molecules/form/career/FormCareerInspire";
import { FormCareerPrefer } from "@/components/molecules/form/career/FormCareerPrefer";
import { FormCareerChallenge } from "@/components/molecules/form/career/FormCareerChallenge";
import { FormCareerHardSkill } from "@/components/molecules/form/career/FormCareerHardSkill";
import { FormCareerSoftSkill } from "@/components/molecules/form/career/FormCareerSoftSkill";
import { FormCareerRole } from "@/components/molecules/form/career/FormCareerRole";

export default function CareerWrapper() {
  const [step, setStep] = React.useState(1);

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {step === 1 && <FormCareerInspire onNext={() => setStep(2)} />}
        {step === 2 && <FormCareerPrefer onNext={() => setStep(3)} />}
        {step === 3 && <FormCareerChallenge onNext={() => setStep(4)} />}
        {step === 4 && <FormCareerHardSkill onNext={() => setStep(5)} />}
        {step === 5 && <FormCareerSoftSkill onNext={() => setStep(6)} />}
        {step === 6 && <FormCareerRole onNext={() => setStep(7)} />}
      </div>
    </div>
  );
}
