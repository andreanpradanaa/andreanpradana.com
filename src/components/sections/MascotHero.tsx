import MascotPortfolioHero from "@/components/ui/mascot-portfolio-hero";
import { site } from "@/content/site";

/** Hero beranda: poster maskot 21st.dev diisi konten dan token warna situs. */
export function MascotHero() {
  const h = site.hero;
  return (
    <MascotPortfolioHero
      height="calc(100svh - var(--nav-h))"
      minHeight="440px"
      index={h.index}
      discipline={h.discipline}
      tagline={h.tagline}
      collection={h.collection}
      reel={h.reel}
      year={h.year}
      initials={h.initials}
      badge={h.badge}
      line2={h.line2}
      line3={h.line3}
      word={h.word}
      verticalTag={h.verticalTag}
      bracketed={h.bracketed}
      seekingLabel={h.seekingLabel}
      seeking={h.seeking}
      href="/contact"
      services={[...h.services]}
      greetings={[...h.greetings]}
      paper="var(--paper)"
      ink="var(--ink)"
      accent="var(--accent-soft)"
      displayFont="var(--font-archivo-black), 'Arial Black', Helvetica, Arial, sans-serif"
      sansFont="var(--font-geist-sans), system-ui, sans-serif"
    />
  );
}
