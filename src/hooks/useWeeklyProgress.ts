// src/hooks/useWeeklyProgress.ts
"use client";

import { useEffect, useState } from "react";
import { Goal } from "@/types/goal";
import { getCurrentWeekRange } from "@/utils/date";

type WeekProgress = Record<string, boolean>; // goalId -> done

const STORAGE_KEY = "orbit_progress";

export function useWeeklyProgress() {
  const [progress, setProgress] = useState<WeekProgress>({});
  const { key } = getCurrentWeekRange();

  useEffect(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_${key}`);
    if (saved) setProgress(JSON.parse(saved));
  }, [key]);

  function toggleProgress(goalId: string) {
    const updated = {
      ...progress,
      [goalId]: !progress[goalId],
    };
    setProgress(updated);
    localStorage.setItem(`${STORAGE_KEY}_${key}`, JSON.stringify(updated));
  }

  function getProgressForGoal(goalId: string) {
    return !!progress[goalId];
  }

  return { progress, toggleProgress, getProgressForGoal };
}