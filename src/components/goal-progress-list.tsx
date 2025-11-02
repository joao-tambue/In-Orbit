// src/components/goal-progress-list.tsx
"use client";

import { Goal } from "@/types/goal";
import { CheckCircle2 } from "lucide-react";
import { useWeeklyProgress } from "@/hooks/useWeeklyProgress";

export default function GoalProgressList({ goals }: { goals: Goal[] }) {
  const { toggleProgress, getProgressForGoal } = useWeeklyProgress();

  if (goals.length === 0)
    return (
      <div className="text-zinc-500 text-center py-10">
        Nenhuma meta cadastrada ainda para esta semana.
      </div>
    );

  return (
    <ul className="space-y-3 max-w-md mx-auto mt-6">
      {goals.map((goal) => {
        const done = getProgressForGoal(goal.id);

        return (
          <li
            key={goal.id}
            onClick={() => toggleProgress(goal.id)}
            className={`flex justify-between items-center border rounded-lg px-4 py-3 cursor-pointer transition-all ${
              done
                ? "bg-violet-600/20 border-violet-600"
                : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
            }`}
          >
            <div>
              <p
                className={`text-sm ${
                  done ? "text-zinc-400 line-through" : "text-white"
                }`}
              >
                {goal.title}
              </p>
              <p className="text-xs text-zinc-500">{goal.frequency}</p>
            </div>

            <CheckCircle2
              className={`${
                done ? "text-violet-500" : "text-zinc-600"
              } transition-colors`}
              size={20}
            />
          </li>
        );
      })}
    </ul>
  );
}