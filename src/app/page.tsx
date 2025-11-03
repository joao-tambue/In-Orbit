// src/app/page.tsx (ou src/pages/index.tsx conforme estrutura)
"use client";

import GoalFormDrawer from "@/components/goal-form-drawer";
import WeekHeader from "@/components/week-header";
import GoalProgressList from "@/components/goal-progress-list";
import WeekActivity from "@/components/week-activity";
import { useGoals } from "@/hooks/useGoals";
import { useWeeklyProgress } from "@/hooks/useWeeklyProgress";
import { useProgressSummary } from "@/hooks/useProgressSummary";
import { NavBar } from "@/components/nav-bar";
import Image from "next/image";
import { useState } from "react";
import startImg from "../../public/lets-start.png";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { goals, addGoal, removeGoal } = useGoals();
  const weekly = useWeeklyProgress(); // contém data, toggleProgress, undo, getCountForGoal
  const summary = useProgressSummary(goals, weekly.getCountForGoal);

  const hasGoals = goals.length > 0;

  return (
    <main className="text-white bg-zinc-950 min-h-screen p-6">
      <NavBar />
      <div className="max-w-[480px] mx-auto py-6">
        
        {!hasGoals ? (
          <div className="flex flex-col gap-8 justify-center items-center pt-8 pb-8">
            <Image src={startImg} alt="start" />
            <div className="flex flex-col gap-5 max-w-[340px] mx-auto w-full">
              <h1 className="text-center text-zinc-300">
                Vc ainda não cadastrou nenhuma meta, que tal cadastrar uma agora mesmo?
              </h1>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-violet-500 hover:bg-violet-600 transition-colors border-2 border-black rounded-lg px-4 py-2.5 flex items-center gap-2 justify-center max-w-[187px] mx-auto w-full"
              >
                Cadastrar meta
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* header com percent */}
            <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 max-w-[480px] mx-auto w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <div>
                    <p className="text-sm text-zinc-400">De {/* start */} a {/* end */}</p>
                    <h2 className="text-white text-lg font-semibold mt-1">Suas metas da semana</h2>
                  </div>
                </div>
                <button onClick={() => setIsOpen(true)} className="bg-violet-600 hover:bg-violet-700 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                  + Cadastrar meta
                </button>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full mt-3 border border-zinc-700">
                <div style={{ width: `${summary.percent}%` }} className="h-full bg-linear-to-r from-pink-500 to-violet-600"></div>
              </div>
              <p className="text-xs text-zinc-400 mb-2">
                Você completou <span className="text-white">{summary.done}</span> de <span className="text-white">{summary.total}</span> metas essa semana
              </p>
            </div>

            <GoalProgressList 
              goals={goals} 
              onToggle={weekly.toggleProgress} 
              onDelete={removeGoal}
              getCountForGoal={weekly.getCountForGoal} 
            />

            <WeekActivity goals={goals} />
          </>
        )}

        <GoalFormDrawer open={isOpen} onClose={() => setIsOpen(false)} onSave={addGoal} />
      </div>
    </main>
  );
}
