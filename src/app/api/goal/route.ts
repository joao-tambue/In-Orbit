import { NextResponse } from "next/server";

export async function GET() {
  const data = typeof window === "undefined" ? [] : JSON.parse(localStorage.getItem("orbit_goals") || "[]");
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const goal = await req.json();
  const current = JSON.parse(localStorage.getItem("orbit_goals") || "[]");
  current.push(goal);
  localStorage.setItem("orbit_goals", JSON.stringify(current));
  return NextResponse.json(goal);
}