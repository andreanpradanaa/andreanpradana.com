import { cn } from "@/lib/utils";

type Props = { className?: string };

const NODE = "fill-surface stroke-ink/20";
const LABEL = "fill-ink font-mono text-[11px]";
const SUB = "fill-muted font-mono text-[9px]";
const NOTE = "fill-muted font-mono text-[8px] hidden sm:inline";
const PATH = "fill-none stroke-line";
const FLOW = "flow fill-none stroke-accent";

/**
 * Diagram layanan dekoratif: edge → API (Go) → Postgres / Redis / queue, plus OTel.
 * Titik request mengalir di sepanjang jalur (animasi CSS, mati saat reduced-motion).
 */
export function SystemDiagram({ className }: Props) {
  return (
    <svg
      viewBox="0 0 560 420"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
      data-testid="system-diagram"
    >
      <g strokeWidth="1.2">
        <path className={PATH} d="M70 210 H170" />
        <path className={FLOW} d="M70 210 H170" strokeWidth="1.6" />
        <path className={PATH} d="M270 210 H350 V120 H400" />
        <path className={FLOW} d="M270 210 H350 V120 H400" strokeWidth="1.6" />
        <path className={PATH} d="M270 210 H350 V300 H400" />
        <path
          className={FLOW}
          d="M270 210 H350 V300 H400"
          strokeWidth="1.6"
          style={{ animationDelay: "1.2s" }}
        />
        <path className={PATH} d="M220 240 V340 H300" />
        <path
          className={FLOW}
          d="M220 240 V340 H300"
          strokeWidth="1.6"
          style={{ animationDelay: "0.6s" }}
        />
        <path className={PATH} d="M500 120 H520" />
      </g>
      <g>
        <rect className={NODE} x="20" y="186" width="50" height="48" rx="10" />
        <text className={LABEL} x="45" y="214" textAnchor="middle">
          edge
        </text>
        <rect className={NODE} x="170" y="180" width="100" height="60" rx="12" />
        <text className={LABEL} x="220" y="206" textAnchor="middle">
          api · go
        </text>
        <text className={SUB} x="220" y="224" textAnchor="middle">
          stateless · n replicas
        </text>
        <text className={NOTE} x="220" y="256" textAnchor="middle">
          Go — BRI · Lion Parcel · Icon Plus
        </text>
        <rect className={NODE} x="400" y="92" width="100" height="56" rx="12" />
        <text className={LABEL} x="450" y="116" textAnchor="middle">
          postgres
        </text>
        <text className={SUB} x="450" y="134" textAnchor="middle">
          primary + replica
        </text>
        <text className={NOTE} x="450" y="164" textAnchor="middle">
          PostgreSQL — Icon Plus
        </text>
        <rect className={NODE} x="400" y="272" width="100" height="56" rx="12" />
        <text className={LABEL} x="450" y="296" textAnchor="middle">
          redis
        </text>
        <text className={SUB} x="450" y="314" textAnchor="middle">
          cache · locks
        </text>
        <text className={NOTE} x="450" y="344" textAnchor="middle">
          cache · locks — Lion Parcel
        </text>
        <rect className={NODE} x="300" y="316" width="110" height="52" rx="12" />
        <text className={LABEL} x="355" y="338" textAnchor="middle">
          queue
        </text>
        <text className={SUB} x="355" y="356" textAnchor="middle">
          rabbitmq · workers
        </text>
        <text className={NOTE} x="355" y="386" textAnchor="middle">
          RabbitMQ — BRI
        </text>
        <rect className={NODE} x="520" y="100" width="36" height="40" rx="10" />
        <text className={SUB} x="538" y="124" textAnchor="middle">
          otel
        </text>
        <text className={NOTE} x="556" y="92" textAnchor="end">
          tracing — Icon Plus
        </text>
        <text className={SUB} x="20" y="40">
          request path · illustrative
        </text>
      </g>
    </svg>
  );
}
