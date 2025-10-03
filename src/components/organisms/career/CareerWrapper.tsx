"use client";

import * as React from "react";
import { FormCareerInspire } from "@/components/molecules/form/career/FormCareerInspire";
import { FormCareerPrefer } from "@/components/molecules/form/career/FormCareerPrefer";
import { FormCareerChallenge } from "@/components/molecules/form/career/FormCareerChallenge";
import { FormCareerHardSkill } from "@/components/molecules/form/career/FormCareerHardSkill";
import { FormCareerSoftSkill } from "@/components/molecules/form/career/FormCareerSoftSkill";
import { FormCareerRole } from "@/components/molecules/form/career/FormCareerRole";
import { FormCareerResult } from "@/components/molecules/form/career/FormCareerResult";

interface CareerFormData {
  inspire?: {
    category: string;
  };
  prefer?: {
    category: string;
  };
  challenge?: {
    category: string;
  };
  hardSkill?: {
    category: string;
    skills: string[];
  };
  softSkill?: {
    categories: string[];
  };
  role?: {
    role: string;
  };
}

export default function CareerWrapper() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<CareerFormData>({});
  const [aiResponse, setAiResponse] = React.useState<string>("");

  async function handleSubmitAll(finalData: Partial<CareerFormData>) {
    const mergedData = { ...formData, ...finalData };
    setFormData(mergedData);

    const prompt = `
      Saya tertarik pada bidang karir berikut: Tolong berikan rekomendasi jalur karir, skill yang dibutuhkan, dan langkah awal yang bisa saya ambil.
      ${JSON.stringify(mergedData, null, 2)}
    `;

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setAiResponse(data.text);
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {step === 1 && (
          <FormCareerInspire
            onNext={(data) => {
              setFormData((prev) => ({
                ...prev,
                inspire: { category: data },
              }));
              setStep(2);
            }}
          />
        )}
        {step === 2 && (
          <FormCareerPrefer
            onNext={(data) => {
              setFormData((prev) => ({ ...prev, prefer: data }));
              setStep(3);
            }}
          />
        )}
        {step === 3 && (
          <FormCareerChallenge
            onNext={(data) => {
              setFormData((prev) => ({ ...prev, challenge: data }));
              setStep(4);
            }}
          />
        )}
        {step === 4 && (
          <FormCareerHardSkill
            category={formData.inspire?.category}
            onNext={(data) => {
              setFormData((prev) => ({ ...prev, hardSkill: data }));
              setStep(5);
            }}
          />
        )}
        {step === 5 && (
          <FormCareerSoftSkill
            onNext={(data) => {
              setFormData((prev) => ({ ...prev, softSkill: data }));
              setStep(6);
            }}
          />
        )}
        {step === 6 && (
          <FormCareerRole
            onNext={(data) => {
              handleSubmitAll({ role: data });
              setStep(7);
            }}
          />
        )}

        {step === 7 && (
          <FormCareerResult
            aiResponse={aiResponse}
            formData={formData}
            onRestart={() => {
              setFormData({});
              setAiResponse("");
              setStep(1);
            }}
          />
        )}
      </div>
    </div>
  );
}
