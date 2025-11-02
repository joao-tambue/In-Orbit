"use client";

import { getCurrentWeekRange } from "@/utils/date";

export default function WeekHeader({ onNewGoal }: { onNewGoal: () => void }) {
  const { start, end } = getCurrentWeekRange();

  return (
    <div className="flex justify-between items-center max-w-md mx-auto mt-8">
      <div>
        <p className="text-sm text-zinc-500">De {start} a {end}</p>
        <h2 className="text-lg font-semibold text-white">Suas metas da semana</h2>
      </div>
      <button
        onClick={onNewGoal}
        className="bg-violet-600 hover:bg-violet-700 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
      >
        + Cadastrar meta
      </button>
    </div>
  );
}