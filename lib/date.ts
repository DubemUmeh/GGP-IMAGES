export function todayUTCDateString(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

export function nowUTCTimeString(): string {
  return new Date().toISOString().slice(11, 16); // "HH:MM"
}
