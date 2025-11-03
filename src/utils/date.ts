// src/utils/date.ts
export function getCurrentWeekRange() {
  const today = new Date();
  const day = today.getDay(); // 0 = Domingo
  // queremos Segunda como primeiro dia
  const diffToMonday = (day === 0 ? -6 : 1) - day;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const formatter = new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
  });

  const key = `${monday.toISOString().slice(0, 10)}_${sunday.toISOString().slice(0,10)}`;

  return {
    start: formatter.format(monday),
    end: formatter.format(sunday),
    key,
    monday,
    sunday,
  };
}