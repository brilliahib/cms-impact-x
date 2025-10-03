"use client";

import * as React from "react";

interface CareerFormData {
  inspire?: { category: string };
  prefer?: { category: string };
  challenge?: { category: string };
  hardSkill?: { category: string; skills: string[] };
  softSkill?: { categories: string[] };
  role?: { role: string };
}

interface FormCareerResultProps {
  aiResponse: string;
  formData: CareerFormData;
  onRestart?: () => void;
}

export function FormCareerResult({
  aiResponse,
  formData,
  onRestart,
}: FormCareerResultProps) {
  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-bold">AI Career Suggestion</h2>

      <div className="bg-muted/30 rounded-xl border p-4">
        <h3 className="text-muted-foreground mb-2 text-sm font-semibold">
          Your Input
        </h3>
        <pre className="text-foreground text-sm whitespace-pre-wrap">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>

      <div className="bg-background rounded-xl border p-4 shadow-sm">
        <h3 className="text-muted-foreground mb-2 text-sm font-semibold">
          AI Suggestion
        </h3>
        <p className="text-foreground whitespace-pre-line">
          {aiResponse || "Loading..."}
        </p>
      </div>

      {onRestart && (
        <button
          onClick={onRestart}
          className="bg-primary hover:bg-primary/90 w-full rounded-xl px-4 py-2 text-white transition"
        >
          Start Again
        </button>
      )}
    </div>
  );
}
