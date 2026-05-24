import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { d as useInternetIdentity, U as Users, S as Skeleton, a as Award, j as Send, u as ue, N as NominationStatus } from "./index-BivnQ6bB.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-B3hkAdZ4.js";
import { L as Label } from "./label-CpNG7Eze.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CPBO6QhB.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-UfjkpTob.js";
import { T as Textarea } from "./textarea-B0lupW8l.js";
import { c as useAllRecognitionFlags, d as useNominations, e as useSubmitNomination } from "./use-recognition-CcUiZsvr.js";
import { L as Link } from "./router-D6GUppNf.js";
import { C as ChevronLeft } from "./chevron-left-pbzTE56t.js";
import { m as motion, A as AnimatePresence } from "./motion-BK2wxCtX.js";
import { T as Trophy } from "./trophy-WhoS-b_2.js";
import { C as Clock } from "./clock-DmeOF2sv.js";
import { C as CircleCheckBig } from "./circle-check-big-DngI0fNm.js";
import { F as FileText } from "./file-text-BbUEM46N.js";
import "./query-8urnerR0.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./index-Dla_9Jug.js";
import "./index-BXiroDnN.js";
import "./index-D7KnjD29.js";
import "./index-DD4zw4TC.js";
import "./index-BfPMFYr5.js";
import "./index-Dc3cfdi4.js";
import "./index-DstPCoQp.js";
import "./chevron-down-B2BSsDRF.js";
import "./chevron-up-BZKIp_lu.js";
const PROGRAMS = ["NSHSS", "UIL", "AMC", "JSHS"];
const STATUS_CONFIG = {
  [NominationStatus.submitted]: {
    label: "Submitted",
    color: "text-sky-300",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10"
  },
  [NominationStatus.confirmed]: {
    label: "Confirmed",
    color: "text-emerald-300",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10"
  },
  [NominationStatus.draft]: {
    label: "Draft",
    color: "text-amber-300",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10"
  }
};
function NominationHistoryList({
  nominations
}) {
  if (nominations.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "nominations.history.empty_state",
        className: "glass rounded-2xl p-8 flex flex-col items-center gap-3 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: "📋" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-white/60", children: "No nominations submitted yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/30", children: "Nominations you submit will appear here." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: nominations.map((nom, i) => {
    const statusCfg = STATUS_CONFIG[nom.status] ?? STATUS_CONFIG[NominationStatus.draft];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.06 },
        "data-ocid": `nominations.history_item.${i + 1}`,
        className: "glass-sm rounded-xl p-4 flex items-start gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-500/25",
              style: { background: "rgba(251,191,36,0.10)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                FileText,
                {
                  className: "h-4 w-4",
                  style: { color: "rgb(251,191,36)" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-white/85 truncate", children: nom.programName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `shrink-0 text-xs font-mono border ${statusCfg.border} ${statusCfg.bg} ${statusCfg.color}`,
                  children: statusCfg.label
                }
              )
            ] }),
            nom.teacherNote && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/50 leading-relaxed truncate", children: [
              "“",
              nom.teacherNote,
              "”"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-white/30 font-mono mt-1.5", children: [
              new Date(
                Number(nom.submittedAt) / 1e6
              ).toLocaleDateString(),
              " ",
              "· ID: ",
              nom.id.slice(0, 8),
              "…"
            ] })
          ] })
        ]
      },
      nom.id
    );
  }) });
}
function FlagRow({
  flag,
  index,
  onNominate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07 },
      "data-ocid": `nominations.flag_row.${index + 1}`,
      className: "rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 relative overflow-hidden",
      style: {
        background: "linear-gradient(135deg, rgba(251,191,36,0.07) 0%, rgba(12,14,28,0.80) 100%)",
        border: "1px solid rgba(251,191,36,0.18)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            style: {
              background: "rgba(251,191,36,0.15)",
              border: "1px solid rgba(251,191,36,0.28)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5", style: { color: "rgb(251,191,36)" } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold text-sm text-white/90", children: [
              flag.studentId.toString().slice(0, 16),
              "…"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[9px] font-mono",
                style: {
                  borderColor: "rgba(251,191,36,0.25)",
                  color: "rgb(253,224,130)"
                },
                children: flag.subject
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[9px] font-mono border-violet-500/30 text-violet-300",
                children: flag.pattern
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: flag.eligiblePrograms.slice(0, 3).map((prog) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-flex items-center rounded-md px-1.5 py-0.5 text-[9px] font-mono",
              style: {
                background: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.18)",
                color: "rgb(253,224,130)"
              },
              children: prog.name
            },
            prog.name
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-mono text-sm font-bold",
              style: { color: "rgb(251,191,36)" },
              children: [
                Number(flag.masteryScore),
                "%"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              "data-ocid": `nominations.nominate_button.${index + 1}`,
              onClick: () => onNominate(flag),
              className: "text-xs h-8 px-3 gap-1.5",
              style: {
                background: "linear-gradient(135deg, rgb(234,179,8), rgb(161,98,7))",
                color: "rgb(0,0,0)",
                border: "none",
                boxShadow: "0 0 12px rgba(251,191,36,0.25)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3 w-3" }),
                " Nominate"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function NominationsPage() {
  const { identity } = useInternetIdentity();
  const principal = (identity == null ? void 0 : identity.getPrincipal()) ?? null;
  const [activeTab, setActiveTab] = reactExports.useState("flags");
  const [selectedFlag, setSelectedFlag] = reactExports.useState(
    null
  );
  const [selectedProgram, setSelectedProgram] = reactExports.useState("");
  const [teacherNote, setTeacherNote] = reactExports.useState("");
  const [confirmedNom, setConfirmedNom] = reactExports.useState(
    null
  );
  const { data: flags = [], isLoading: flagsLoading } = useAllRecognitionFlags();
  const { data: nominations = [], isLoading: nominationsLoading } = useNominations(principal);
  const submitNomination = useSubmitNomination();
  async function handleSubmit() {
    if (!selectedFlag || !selectedProgram) return;
    try {
      const result = await submitNomination.mutateAsync({
        studentId: selectedFlag.studentId,
        programName: selectedProgram,
        teacherNote
      });
      setConfirmedNom(result);
      setSelectedFlag(null);
      setSelectedProgram("");
      setTeacherNote("");
      ue.success(`Nomination submitted — ${selectedProgram}`);
    } catch {
      ue.error("Failed to submit nomination");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "nominations.page",
      className: "portal-enter min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/teacher",
              "data-ocid": "nominations.back_link",
              className: "inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white/70 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
                " Back to Teacher Dashboard"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              className: "rounded-2xl p-6 relative overflow-hidden",
              style: {
                background: "linear-gradient(135deg, rgba(251,191,36,0.11) 0%, rgba(12,14,28,0.85) 100%)",
                border: "1px solid rgba(251,191,36,0.22)",
                boxShadow: "0 16px 64px rgba(0,0,0,0.50), inset 0 1px 0 rgba(251,191,36,0.08)",
                backdropFilter: "blur(24px) saturate(200%)",
                WebkitBackdropFilter: "blur(24px) saturate(200%)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                    style: {
                      background: "rgba(251,191,36,0.18)",
                      border: "1px solid rgba(251,191,36,0.35)",
                      boxShadow: "0 0 20px rgba(251,191,36,0.20)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6", style: { color: "rgb(251,191,36)" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-mono text-[9px] font-bold uppercase tracking-widest mb-0.5",
                      style: { color: "rgb(251,191,36)" },
                      children: "NOMS · Nomination Engine"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-black text-white/95", children: "Student Nominations" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50", children: "Review flagged students and submit national program nominations" })
                ] })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Tabs,
          {
            value: activeTab,
            onValueChange: setActiveTab,
            "data-ocid": "nominations.tabs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "glass-sm border border-white/[0.08] mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "flags",
                    "data-ocid": "nominations.flags_tab",
                    className: "gap-2 text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5" }),
                      "Flagged Students",
                      !flagsLoading && flags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: "font-mono text-[9px] border ml-1",
                          style: {
                            background: "rgba(251,191,36,0.15)",
                            borderColor: "rgba(251,191,36,0.25)",
                            color: "rgb(251,191,36)"
                          },
                          children: flags.length
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "history",
                    "data-ocid": "nominations.history_tab",
                    className: "gap-2 text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
                      " History"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "flags", className: "space-y-3 mt-0", children: flagsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "nominations.flags_tab.loading_state",
                  className: "space-y-3",
                  children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }, i))
                }
              ) : flags.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "nominations.flags_tab.empty_state",
                  className: "glass rounded-2xl p-10 flex flex-col items-center gap-4 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: "🔍" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-white/70", children: "No students flagged for recognition yet" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/40 mt-1", children: "The RCGN engine automatically flags students with exceptional performance patterns." })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: flags.map((flag, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                FlagRow,
                {
                  flag,
                  index: i,
                  onNominate: setSelectedFlag
                },
                flag.id
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", className: "mt-0", children: nominationsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "nominations.history_tab.loading_state",
                  className: "space-y-3",
                  children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i))
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(NominationHistoryList, { nominations }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: !!selectedFlag,
            onOpenChange: (open) => !open && setSelectedFlag(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DialogContent,
              {
                "data-ocid": "nominations.nominate_dialog",
                className: "sm:max-w-md border-0",
                style: {
                  background: "rgba(8,6,20,0.96)",
                  backdropFilter: "blur(24px) saturate(200%)",
                  border: "1px solid rgba(251,191,36,0.20)",
                  boxShadow: "0 32px 96px rgba(0,0,0,0.70)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    DialogTitle,
                    {
                      className: "font-display text-lg",
                      style: { color: "rgb(251,191,36)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "inline h-5 w-5 mr-2 -mt-0.5" }),
                        " Submit Nomination"
                      ]
                    }
                  ) }),
                  selectedFlag && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl p-3",
                        style: {
                          background: "rgba(251,191,36,0.08)",
                          border: "1px solid rgba(251,191,36,0.18)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1", children: "Student" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-white/80 font-mono", children: [
                            selectedFlag.studentId.toString().slice(0, 20),
                            "…"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Badge,
                              {
                                variant: "outline",
                                className: "text-[9px] font-mono",
                                style: {
                                  borderColor: "rgba(251,191,36,0.25)",
                                  color: "rgb(253,224,130)"
                                },
                                children: selectedFlag.subject
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Badge,
                              {
                                variant: "outline",
                                className: "text-[9px] font-mono border-violet-500/30 text-violet-300",
                                children: selectedFlag.pattern
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "text-xs font-mono font-bold",
                                style: { color: "rgb(251,191,36)" },
                                children: [
                                  Number(selectedFlag.masteryScore),
                                  "%"
                                ]
                              }
                            )
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-white/50", children: "Program" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: selectedProgram,
                          onValueChange: setSelectedProgram,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                "data-ocid": "nominations.program_select",
                                className: "glass-sm border-0",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select program" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "glass-xl border-0", children: (selectedFlag.eligiblePrograms.length > 0 ? selectedFlag.eligiblePrograms.map((p) => p.name) : PROGRAMS).map((prog) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: prog, children: prog }, prog)) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "teacher-note", className: "text-xs text-white/50", children: "Teacher Note" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          id: "teacher-note",
                          "data-ocid": "nominations.teacher_note_textarea",
                          placeholder: "Add context or recommendation for this nomination...",
                          value: teacherNote,
                          onChange: (e) => setTeacherNote(e.target.value),
                          rows: 4,
                          className: "glass-sm border-0 resize-none text-sm"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: "ghost",
                          "data-ocid": "nominations.cancel_button",
                          className: "flex-1 text-xs",
                          onClick: () => setSelectedFlag(null),
                          children: "Cancel"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          "data-ocid": "nominations.submit_button",
                          disabled: !selectedProgram || submitNomination.isPending,
                          onClick: handleSubmit,
                          className: "flex-1 text-xs gap-1.5",
                          style: {
                            background: selectedProgram ? "linear-gradient(135deg, rgb(234,179,8), rgb(161,98,7))" : void 0,
                            color: selectedProgram ? "rgb(0,0,0)" : void 0,
                            border: "none"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" }),
                            submitNomination.isPending ? "Submitting…" : "Submit Nomination"
                          ]
                        }
                      )
                    ] })
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: confirmedNom && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16, scale: 0.96 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: -8, scale: 0.98 },
            "data-ocid": "nominations.success_state",
            className: "fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl p-5 flex items-start gap-4",
            style: {
              background: "rgba(6,18,8,0.96)",
              border: "1px solid rgba(100,230,150,0.30)",
              boxShadow: "0 16px 64px rgba(0,0,0,0.60)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-6 w-6 text-emerald-400 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-white/90", children: "Nomination Submitted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/60 mt-0.5", children: [
                  confirmedNom.programName,
                  " for",
                  " ",
                  confirmedNom.studentId.toString().slice(0, 12),
                  "…"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "nominations.success_close_button",
                  onClick: () => setConfirmedNom(null),
                  className: "text-white/30 hover:text-white/70 transition-colors text-lg leading-none",
                  "aria-label": "Close confirmation",
                  children: "×"
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
export {
  NominationsPage as default
};
