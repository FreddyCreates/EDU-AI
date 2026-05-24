import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { u as useEngines } from "./use-engines-DqR-N7RV.js";
import { u as useSilverBuilders } from "./use-silver-builders-PlomfRhq.js";
import { Z as Zap, U as Users, k as Shield, w as Server, D as Database, c as cn } from "./index-BivnQ6bB.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
import "./router-D6GUppNf.js";
const AMBER = "oklch(0.75 0.16 70)";
const REGISTRIES = [
  {
    id: "ENGR",
    name: "Engine Registry",
    desc: "All engines across all substrates",
    entries: 18,
    status: "SEALED",
    icon: Zap
  },
  {
    id: "BLDR",
    name: "Builder Registry",
    desc: "All silver builder agents",
    entries: 8,
    status: "SEALED",
    icon: Users
  },
  {
    id: "PROT",
    name: "Protocol Registry",
    desc: "All LEX_ laws — sealed at ratification",
    entries: 11,
    status: "SEALED",
    icon: Shield
  },
  {
    id: "SDKR",
    name: "SDK Registry",
    desc: "All interfaces and entry points",
    entries: 34,
    status: "LIVE",
    icon: Server
  },
  {
    id: "BRDG",
    name: "Bridge Registry",
    desc: "All language bridges",
    entries: 5,
    status: "SEALED",
    icon: Database
  },
  {
    id: "RTME",
    name: "Runtime Registry",
    desc: "All substrates and runtimes",
    entries: 5,
    status: "LIVE",
    icon: Server
  },
  {
    id: "SUBJ",
    name: "Subject Registry",
    desc: "12 subjects · 36 weeks · K-12",
    entries: 156,
    status: "LIVE",
    icon: Database
  },
  {
    id: "STUD",
    name: "Student Registry",
    desc: "Passport hashes — auth-gated",
    entries: 406,
    status: "AUTH",
    icon: Lock
  }
];
function PrincipalRegistry() {
  const { engines } = useEngines();
  const { builders } = useSilverBuilders();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-[21px] space-y-[21px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Registry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "ALPH — All sovereign registries under one view" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "glass-portal-principal border-0 text-xs",
              style: { color: AMBER },
              children: "ALPH Sealed"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-[13px]", children: REGISTRIES.map((reg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        "data-ocid": `registry.entry.${i + 1}`,
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.07 },
        className: "glass-portal-principal rounded-xl p-5 space-y-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-9 w-9 rounded-lg flex items-center justify-center",
                  style: {
                    background: "rgba(255,185,0,0.1)",
                    border: "1px solid rgba(255,185,0,0.25)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(reg.icon, { className: "h-4 w-4", style: { color: AMBER } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-sm text-foreground", children: reg.id }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: cn(
                        "text-[9px] px-1.5 border-0",
                        reg.status === "SEALED" ? "bg-[rgba(255,185,0,0.15)] text-[oklch(0.75_0.16_70)]" : reg.status === "AUTH" ? "bg-[rgba(0,210,255,0.1)] text-[oklch(0.78_0.22_200)]" : "bg-[rgba(0,220,130,0.1)] text-[oklch(0.72_0.17_155)]"
                      ),
                      children: reg.status
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: reg.name })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-lg font-mono font-bold",
                style: { color: AMBER },
                "data-ocid": `registry.count.${reg.id.toLowerCase()}`,
                children: reg.id === "ENGR" ? (engines == null ? void 0 : engines.length) ?? reg.entries : reg.id === "BLDR" ? (builders == null ? void 0 : builders.length) ?? reg.entries : reg.entries
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: reg.desc })
        ]
      },
      reg.id
    )) })
  ] });
}
export {
  PrincipalRegistry as default
};
