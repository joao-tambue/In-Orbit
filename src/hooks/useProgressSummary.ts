"use client";

import { useMemo } from "react";
import { Goal } from "@/types/goal";

export function useProgressSummary(goals: Goal[], getCountForGoal: (id: string) => number) {
  return useMemo(() => {
    const total = goals.length;
    if (total === 0) return { percent: 0, done: 0, total };
    const done = goals.filter(g => getCountForGoal(g.id) > 0).length;
    const percent = Math.round((done / total) * 100);
    return { percent, done, total };
  }, [goals, getCountForGoal]);
}