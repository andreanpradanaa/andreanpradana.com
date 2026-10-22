"use client";

import { useSyncExternalStore } from "react";

type Props = { timeZone: string; label: string };

const MINUTE = 60_000;

function format(timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

/** Ticker per menit sebagai external store; snapshot server `null` agar hidrasi aman. */
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, MINUTE);
  return () => clearInterval(id);
}

/** Jam lokal yang hidup, diperbarui tiap menit. */
export function LocalTime({ timeZone, label }: Props) {
  const time = useSyncExternalStore(
    subscribe,
    () => format(timeZone),
    () => null,
  );
  return (
    <span className="tnum">
      {label} · {time ?? "--:--"}
    </span>
  );
}
