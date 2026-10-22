/** Garis tangan di bawah kata, "digambar" saat muncul. Dekoratif. */
export function Swash() {
  return (
    <svg
      viewBox="0 0 200 24"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-1 left-0 h-[0.28em] w-full overflow-visible"
      aria-hidden="true"
    >
      <path
        pathLength={1}
        d="M3 16 C40 6 110 2 196 10 C150 14 90 20 20 21"
        className="draw stroke-accent fill-none"
        strokeWidth="2.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
