"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Goal } from "@/types/goal";
import { v4 as uuidv4 } from "uuid";

export default function GoalFormDrawer({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (goal: Goal) => void;
}) {
  const options = [
    { label: "1x na semana", emoji: "🙂" },
    { label: "2x na semana", emoji: "😊" },
    { label: "3x na semana", emoji: "😎" },
    { label: "4x na semana", emoji: "💪" },
    { label: "Todos dias da semana", emoji: "🔥" },
  ];

  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState<string>("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!title || !selected) return alert("Preencha todos os campos!");
    const newGoal: Goal = {
      id: uuidv4(),
      title,
      frequency: selected,
      createdAt: new Date().toISOString(),
      completed: false,
    };
    onSave(newGoal);
    setTitle("");
    setSelected("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-end bg-black/40 backdrop-blur-sm z-50">
      <div className="max-w-[400px] w-full bg-zinc-950 h-full p-6 flex flex-col justify-between border-l border-zinc-800">
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-white">Cadastrar meta</h2>
            <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200">
              <X size={20} />
            </button>
          </div>

          <p className="text-zinc-400 text-sm mb-4">
            Adicione atividades que te fazem bem e que você quer continuar praticando toda semana.
          </p>

          <div className="flex flex-col gap-2 mb-6">
            <label className="text-sm text-zinc-300">Qual a atividade?</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Praticar exercícios, meditar, etc..."
              className="bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <label className="text-sm text-zinc-300 block mb-3">
            Quantas vezes na semana?
          </label>
          <div className="flex flex-col gap-2">
            {options.map((opt) => (
              <label
                key={opt.label}
                className={`flex justify-between items-center px-3 py-3 rounded-md cursor-pointer border transition-colors ${
                  selected === opt.label
                    ? "bg-pink-400/40 border-pink-600 backdrop-blur-sm bg-opacity-5"
                    : "bg-zinc-800 border-zinc-700 hover:border-gray-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="goal"
                    value={opt.label}
                    checked={selected === opt.label}
                    onChange={() => setSelected(opt.label)}
                    className="accent-pink-600"
                  />
                  <span className="text-sm text-white">{opt.label}</span>
                </div>
                <span>{opt.emoji}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-md py-2 hover:bg-zinc-700"
          >
            Fechar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-violet-600 hover:bg-violet-700 rounded-md py-2 text-white font-medium transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}