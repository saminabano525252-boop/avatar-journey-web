import { createFileRoute, Link } from "@tanstack/react-router";
import { Code2, Palette, Megaphone, ArrowRight } from "lucide-react";
import { AvatarGuide, type GuideStop } from "@/components/AvatarGuide";
import { Reveal } from "@/components/Reveal";
import { useAvatarChat } from "@/components/AvatarChatProvider";
import logo from "@/assets/saif-logo.png.asset.json";

const SITE = "https://avatar-journey-web.lovable.app";
const OG_IMAGE = `${SITE}${logo.url}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAIF Solutions — 3D Web, Graphic & Marketing Studio" },
      {
        name: "description",
        content:
          "SAIF Solutions builds interactive 3D websites, bold brand graphics and growth marketing — guided by our robot assistant.",
      },
      { property: "og:title", content: "SAIF Solutions — 3D Web, Graphic & Marketing Studio" },
      {
        property: "og:description",
        content: "Interactive 3D websites, brand graphics and growth marketing from SAIF Solutions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "SAIF Solutions",
          url: SITE,
          logo: OG_IMAGE,
          image: OG_IMAGE,
          description:
            "3D web development, graphic design and growth marketing studio.",
          areaServed: "Worldwide",
          email: "hello@saifsolutions.com",
          telephone: "+1-555-018-4420",
          makesOffer: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Solutions" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Graphic Solutions" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marketing Solutions" } },
          ],
        }),
      },
    ],
  }),
  component: Index,
});


const stops: GuideStop[] = [
  { id: "hero", line: "Welcome to SAIF Solutions. Scroll — I'll walk you through what we do.", side: "left" },
  { id: "web", line: "Web Solutions! 3D interactive sites and web apps, right this way.", side: "right" },
  { id: "graphic", line: "Graphic Solutions — chrome logos, 3D brand kits, motion design.", side: "left" },
  { id: "marketing", line: "Marketing Solutions: SEO, ads and funnels that actually convert.", side: "right" },
  { id: "cta", line: "Ready? Ping me in chat or hit the contact page.", side: "left" },
];

const services = [
  {
    id: "web",
    icon: Code2,
    title: "Web Solutions",
    tag: "01 / BUILD",
    copy: "Interactive 3D websites, web apps, e-commerce and dashboards engineered for speed and motion.",
    items: ["3D & motion sites", "Web apps & portals", "E-commerce", "Performance tuning"],
  },
  {
    id: "graphic",
    icon: Palette,
    title: "Graphic Solutions",
    tag: "02 / DESIGN",
    copy: "Chrome-grade logos, 3D brand systems, packaging and social kits that stop the scroll.",
    items: ["Logo & identity", "3D product visuals", "Packaging", "Social kits"],
  },
  {
    id: "marketing",
    icon: Megaphone,
    title: "Marketing Solutions",
    tag: "03 / GROW",
    copy: "SEO, paid media, content engines and analytics wired into one growth loop.",
    items: ["SEO", "Paid ads", "Content engine", "Funnel analytics"],
  },
];

function Index() {
  const { open } = useAvatarChat();

  return (
    <div className="relative">
      <AvatarGuide stops={stops} />

      <section id="hero" className="flex min-h-screen items-center px-6 pt-28">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
          <Reveal>
            <p className="font-display text-xs tracking-[0.4em] text-accent">SAIF SOLUTIONS</p>
            <h1 className="chrome-text mt-4 text-5xl leading-tight md:text-7xl">
              WE BUILD IN
              <br />
              3 DIMENSIONS
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Web, graphic and marketing solutions — engineered with motion, depth and a robot guide that
              walks you through every step.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={open}
                className="glow-ring rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:scale-105"
              >
                Chat with the avatar
              </button>
              <Link
                to="/portfolio"
                className="rounded-full border border-border px-6 py-3 font-semibold transition hover:bg-secondary"
              >
                See the work
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="tilt-3d relative mx-auto w-full max-w-md">
              <img
                src={logo.url}
                alt="SAIF Solutions chrome circuit logo"
                width={640}
                height={640}
                className="animate-float w-full object-contain mix-blend-screen drop-shadow-[0_0_60px_oklch(0.62_0.24_262/70%)]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className="flex min-h-screen items-center px-6 py-24">
          <div className="mx-auto w-full max-w-5xl">
            <Reveal>
              <p className="font-display text-xs tracking-[0.4em] text-accent">{s.tag}</p>
              <h2 className="chrome-text mt-3 text-4xl md:text-6xl">{s.title}</h2>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">{s.copy}</p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {s.items.map((item, j) => (
                <Reveal key={item} delay={j * 90}>
                  <div className="tilt-3d glass-card h-full rounded-2xl p-5">
                    <s.icon className="h-6 w-6 text-accent" />
                    <p className="font-display mt-4 text-base">{item}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {["Strategy", "Design", "Build", "Launch"][j % 4]} handled end to end.
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <button
                onClick={open}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-4"
              >
                Discuss {s.title.toLowerCase()} <ArrowRight className="h-4 w-4" />
              </button>
            </Reveal>
            <span className="sr-only">{i}</span>
          </div>
        </section>
      ))}

      <section id="cta" className="px-6 py-32">
        <Reveal>
          <div className="glass-card mx-auto max-w-3xl rounded-3xl p-10 text-center">
            <h2 className="chrome-text text-4xl">LET'S BUILD YOURS</h2>
            <p className="mt-4 text-muted-foreground">
              Tell the avatar what you need, or send a brief through the contact page.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={open}
                className="glow-ring rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:scale-105"
              >
                Chat now
              </button>
              <Link
                to="/contact"
                className="rounded-full border border-border px-6 py-3 font-semibold transition hover:bg-secondary"
              >
                Contact us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
