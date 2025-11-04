"use client";

import { useWeeklyProgress } from "@/hooks/useWeeklyProgress";
import { getCurrentWeekRange } from "@/utils/date";
import { Goal } from "@/types/goal";
import { BadgeCheck } from "lucide-react";

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
}

export default function WeekActivity({ goals }: { goals: Goal[] }) {
  const { data, undo } = useWeeklyProgress();
  const { monday } = getCurrentWeekRange();

  // transforma data em lista por dia
  const byDay: Record<string, Array<{ goalTitle: string; timestamp: string; goalId: string }>> = {};

  for (const goal of goals) {
    const entries = data[goal.id] ?? [];
    entries.forEach((e) => {
      const d = new Date(e.timestamp);
      const key = d.toLocaleDateString("en", { weekday: 'long', day: '2-digit', month:'short' });
      if (!byDay[key]) byDay[key] = [];
      byDay[key].push({ goalTitle: goal.title, timestamp: e.timestamp, goalId: goal.id });
    });
  }

  const dayKeys = Object.keys(byDay).sort((a, b) => 0); // mantém ordem natural (podes ordenar por data se gravares)

  if (dayKeys.length === 0) {
    return (
      <div className="max-w-[480pxpx] mx-auto mt-6 text-zinc-400">
        You haven´t completed any goals this week yet.
      </div>
    );
  }

  return (
    <div className="max-w-[480pxpx] mx-auto mt-6 text-zinc-300">
      {dayKeys.map((day) => (
        <div key={day} className="mb-4">
          <h4 className="text-sm text-zinc-400 mb-2">{day}</h4>
          <ul className="space-y-2">
            {byDay[day].map((item) => (
              <li key={item.timestamp} className="flex justify-between items-center">
                <div className="text-sm flex items-center gap-2">
                  <BadgeCheck className="text-pink-400" size={16} />
                  <p>You completed "{item.goalTitle}" at {formatTime(item.timestamp)}</p>
                </div>
                <button onClick={() => undo(item.goalId)} className="text-sm text-violet-400 hover:underline">
                  Undo
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}