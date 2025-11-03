// // src/components/week-header.tsx
// "use client";

// import { getCurrentWeekRange } from "@/utils/date";
// import { useWeeklyProgress } from "@/hooks/useWeeklyProgress";
// import { useProgressSummary } from "@/hooks/useProgressSummary";
// import { Goal } from "@/types/goal";

// export default function WeekHeader({ onNewGoal, goals }: { onNewGoal: () => void; goals: Goal[] }) {
//   const { start, end } = getCurrentWeekRange();
//   const { getCountForGoal } = useWeeklyProgress(); // vamos importar apenas a função getCountForGoal
//   // However useWeeklyProgress is stateful — to avoid duplicate localStor reads, we should lift it. 
//   // We'll instead expect parent to pass getCountForGoal. (see Home update abaixo)
//   return (
//     <div className="max-w-[480px] mx-auto mt-6 rounded-2xl bg-zinc-950 p-6 border border-zinc-800 shadow-sm">
//       <div className="flex items-center justify-between gap-4">
//         <div>
//           <p className="text-sm text-zinc-400">De {start} a {end}</p>
//           <h2 className="text-white text-lg font-semibold mt-1">Suas metas da semana</h2>
//         </div>
//         <button onClick={onNewGoal} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg">
//           + Cadastrar meta
//         </button>
//       </div>

//       {/* Barra de progresso (pai deve passar percent) */}
//     </div>
//   );
// }