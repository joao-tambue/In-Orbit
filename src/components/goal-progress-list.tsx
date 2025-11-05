"use client";

import { Goal } from "@/types/goal";
import { Plus } from "lucide-react";
import { useNotifications } from "@/contexts/notification-context";

export default function GoalProgressList({
  goals,
  onToggle,
  onDelete,
  getCountForGoal,
}: {
  goals: Goal[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  getCountForGoal: (id: string) => number;
}) {
  const { addNotification } = useNotifications();

  if (goals.length === 0) {
    return (
      <div className="text-zinc-500 text-center py-10">
        No goals have been set for this week yet.
      </div>
    );
  }

  return (
    <div className="max-w-[480px] mx-auto mt-6 transition-all">
      <ul className="flex flex-wrap items-start gap-2 w-full">
        {goals.map((goal) => {
          const done = getCountForGoal(goal.id) > 0;
          return (
            <li
              key={goal.id}
              onClick={() => {
                onToggle(goal.id);

                addNotification({
                  title: done
                    ? "Goal undone 🔄"
                    : "Goal completed 🎯",
                  message: done
                    ? `You’ve undone the goal "${goal.title}".`
                    : `Congratulations! You completed the goal "${goal.title}"! 🏆`,
                  type: "achievement",
                });
              }}
              onDoubleClick={() => {
                if (window.confirm(`Deseja excluir a meta "${goal.title}"?`)) {
                  onDelete(goal.id);
                  addNotification({
                    title: "Goal deleted 🗑️",
                    message: `The goal "${goal.title}" was deleted.`,
                    type: "reminder",
                  });
                }
              }}
              className={`flex items-center gap-1 border rounded-full px-3 py-2 cursor-pointer transition-all duration-200 transform hover:scale-[1.03] 
                ${
                  done
                    ? "bg-zinc-900 border-violet-600/50"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                }`}
            >
              <Plus
                size={18}
                className={`${done ? "text-violet-500" : "text-zinc-600"}`}
              />
              <p
                className={`text-sm truncate ${
                  done ? "text-zinc-400 line-through" : "text-white"
                }`}
              >
                {goal.title}
              </p>
            </li>
          );
        })}
      </ul>
      <h3 className="font-semibold text-white mt-4">Your week</h3>
    </div>
  );
}
