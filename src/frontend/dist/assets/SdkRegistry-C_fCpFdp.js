import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { i as createLucideIcon, f as useActor, h as createActor, Z as Zap, S as Skeleton } from "./index-BivnQ6bB.js";
import { a as useQuery } from "./query-8urnerR0.js";
import { A as ArrowRight } from "./arrow-right-CsqnM8Ko.js";
import { C as ChevronDown } from "./chevron-down-B2BSsDRF.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import "./motion-BK2wxCtX.js";
import "./router-D6GUppNf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
];
const CodeXml = createLucideIcon("code-xml", __iconNode);
const STATIC_SDK_ENTRIES = [
  {
    id: "sdk-skai-docens",
    name: "EduAI Teaching Interface",
    version: "1.0.0",
    description: "The sovereign teacher interface. Routes students to the right learning engine based on what they want to create, not just what they want to study. Every session produces an artifact.",
    category: "teaching",
    accessProtocol: "NEXUM-GATE",
    entryPoints: [
      "skaiTeach(studentIntent)",
      "skaiRoute(intent, engineId, summary)",
      "getSkaiDocensInfo()"
    ],
    status: "active"
  },
  {
    id: "sdk-passport",
    name: "Student Passport",
    version: "1.0.0",
    description: "Sovereign on-chain passport system. Every session is compressed into a kernel seed and sealed permanently to the student. No session is ever lost — the passport compounds across a lifetime of learning.",
    category: "passport",
    accessProtocol: "LEX_MEMORIA",
    entryPoints: [
      "createSovereignPassport(name, grade, collegium)",
      "getSovereignPassport()",
      "sealKernelSeed(seed)",
      "getKernelSeeds()"
    ],
    status: "active"
  },
  {
    id: "sdk-engine-query",
    name: "Engine Query Interface",
    version: "1.0.0",
    description: "Direct access to all 8 sovereign learning engines. Each engine uses pure math and geometry functions to produce deterministic, sovereign intelligence. No external services — all processing lives inside the platform.",
    category: "interaction",
    accessProtocol: "ENGINE-DISPATCH",
    entryPoints: [
      "queryEngine(engineId, input, context)",
      "queryEngineWithPassport(engineId, input, context)",
      "getEngines()",
      "getEngineById(id)"
    ],
    status: "active"
  },
  {
    id: "sdk-registry",
    name: "Registry Access",
    version: "1.0.0",
    description: "Read and query all sovereign registries — laws, agents, engines, SDK entries. The registry layer is the permanent directory of everything that operates inside the platform.",
    category: "registry",
    accessProtocol: "REGISTRY-PROTOCOL",
    entryPoints: [
      "getLaws()",
      "getAgents()",
      "getEngines()",
      "getSdkEntries()",
      "getSdkEntriesByCategory(cat)"
    ],
    status: "active"
  },
  {
    id: "sdk-collegium",
    name: "Collegium Entry",
    version: "1.0.0",
    description: "The college enrollment layer. Students enter through NEXUM-GATE, are assigned to a collegium, and begin building their sovereign learning path. Three public tracks are available with no docking required.",
    category: "collegium",
    accessProtocol: "LEX_ADOPTIO",
    entryPoints: [
      "enterNexumGate(collegium, timestamp)",
      "getTracks()",
      "enrollInTrack(trackId, timestamp)",
      "advanceTrackStep(trackId, artifact, timestamp)"
    ],
    status: "active"
  },
  {
    id: "sdk-curriculum",
    name: "Curriculum & Subjects",
    version: "1.0.0",
    description: "Full K–12 curriculum surface. Subjects and topics are preloaded for every grade level with TEKS alignment. Students query by grade and subject — the engine handles the rest.",
    category: "curriculum",
    accessProtocol: "CURRICULUM-PROTOCOL",
    entryPoints: [
      "getSubjectsByGrade(gradeLevel)",
      "getTopicsBySubject(subjectId)",
      "getTrackById(id)"
    ],
    status: "active"
  }
];
function useSdkEntries() {
  const { actor, isFetching } = useActor(createActor);
  const query = useQuery({
    queryKey: ["sdk-entries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSdkEntries();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 60
  });
  return {
    entries: query.data ?? [],
    isLoading: query.isLoading || isFetching,
    isError: query.isError
  };
}
const BRIDGES = [
  {
    id: "PONT",
    from: "ICPM",
    to: "JLIA",
    dir: "Bidirectional",
    desc: "Master Math Bridge — ICPM↔JLIA. PHI/Fibonacci computation hand-off."
  },
  {
    id: "MRDM",
    from: "ICPM",
    to: "EMRT",
    dir: "Bidirectional",
    desc: "Memory Bridge — state ops to EMRT memory zones. Append-only on EMRT side."
  },
  {
    id: "AXON",
    from: "EART",
    to: "ICPM",
    dir: "Unidirectional",
    desc: "Autonomous Output — EART engines inject into ICPM pipeline. Fire and deliver."
  },
  {
    id: "CRUX",
    from: "JLIA",
    to: "EMRT",
    dir: "Unidirectional",
    desc: "Floor Write — FLOR-computed values written directly to EMRT zones."
  },
  {
    id: "NXUS",
    from: "ALL",
    to: "RGST",
    dir: "Write-only relay",
    desc: "Stats Relay — every substrate reports live stats to Registry. Read-only back."
  }
];
const CATEGORY_COLORS = {
  teaching: {
    border: "rgba(0,210,255,0.22)",
    chip: "rgba(0,210,255,0.08)",
    text: "oklch(0.78 0.22 200)"
  },
  interaction: {
    border: "rgba(160,100,255,0.22)",
    chip: "rgba(160,100,255,0.08)",
    text: "oklch(0.68 0.18 280)"
  },
  passport: {
    border: "rgba(255,185,0,0.22)",
    chip: "rgba(255,185,0,0.08)",
    text: "oklch(0.75 0.16 70)"
  },
  registry: {
    border: "rgba(0,220,130,0.22)",
    chip: "rgba(0,220,130,0.08)",
    text: "oklch(0.72 0.17 155)"
  },
  collegium: {
    border: "rgba(220,100,100,0.22)",
    chip: "rgba(220,100,100,0.08)",
    text: "oklch(0.65 0.18 22)"
  },
  curriculum: {
    border: "rgba(0,210,255,0.22)",
    chip: "rgba(0,210,255,0.08)",
    text: "oklch(0.78 0.22 200)"
  }
};
const DEFAULT_COLORS = {
  border: "rgba(120,120,150,0.2)",
  chip: "rgba(120,120,150,0.06)",
  text: "oklch(0.55 0.01 260)"
};
function catStyle(cat) {
  return CATEGORY_COLORS[cat.toLowerCase()] ?? DEFAULT_COLORS;
}
function SdkRow({ entry, index }) {
  const [open, setOpen] = reactExports.useState(false);
  const cs = catStyle(entry.category);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `sdk_registry.sdk_card.${index + 1}`,
      className: "glass-sm rounded-2xl overflow-hidden transition-glass",
      style: { borderColor: cs.border },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((o) => !o),
            className: "w-full flex items-center gap-3 px-5 py-4 text-left touch-target",
            "data-ocid": `sdk_registry.sdk_toggle.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-xs font-bold tracking-wider shrink-0 px-2 py-0.5 rounded-lg",
                  style: {
                    background: cs.chip,
                    color: cs.text,
                    border: `1px solid ${cs.border}`
                  },
                  children: entry.accessProtocol
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 min-w-0 font-display font-semibold text-sm text-foreground truncate", children: entry.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:block text-[10px] font-mono text-muted-foreground shrink-0", children: [
                entry.entryPoints.length,
                " endpoints"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-[10px] font-mono shrink-0",
                  style: { color: cs.text },
                  children: [
                    "v",
                    entry.version
                  ]
                }
              ),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground shrink-0" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-5 pb-5 space-y-4",
            "data-ocid": `sdk_registry.sdk_detail.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: entry.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground", children: "Entry Points" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: entry.entryPoints.map((ep) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "code",
                  {
                    className: "text-xs font-mono px-2.5 py-1 rounded-lg",
                    style: {
                      background: cs.chip,
                      color: cs.text,
                      border: `1px solid ${cs.border}`
                    },
                    children: ep
                  },
                  ep
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Status:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono", style: { color: cs.text }, children: entry.status }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground ml-auto", children: [
                  "Category: ",
                  entry.category
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function BridgeCard({
  bridge,
  index
}) {
  const isBi = bridge.dir === "Bidirectional";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `sdk_registry.bridge_card.${index + 1}`,
      className: "glass-sm rounded-2xl p-5 space-y-3 transition-glass glass-shimmer",
      style: {
        borderColor: "rgba(0,220,130,0.2)",
        boxShadow: "0 4px 24px rgba(0,220,130,0.06)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono text-sm font-black tracking-widest px-3 py-1 rounded-lg",
              style: {
                background: "rgba(0,220,130,0.08)",
                color: "oklch(0.72 0.17 155)",
                border: "1px solid rgba(0,220,130,0.2)"
              },
              children: bridge.id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-mono text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.78 0.22 200)" }, children: bridge.from }),
            isBi ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.55 0.01 260)" }, children: "⇄" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              ArrowRight,
              {
                className: "w-3 h-3",
                style: { color: "oklch(0.55 0.01 260)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.72 0.17 155)" }, children: bridge.to })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "ml-auto text-[10px] font-mono px-2 py-0.5 rounded-md",
              style: {
                background: isBi ? "rgba(0,210,255,0.06)" : "rgba(255,185,0,0.06)",
                color: isBi ? "oklch(0.78 0.22 200)" : "oklch(0.75 0.16 70)",
                border: `1px solid ${isBi ? "rgba(0,210,255,0.2)" : "rgba(255,185,0,0.2)"}`
              },
              children: bridge.dir
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: bridge.desc })
      ]
    }
  );
}
function SdkRegistry() {
  const { entries, isLoading } = useSdkEntries();
  const [tab, setTab] = reactExports.useState("endpoints");
  const displayEntries = entries.length > 0 ? entries : STATIC_SDK_ENTRIES;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 py-10 space-y-8",
      "data-ocid": "sdk_registry.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-xl rounded-3xl p-8 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(160,100,255,0.12) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-xl flex items-center justify-center",
                  style: {
                    background: "rgba(160,100,255,0.12)",
                    border: "1px solid rgba(160,100,255,0.25)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CodeXml,
                    {
                      className: "w-5 h-5",
                      style: { color: "oklch(0.68 0.18 280)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase", children: "EduAI · SDKR" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-black tracking-tight text-foreground", children: "SDK REGISTRY" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-mono px-2 py-0.5 rounded",
                      style: {
                        background: "rgba(160,100,255,0.1)",
                        color: "oklch(0.68 0.18 280)",
                        border: "1px solid rgba(160,100,255,0.2)"
                      },
                      children: "SOVEREIGN"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
              {
                label: "SDK Modules",
                value: displayEntries.length,
                color: "oklch(0.68 0.18 280)"
              },
              {
                label: "Bridges",
                value: BRIDGES.length,
                color: "oklch(0.72 0.17 155)"
              },
              {
                label: "Status",
                value: "Active",
                color: "oklch(0.72 0.17 155)"
              },
              { label: "Access", value: "Free", color: "oklch(0.75 0.16 70)" }
            ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-sm rounded-xl px-3 py-2.5 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-lg font-black font-display",
                      style: { color },
                      children: value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5", children: label })
                ]
              },
              label
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "glass-sm rounded-2xl p-1.5 flex gap-1.5",
            style: { borderColor: "rgba(160,100,255,0.15)" },
            role: "tablist",
            "aria-label": "SDK sections",
            "data-ocid": "sdk_registry.filter_tabs",
            children: ["endpoints", "bridges"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": tab === t,
                onClick: () => setTab(t),
                "data-ocid": `sdk_registry.filter.${t}_tab`,
                className: "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-glass touch-target",
                style: tab === t ? {
                  background: "rgba(160,100,255,0.15)",
                  color: "oklch(0.68 0.18 280)",
                  border: "1px solid rgba(160,100,255,0.25)"
                } : {
                  background: "transparent",
                  color: "oklch(0.55 0.01 260)",
                  border: "1px solid transparent"
                },
                children: [
                  t === "endpoints" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" }),
                  t === "endpoints" ? "API Endpoints" : "Language Bridges"
                ]
              },
              t
            ))
          }
        ),
        tab === "endpoints" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "sdk_registry.entries_section", children: isLoading && entries.length === 0 ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-2xl" }, `skel-${i + 1}`)) : displayEntries.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(SdkRow, { entry, index: idx }, entry.id)) }),
        tab === "bridges" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "sdk_registry.bridges_section", children: BRIDGES.map((bridge, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(BridgeCard, { bridge, index: idx }, bridge.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-sm rounded-2xl px-5 py-4 flex items-center gap-3",
            style: { borderColor: "rgba(160,100,255,0.15)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CodeXml,
                {
                  className: "w-4 h-4 shrink-0",
                  style: { color: "oklch(0.68 0.18 280)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.68 0.18 280)" }, children: "LEX_PONT" }),
                " · All bridges sovereign and native. No bridge calls a commercial runtime."
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  SdkRegistry as default
};
