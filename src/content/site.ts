/**
 * Data profil situs. Satu sumber untuk semua section. Sumber: CV Oktober 2026.
 */
export const site = {
  name: "Andrean Pradana",
  role: "Backend Engineer",
  url: "https://andreanpradana.com",
  location: "Jakarta, Indonesia",
  currently: { label: "Currently at Icon Plus", href: "https://www.plniconplus.co.id" },
  title: "Andrean Pradana — Backend Engineer",
  description:
    "Backend engineer in Jakarta with three years across banking, logistics and digital payments, building distributed systems in Go.",
  headline:
    "Backend engineer building the systems that move money between banks, wallets and billers.",
  intro: [
    "Three years in Go across banking, logistics and digital payments: interbank settlement at BRI, shipment and payment services at Lion Parcel, and now payment-gateway integrations at Icon Plus. Most of my day is spent making boundaries explicit, failure modes honest, and services easy to operate when something breaks at 3 a.m.",
  ],
  about: [
    "I started on the backend side in 2021 and have stayed there. I like problems where the hard part is not the feature but the guarantees around it: idempotency, retries that do not double-charge, migrations that can be rolled back, logs that actually tell you what happened. The numbers I am proudest of are operational ones: fewer incidents, cheaper queries, and test coverage that went from nothing to something you can rely on.",
    "Outside work I write and build study material for system design, mostly in Indonesian, because good free resources in that language are still rare.",
  ],
  focus: [
    "Payment and settlement flows",
    "Partner and gateway integrations",
    "Concurrency, queues and idempotency",
    "Observability and operability",
  ],
  education: {
    school: "Universitas Sriwijaya",
    degree: "B.Sc. Computer Science, cum laude",
    period: "2019–2023",
  },
  training: {
    org: "GoTo Impact Foundation, Generasi GIGIH",
    label: "Backend Engineering Program",
    period: "2022",
  },
  email: "andreanpradana2001@gmail.com",
  social: [
    { label: "GitHub", href: "https://github.com/andreanpradanaa" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/andreanpradanaa" },
  ],
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  sourceUrl: "https://github.com/andreanpradanaa/andreanpradana.com",
} as const;

export type SocialLink = (typeof site.social)[number];
