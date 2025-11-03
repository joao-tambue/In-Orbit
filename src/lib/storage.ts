// src/lib/storage.ts
import { Goal } from "@/types/goal";

const STORAGE_KEY = "orbit_goals";

export function getGoals(): Goal[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveGoals(goals: Goal[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch {}
}