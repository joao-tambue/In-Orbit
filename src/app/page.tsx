"use client";

import GoalFormDrawer from "@/components/goal-form-drawer";
import WeekHeader from "@/components/week-header";
import GoalProgressList from "@/components/goal-progress-list";
import { useGoals } from "@/hooks/useGoals";
import { NavBar } from "@/components/nav-bar";
import Image from "next/image";
import { useState } from "react";
import startImg from "../../public/lets-start.png";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { goals, addGoal } = useGoals();

  const hasGoals = goals.length > 0;

  return (
    <main className="text-white bg-zinc-950 h-svh">
      <NavBar />

      {!hasGoals ? (
        <div className="flex flex-col gap-8 justify-center items-center pt-[50px]">
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
          <WeekHeader onNewGoal={() => setIsOpen(true)} />
          <GoalProgressList goals={goals} />
        </>
      )}

      <GoalFormDrawer open={isOpen} onClose={() => setIsOpen(false)} onSave={addGoal} />
    </main>
  );
}
