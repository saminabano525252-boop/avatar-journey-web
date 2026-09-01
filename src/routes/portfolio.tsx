import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AvatarGuide, type GuideStop } from "@/components/AvatarGuide";
import { useAvatarChat } from "@/components/AvatarChatProvider";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — SAIF Solutions 3D Web, Brand & Growth Work" },
      {
        name: "description",
        content:
          "Selected SAIF Solutions projects across 3D web builds, brand identity systems and performance marketing campaigns.",
      },
      { property: "og:title", content: "Portfolio — SAIF Solutions" },
      {
        property: "og:description",
        content: "3D web builds, brand identity systems and growth marketing campaigns by SAIF Solutions.",
      },
    ],
  }),
  component: Portfolio,
});

const stops: GuideStop[] = [
  { id: "work-web", line: "Web builds first — tap any card for the full case.", side: "right" },
  { id: "work-graphic", line: "Now the graphic work: identities and 3D visuals.", side: "left" },
  { id: "work-marketing", line: "And the marketing campaigns with real numbers.", side: "right" },
];

type Project = { title: string; category: string; result: string; detail: string };

const groups: { id: string; label: string; projects: Project[] }[] = [
  {
    id: "work-web",
    label: "Web Solutions",
    projects: [
      {
        title: "Nova Commerce",
        category: "3D storefront",
        result: "+38% conversion",
        detail:
          "A WebGL-flavoured storefront with scroll-driven product reveals, instant search and a checkout rebuilt for speed.",
      },
      {
        title: "Orbit Dashboard",
        category: "Web app",
        result: "12k daily users",
        detail: "Realtime analytics console with role-based access, live charts and offline-tolerant sync.",
      },
      {
        title: "Helix Landing",
        category: "Motion site",
        result: "1.2s LCP",
        detail: "A single-page launch site built on layered parallax and animated circuit lines.",
      },
    ],
  },
  {
    id: "work-graphic",
    label: "Graphic Solutions",
    projects: [
      {
        title: "Chrome Identity",
        category: "Brand system",
        result: "Full rebrand",
        detail: "3D chrome wordmark, motion logo, color system and a 60-page brand book.",
      },
      {
        title: "Volt Packaging",
        category: "Packaging",
        result: "Retail rollout",
        detail: "Holographic packaging line with structural mockups and shelf-ready print files.",
      },
      {
        title: "Pulse Social Kit",
        category: "Motion graphics",
        result: "200+ assets",
        detail: "Animated templates for every channel, delivered as an editable design system.",
      },
    ],
  },
  {
    id: "work-marketing",
    label: "Marketing Solutions",
    projects: [
      {
        title: "Ascend SEO",
        category: "Organic growth",
        result: "4x traffic",
        detail: "Technical fixes, topical clusters and digital PR over a six-month sprint.",
      },
      {
        title: "Flux Ads",
        category: "Paid media",
        result: "2.7x ROAS",
        detail: "Creative testing engine across paid social and search with weekly iteration.",
      },
      {
        title: "Signal Funnel",
        category: "Lifecycle",
        result: "-31% CAC",
        detail: "Lifecycle email, onboarding flows and attribution wired into one dashboard.",
      },
    ],
  },
];

function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);
  const { open } = useAvatarChat();

  return (
    <div className="px-6 pb-32 pt-32">
      <AvatarGuide stops={stops} />

      <Reveal>
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-display text-xs tracking-[0.4em] text-accent">PORTFOLIO</p>
          <h1 className="chrome-text mt-4 text-5xl md:text-6xl">SELECTED WORK</h1>
        </div>
      </Reveal>

      {groups.map((g) => (
        <section key={g.id} id={g.id} className="mx-auto mt-20 max-w-6xl">
          <Reveal>
            <h2 className="font-display text-2xl text-accent">{g.label}</h2>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {g.projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <button
                  onClick={() => setActive(p)}
                  className="tilt-3d glass-card h-full w-full rounded-2xl p-6 text-left"
                >
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.category}</p>
                  <p className="font-display mt-3 text-xl">{p.title}</p>
                  <p className="mt-4 text-sm text-accent">{p.result}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-6 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="animate-pop-3d glass-card relative w-full max-w-lg rounded-3xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{active.category}</p>
            <h3 className="chrome-text mt-2 text-3xl">{active.title}</h3>
            <p className="mt-4 text-muted-foreground">{active.detail}</p>
            <p className="font-display mt-6 text-accent">{active.result}</p>
            <button
              onClick={() => {
                setActive(null);
                open();
              }}
              className="glow-ring mt-8 rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground transition hover:scale-105"
            >
              Ask the avatar about this
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
