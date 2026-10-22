export type Experience = {
  role: string;
  org: string;
  href?: string;
  start: string;
  end?: string;
  summary: string;
  /** Satu kalimat bukti ≤ 60 karakter; angka wajib kata demi kata dari `summary`. */
  highlight?: string;
};

/** Riwayat pengalaman dari CV (Oktober 2026), terbaru di atas. */
export const experience: Experience[] = [
  {
    role: "Backend Engineer",
    org: "Icon Plus",
    href: "https://www.plniconplus.co.id",
    start: "2026",
    summary:
      "Core and integration microservices for the UltraVoucher programme in Go, gRPC and PostgreSQL. Integrated the BillPay and Midtrans GoPay payment gateways with request signing and callback verification, added OpenTelemetry tracing across services, and built the transactional email service.",
    highlight: "OpenTelemetry tracing across services; payment gateways",
  },
  {
    role: "Backend Engineer",
    org: "Lion Parcel",
    href: "https://lionparcel.com",
    start: "2024",
    end: "2025",
    summary:
      "Owned reliability of booking, shipment and payment services. Cut production incidents by 42% in two quarters, sped up critical shipment APIs by up to 85% and reduced query cost by up to 98% through indexing and refactoring, introduced Redis caching and distributed locks, and led the feature-flag migration from CloudBees to Unleash.",
    highlight: "Incidents down 42% in two quarters; APIs up to 85% faster",
  },
  {
    role: "Backend Developer",
    org: "Bank Rakyat Indonesia",
    href: "https://bri.co.id",
    start: "2023",
    end: "2024",
    summary:
      "Go microservices for RTGS interbank transfers used by teller systems. gRPC and REST services, RabbitMQ for asynchronous flows, Redis caching, Docker, and MySQL tuning. Took automated test coverage from zero to above 80%.",
    highlight: "Test coverage from zero to above 80%; RabbitMQ async flows",
  },
  {
    role: "Backend Developer Intern",
    org: "PT Inti Konten Indonesia",
    start: "2021",
    summary:
      "REST services in Node.js and Express with JWT authentication, MVC structure, validation and error handling.",
    end: "2021",
  },
];
