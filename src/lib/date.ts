export type ScoreboardDate = {
  year: string;
  segment: string;
  iso: string;
};

const DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

export function getPastNDates(days: number): ScoreboardDate[] {
  const today = new Date();
  const dates: ScoreboardDate[] = [];

  for (let offset = 0; offset < days; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    const iso = DATE_FORMATTER.format(date);
    const [year, month, day] = iso.split("-");
    dates.push({
      year,
      segment: `${month}-${day}`,
      iso
    });
  }

  return dates;
}
