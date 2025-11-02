// src/utils/date.ts
export function getCurrentWeekRange() {
  const now = new Date();
  const firstDay = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Segunda
  const lastDay = new Date(firstDay);
  lastDay.setDate(firstDay.getDate() + 6);

  const formatter = new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
  });

  return {
    start: formatter.format(firstDay),
    end: formatter.format(lastDay),
    key: `${firstDay.toISOString().slice(0, 10)}_${lastDay
      .toISOString()
      .slice(0, 10)}`,
  };
}