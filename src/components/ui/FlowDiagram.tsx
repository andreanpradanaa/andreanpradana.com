import { useId } from "react";
import type { Flow } from "@/content/projects";

type Props = { flow?: Flow; caption: string };

const NODE_W = 150;
const NODE_H = 56;
const GAP_X = 70;
const GAP_Y = 22;
const PAD = 8;

type Placed = { id: string; label: string; note?: string; level: number; row: number };
type Orientation = "horizontal" | "vertical";

/** Level = jalur terpanjang dari sumber (topologis); siklus diputus oleh batas iterasi. */
function layout(flow: Flow): { placed: Placed[]; levels: number; rows: number } {
  const level = new Map<string, number>(flow.nodes.map((n) => [n.id, 0]));
  for (let i = 0; i < flow.nodes.length; i++) {
    for (const e of flow.edges) {
      const next = (level.get(e.from) ?? 0) + 1;
      if (next > (level.get(e.to) ?? 0)) level.set(e.to, next);
    }
  }
  const rowAt = new Map<number, number>();
  const placed = flow.nodes.map((n) => {
    const lv = level.get(n.id) ?? 0;
    const row = rowAt.get(lv) ?? 0;
    rowAt.set(lv, row + 1);
    return { ...n, level: lv, row };
  });
  return {
    placed,
    levels: Math.max(...placed.map((p) => p.level)) + 1,
    rows: Math.max(...Array.from(rowAt.values())),
  };
}

function pos(p: Placed, o: Orientation) {
  return o === "horizontal"
    ? { x: p.level * (NODE_W + GAP_X), y: p.row * (NODE_H + GAP_Y) }
    : { x: p.row * (NODE_W + GAP_Y), y: p.level * (NODE_H + GAP_X * 0.6) };
}

type SvgProps = { flow: Flow; orientation: Orientation; idPrefix: string };

function Svg({ flow, orientation, idPrefix }: SvgProps) {
  const { placed, levels, rows } = layout(flow);
  const byId = new Map(placed.map((p) => [p.id, p]));
  const horizontal = orientation === "horizontal";
  const width = horizontal
    ? levels * NODE_W + (levels - 1) * GAP_X
    : rows * NODE_W + (rows - 1) * GAP_Y;
  const height = horizontal
    ? rows * NODE_H + (rows - 1) * GAP_Y
    : levels * NODE_H + (levels - 1) * GAP_X * 0.6;
  const marker = `${idPrefix}-arrow-${orientation}`;
  return (
    <svg
      viewBox={`${-PAD} ${-PAD} ${width + PAD * 2} ${height + PAD * 2}`}
      className="h-auto w-full"
      aria-hidden="true"
    >
      <defs>
        <marker
          id={marker}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 z" className="fill-muted" />
        </marker>
      </defs>
      {flow.edges.map((e, i) => {
        const a = byId.get(e.from);
        const b = byId.get(e.to);
        if (!a || !b) return null;
        const pa = pos(a, orientation);
        const pb = pos(b, orientation);
        const start = horizontal
          ? { x: pa.x + NODE_W, y: pa.y + NODE_H / 2 }
          : { x: pa.x + NODE_W / 2, y: pa.y + NODE_H };
        const end = horizontal
          ? { x: pb.x, y: pb.y + NODE_H / 2 }
          : { x: pb.x + NODE_W / 2, y: pb.y };
        const mid = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
        const d = horizontal
          ? `M${start.x} ${start.y} H${mid.x} V${end.y} H${end.x}`
          : `M${start.x} ${start.y} V${mid.y} H${end.x} V${end.y}`;
        return (
          <g key={`${i}-${e.from}-${e.to}`}>
            <path
              d={d}
              className="stroke-line fill-none"
              strokeWidth="1.4"
              markerEnd={`url(#${marker})`}
            />
            {e.label ? (
              <text
                x={mid.x}
                y={mid.y - 5}
                textAnchor="middle"
                className="fill-muted font-mono text-[9px]"
              >
                {e.label}
              </text>
            ) : null}
          </g>
        );
      })}
      {placed.map((p) => {
        const { x, y } = pos(p, orientation);
        return (
          <g key={p.id}>
            <rect
              x={x}
              y={y}
              width={NODE_W}
              height={NODE_H}
              rx="10"
              className="fill-surface stroke-ink/25"
              strokeWidth="1.2"
            />
            <text
              x={x + NODE_W / 2}
              y={y + (p.note ? 24 : 33)}
              textAnchor="middle"
              className="fill-ink font-mono text-[11px]"
            >
              {p.label}
            </text>
            {p.note ? (
              <text
                x={x + NODE_W / 2}
                y={y + 42}
                textAnchor="middle"
                className="fill-muted font-mono text-[9px]"
              >
                {p.note}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Diagram alur dari data: horizontal ≥ 768px, vertikal di bawahnya (dua SVG dekoratif).
 * Teks alternatif: daftar sr-only "A → B (label)". Tanpa `flow`, tidak merender apa pun.
 */
export function FlowDiagram({ flow, caption }: Props) {
  const id = useId();
  if (!flow || flow.nodes.length === 0) return null;
  const label = new Map(flow.nodes.map((n) => [n.id, n.label]));
  return (
    <figure
      aria-labelledby={`${id}-caption`}
      className="border-line bg-paper-2/40 rounded-xl border p-4 sm:p-6"
    >
      <div className="hidden md:block">
        <Svg flow={flow} orientation="horizontal" idPrefix={id} />
      </div>
      <div className="md:hidden">
        <Svg flow={flow} orientation="vertical" idPrefix={id} />
      </div>
      <figcaption id={`${id}-caption`} className="text-label text-muted mt-4 font-mono">
        {caption}
      </figcaption>
      <ol className="sr-only" aria-label="Flow, step by step">
        {flow.edges.map((e, i) => (
          <li key={`${i}-${e.from}-${e.to}`}>
            {label.get(e.from)} → {label.get(e.to)}
            {e.label ? ` (${e.label})` : ""}
          </li>
        ))}
      </ol>
    </figure>
  );
}
