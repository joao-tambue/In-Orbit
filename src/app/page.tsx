"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import GoalFormDrawer from "@/components/goal-form-drawer";
import GoalProgressList from "@/components/goal-progress-list";
import WeekActivity from "@/components/week-activity";
import { useGoals } from "@/hooks/useGoals";
import { useWeeklyProgress } from "@/hooks/useWeeklyProgress";
import { useProgressSummary } from "@/hooks/useProgressSummary";
import { NavBar } from "@/components/nav-bar";
import { useNotifications } from "@/contexts/notification-context";
import startImg from "../../public/lets-start.png";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { goals, addGoal, removeGoal } = useGoals();
  const weekly = useWeeklyProgress();
  const summary = useProgressSummary(goals, weekly.getCountForGoal);
  const { addNotification } = useNotifications();

  const triggeredNotifications = useRef<Set<string>>(new Set());

  const hasGoals = goals.length > 0;

  // ✅ Adicionar meta + notificação
  const handleAddGoal = (goalData: any) => {
    addGoal(goalData);

    addNotification({
      title: "Nova meta adicionada 🎯",
      message: `A meta "${goalData.title || "Sem título"}" foi registrada com sucesso!`,
      type: "achievement",
    });
  };

  // 🔔 1. Notificação de meta com prazo próximo (vence amanhã)
  useEffect(() => {
    const now = new Date();

    goals.forEach((goal) => {
      if (!goal.deadline) return;

      const deadline = new Date(goal.deadline);
      const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1 && !triggeredNotifications.current.has(`reminder-${goal.id}`)) {
        addNotification({
          title: "Lembrete ⏰",
          message: `A meta "${goal.title}" vence amanhã!`,
          type: "reminder",
        });
        triggeredNotifications.current.add(`reminder-${goal.id}`);
      }
    });
  }, [goals, addNotification]);

  // 🏆 2. Notificação de conclusão de semana (100%)
  useEffect(() => {
    if (summary.percent === 100 && !triggeredNotifications.current.has("week-complete")) {
      addNotification({
        title: "Semana concluída 🎉",
        message: "Parabéns! Completaste 100% das tuas metas da semana! 🏆",
        type: "achievement",
      });
      triggeredNotifications.current.add("week-complete");
    }
  }, [summary.percent, addNotification]);

  // 💡 3. Notificação motivacional ao abrir o drawer
  const handleOpenForm = () => {
    setIsOpen(true);
    addNotification({
      title: "Nova meta 🎯",
      message: "Vai com tudo! Define uma meta poderosa e conquista teus objetivos!",
      type: "tip",
    });
  };

  return (
    <main className="text-white bg-zinc-950 min-h-screen p-6">
      <NavBar />
      <div className="max-w-[480px] mx-auto py-6">
        {!hasGoals ? (
          <div className="flex flex-col gap-8 justify-center items-center pt-8 pb-8">
            <Image src={startImg} alt="start" />
            <div className="flex flex-col gap-5 max-w-[340px] mx-auto w-full">
              <h1 className="text-center text-zinc-300">
                Você ainda não cadastrou nenhuma meta. Que tal começar agora mesmo?
              </h1>
              <button
                onClick={handleOpenForm}
                className="bg-violet-500 hover:bg-violet-600 transition-colors border-2 border-black rounded-lg px-4 py-2.5 flex items-center gap-2 justify-center max-w-[187px] mx-auto w-full"
              >
                Cadastrar meta
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 max-w-[480px] mx-auto w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <p className="text-sm text-zinc-400">De {/* start */} a {/* end */}</p>
                  <h2 className="text-white text-lg font-semibold mt-1">Suas metas da semana</h2>
                </div>
                <button
                  onClick={handleOpenForm}
                  className="bg-violet-600 hover:bg-violet-700 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  + Cadastrar meta
                </button>
              </div>

              <div className="w-full h-2 bg-zinc-800 rounded-full mt-3 border border-zinc-700">
                <div
                  style={{ width: `${summary.percent}%` }}
                  className="h-full bg-gradient-to-r from-pink-500 to-violet-600 rounded-full"
                ></div>
              </div>

              <p className="text-xs text-zinc-400 mb-2">
                Você completou <span className="text-white">{summary.done}</span> de{" "}
                <span className="text-white">{summary.total}</span> metas essa semana
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

        <GoalFormDrawer open={isOpen} onClose={() => setIsOpen(false)} onSave={handleAddGoal} />
      </div>
    </main>
  );
}
