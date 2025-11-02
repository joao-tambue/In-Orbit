"use client";

import { useEffect, useState } from "react";
import { Goal } from "@/types/goal";
import { getGoals, saveGoals } from "@/lib/storage";

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    setGoals(getGoals());
  }, []);

  function addGoal(newGoal: Goal) {
    const updated = [...goals, newGoal];
    setGoals(updated);
    saveGoals(updated);
  }

  function removeGoal(id: string) {
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    saveGoals(updated);
  }

  return { goals, addGoal, removeGoal };
}