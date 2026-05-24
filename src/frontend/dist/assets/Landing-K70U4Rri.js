import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { i as createLucideIcon, d as useInternetIdentity, G as GraduationCap, S as Skeleton, b as Star, a as Award, m as BrainCircuit, B as BookOpen, Z as Zap, U as Users, n as Building2, k as Shield, f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { a as useQuery } from "./query-8urnerR0.js";
import { L as Link } from "./router-D6GUppNf.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { S as Sparkles } from "./sparkles-C3IEEH24.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { M as Medal } from "./medal-D7d0qXZ7.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 12h-5", key: "r7krc0" }],
  ["path", { d: "M15 8h-5", key: "1khuty" }],
  ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4", key: "zz82l3" }],
  [
    "path",
    {
      d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
      key: "1ph1d7"
    }
  ]
];
const ScrollText = createLucideIcon("scroll-text", __iconNode);
function useVisionStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["vision-stats"],
    queryFn: async () => {
      if (!actor)
        return {
          totalStudentsFlagged: 0n,
          achievementsSealed: 0n,
          nominationsSent: 0n
        };
      return actor.getVisionStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 21e3
  });
}
const PORTAL_CARDS = [
  {
    key: "student",
    label: "Student Portal",
    desc: "Adaptive AI study companion, passport tracking, and personalized learning from K–12.",
    icon: GraduationCap,
    color: "oklch(0.78 0.22 200)",
    glassClass: "glass-portal-student",
    badge: "Mobile PWA",
    to: "/dashboard"
  },
  {
    key: "teacher",
    label: "Teacher Portal",
    desc: "Live class insights, AI lesson builder, grade vault, and adaptive recommendations.",
    icon: Users,
    color: "oklch(0.68 0.18 280)",
    glassClass: "glass-portal-teacher",
    badge: "Mobile PWA",
    to: "/teacher"
  },
  {
    key: "principal",
    label: "Principal Portal",
    desc: "School-wide live heatmap, grade drill-down, staff overview, and analytics.",
    icon: Building2,
    color: "oklch(0.75 0.16 70)",
    glassClass: "glass-portal-principal",
    badge: "Desktop + Mobile",
    to: "/principal"
  },
  {
    key: "it",
    label: "IT / Security Portal",
    desc: "Network monitoring, audit logs, APIX gateway, and engine health monitoring.",
    icon: Shield,
    color: "oklch(0.72 0.17 155)",
    glassClass: "glass-portal-it",
    badge: "Desktop + Mobile",
    to: "/it-security"
  }
];
const FEATURES = [
  {
    icon: Lock,
    title: "100% Sovereign",
    desc: "No external AI, no cloud dependencies. All intelligence lives inside the platform."
  },
  {
    icon: BrainCircuit,
    title: "PHI-Geometric Engines",
    desc: "Every reasoning chain, memory weight, and mastery score runs on Fibonacci mathematics."
  },
  {
    icon: ScrollText,
    title: "Student Passport",
    desc: "A permanent record that follows each student from kindergarten through graduation."
  },
  {
    icon: Medal,
    title: "RCGN — Recognition Engine",
    desc: "Surfaces exceptional performance automatically. No kid gets missed because a teacher didn't notice."
  },
  {
    icon: BookOpen,
    title: "Textbook Digester",
    desc: "Feed in full curriculum text — DIGT auto-generates concepts, quizzes, and grade-gated vaults."
  },
  {
    icon: Zap,
    title: "AUTON Autonomous Engine",
    desc: "Self-seeds new knowledge every 21 cycles without a student prompt. The system thinks on its own."
  }
];
function StatCard({
  value,
  label,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl px-4 py-5 flex flex-col items-center gap-1 animate-metric-breathe", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-3xl", style: { color }, children: value !== void 0 ? Number(value).toLocaleString() : "—" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground text-center leading-tight", children: label })
  ] });
}
function Landing() {
  const { login } = useInternetIdentity();
  const { data: stats, isLoading: statsLoading } = useVisionStats();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 glass-max border-b border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-5 h-14 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          "data-ocid": "landing.brand_link",
          className: "flex items-center gap-2.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-extrabold text-lg tracking-tight", children: [
              "Edu",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "AI" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#mission",
            "data-ocid": "landing.mission_link",
            className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: "Mission"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#portals",
            "data-ocid": "landing.portals_link",
            className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: "Portals"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/vision",
            "data-ocid": "landing.vision_link",
            className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: "Vision"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "ghost",
            size: "sm",
            "data-ocid": "landing.demo_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/demo", children: "Try Demo" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            "data-ocid": "landing.signin_button",
            onClick: () => login(),
            type: "button",
            children: "Sign In"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden",
        style: { minHeight: "88vh" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center opacity-20",
              style: {
                backgroundImage: "url('/assets/generated/eduai-hero.dim_1400x700.jpg')"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-5xl mx-auto px-5 pt-24 pb-16 flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, ease: "easeOut" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mb-6 glass-sm border-primary/30 text-primary px-4 py-1 text-xs font-semibold tracking-wider uppercase", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 mr-1.5" }),
                    "Sovereign AI Education Platform"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-black text-5xl md:text-7xl leading-none tracking-tight text-foreground mb-6", children: [
                    "Every child deserves ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "an AI" }),
                    " ",
                    "that sees them."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed", children: "EduAI is a fully sovereign, non-commercial intelligence platform for K–12. Built on Fibonacci mathematics. Owned by schools. Follows every student from kindergarten through graduation — for free, forever." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-3 justify-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "lg",
                        asChild: true,
                        "data-ocid": "landing.hero_demo_button",
                        className: "h-12 px-8 text-base font-semibold",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/demo", children: [
                          "Try the Demo",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-1.5 h-4 w-4" })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        size: "lg",
                        "data-ocid": "landing.hero_signin_button",
                        onClick: () => login(),
                        type: "button",
                        className: "h-12 px-8 text-base",
                        children: "Sign In to Your Portal"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.3 },
                className: "mt-16 grid grid-cols-3 gap-4 w-full max-w-lg",
                "data-ocid": "landing.stats_section",
                children: statsLoading ? [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-2xl" }, "skeleton-stat-a"),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-2xl" }, "skeleton-stat-b"),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-2xl" }, "skeleton-stat-c")
                ] : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      value: stats == null ? void 0 : stats.totalStudentsFlagged,
                      label: "Students Flagged",
                      color: "oklch(0.78 0.22 200)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      value: stats == null ? void 0 : stats.nominationsSent,
                      label: "Nominations Sent",
                      color: "oklch(0.75 0.16 70)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      value: stats == null ? void 0 : stats.achievementsSealed,
                      label: "Achievements Sealed",
                      color: "oklch(0.68 0.18 280)"
                    }
                  )
                ] })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "mission", className: "py-24 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-accent font-semibold", children: "Founding Story" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-black text-4xl md:text-5xl text-foreground mb-8 leading-tight", children: [
              "Alfredo Medina Hernandez",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Ferris High School, Texas." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: 0.1 },
            className: "glass rounded-2xl p-6 space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "National Recognition" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "NSHSS — National Society of High School Scholars" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Alfredo grew up in public schools — the forgotten ones, the ones without funding. He attended J.P. Starks Magnet School in Dallas, then Ferris High School in a district that ranked bottom 50% statewide for math." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
                "He scored",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "100 in geometry" }),
                " ",
                "two years in a row. His math teacher quietly submitted his name to a national program. A packet arrived. Everything was paid for — flights, hotel, the convention in Orlando. His name appeared in a national yearbook alongside ~10,000 students from every state."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
                "He never knew it was happening until it happened. One teacher. No system.",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "Just luck." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: 0.2 },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground mb-3", children: "The Gap" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Alfredo was completing lessons in 20 minutes while the class ran at a 90-minute pace. The system read that as rebellion. He spent days in ISS — and completed all his work anyway. The system had no escalation path for a student who finishes everything." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground mb-3", children: "The Mission" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
                  "EduAI is the system that makes recognition",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "automatic" }),
                  ", not accidental. The next kid from a forgotten school — Ferris, or anywhere like it — gets seen on day one. Not because a teacher remembered to submit a form. Because the platform already noticed."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 border border-primary/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2", children: "Scholarship offers received" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["UTA — Full Ride", "King's College NY", "Baylor $60K"].map(
                  (s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-xs glass-sm",
                      children: s
                    },
                    s
                  )
                ) })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: 0.3 },
          className: "mt-6 glass-lg rounded-2xl p-6 border border-primary/15 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base md:text-lg text-foreground font-medium leading-relaxed max-w-3xl mx-auto", children: [
              `"I just wanna win. I just wanna know what it's like to be one of the greats. But more than that —`,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold", children: "I want every kid from everywhere to have the chance I almost didn't." }),
              '"'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3 uppercase tracking-widest", children: "— Alfredo Medina Hernandez, Founder of EduAI" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-4xl text-foreground mb-4", children: "Platform Intelligence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Everything sovereign. Everything native. Nothing rented." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: FEATURES.map((f, i) => {
        const Icon = f.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.4, delay: i * 0.08 },
            className: "glass rounded-2xl p-5 hover:border-primary/20 transition-smooth glass-shimmer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm mb-2", children: f.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: f.desc })
            ]
          },
          f.title
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "portals", className: "py-24 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-4xl text-foreground mb-4", children: "Four Sovereign Portals" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Each role gets its own purpose-built interface, AI persona, and data access level." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: PORTAL_CARDS.map((p, i) => {
        const Icon = p.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.4, delay: i * 0.1 },
            "data-ocid": `landing.portal_card.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: p.to,
                className: `block rounded-2xl p-6 ${p.glassClass} hover:scale-[1.02] transition-smooth`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-10 w-10 rounded-xl flex items-center justify-center",
                        style: {
                          background: `${p.color.replace("oklch(", "oklch(").replace(")", " / 0.12)")}`,
                          border: `1px solid ${p.color.replace(")", " / 0.3)")}`
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5", style: { color: p.color } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "text-[10px] glass-sm",
                        children: p.badge
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground mb-2", children: p.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: p.desc }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "mt-4 flex items-center gap-1 text-xs font-medium",
                      style: { color: p.color },
                      children: [
                        "Enter Portal ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
                      ]
                    }
                  )
                ]
              }
            )
          },
          p.key
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-lg rounded-3xl p-10 border border-primary/15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-8 w-8 text-primary mx-auto mb-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl text-foreground mb-4", children: "Read the Sovereign Vision" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "The founding story, the technical architecture, the impact case, and the funding strategy — all generated by EduAI's own intelligence engines." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", asChild: true, "data-ocid": "landing.vision_cta_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vision", children: [
              "Read the Vision ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-1.5 h-4 w-4" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "lg",
                asChild: true,
                "data-ocid": "landing.demo_cta_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/demo", children: "Try Demo First" })
              }
            )
          ] })
        ] })
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-white/5 glass-xl py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3.5 w-3.5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-sm", children: [
          "Edu",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "AI" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-2", children: "Sovereign Platform — LEX_SOVEREIGNUS enforced" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/50 text-center", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
            className: "hover:text-muted-foreground transition-colors",
            target: "_blank",
            rel: "noopener noreferrer",
            children: "caffeine.ai"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Landing as default
};
