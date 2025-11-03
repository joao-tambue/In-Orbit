// src/hooks/useWeeklyProgress.tsx
"use client";

import { useEffect, useState } from "react";
import { getCurrentWeekRange } from "@/utils/date";

type Entry = { timestamp: string };
type WeekProgressStorage = Record<string, Entry[]>; // goalId => entries[]

const STORAGE_PREFIX = "orbit_progress_";

export function useWeeklyProgress() {
  const { key } = getCurrentWeekRange();
  const storageKey = `${STORAGE_PREFIX}${key}`;

  const [data, setData] = useState<WeekProgressStorage>({});

  useEffect(() => {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem(storageKey);
  if (!raw) return;

  const parsed = JSON.parse(raw);
  const normalized: WeekProgressStorage = {};

  for (const [key, value] of Object.entries(parsed)) {
    normalized[key] = Array.isArray(value) ? value : value ? [value] : [];
  }

  setData(normalized);
}, [storageKey]);

  function save(newData: WeekProgressStorage) {
    setData(newData);
    localStorage.setItem(storageKey, JSON.stringify(newData));
  }

  function toggleProgress(goalId: string) {
    const now = new Date().toISOString();
    const current = data[goalId] ?? [];
    // se já tem entrada mais recente exactamente igual a hoje -> desfaz
    const last = current[current.length - 1];
    // regra: toggle cria/removes last entry (não apaga histórico)
    if (last && !last?.__removed) {
      // adicionar uma flag de remoção para poder "desfazer" visualmente ou simplesmente pop
      const updated = { ...data, [goalId]: current.slice(0, -1) };
      save(updated);
      return;
    }
    const updated = { ...data, [goalId]: [...current, { timestamp: now }] };
    save(updated);
  }

  function undo(goalId: string) {
    const current = data[goalId] ?? [];
    if (current.length === 0) return;
    const updated = { ...data, [goalId]: current.slice(0, -1) };
    save(updated);
  }

  function getLastEntry(goalId: string): Entry | null {
    const current = data[goalId] ?? [];
    return current.length > 0 ? current[current.length - 1] : null;
  }

  function getCountForGoal(goalId: string) {
    return (data[goalId] ?? []).length;
  }

  return { data, toggleProgress, undo, getLastEntry, getCountForGoal };
}
