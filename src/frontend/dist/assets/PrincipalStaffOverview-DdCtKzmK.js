import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { i as createLucideIcon, F as StaffRole, U as Users, k as Shield, a as Award, c as cn, G as GraduationCap } from "./index-BivnQ6bB.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { b as useStaffRoster, c as useUpdateStaffRole, d as useStaffActivityLog } from "./useBackend-DrgJPcWN.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import { C as CircleCheckBig } from "./circle-check-big-DngI0fNm.js";
import "./query-8urnerR0.js";
import "./router-D6GUppNf.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
const AMBER = "oklch(0.75 0.16 70)";
const STAFF = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Mathematics",
    grade: "9–12",
    students: 87,
    mastery: 82,
    type: "teacher"
  },
  {
    name: "James Okonkwo",
    role: "Science & Biology",
    grade: "6–8",
    students: 94,
    mastery: 79,
    type: "teacher"
  },
  {
    name: "Maria Santos",
    role: "English Language Arts",
    grade: "K–5",
    students: 112,
    mastery: 91,
    type: "teacher"
  },
  {
    name: "Robert Chen",
    role: "History & Gov",
    grade: "10–12",
    students: 73,
    mastery: 85,
    type: "teacher"
  },
  {
    name: "Angela Reyes",
    role: "IT Coordinator",
    grade: "All",
    students: 0,
    mastery: 0,
    type: "it"
  },
  {
    name: "David Williams",
    role: "Curriculum Admin",
    grade: "All",
    students: 0,
    mastery: 0,
    type: "admin"
  },
  {
    name: "Patricia Monroe",
    role: "School Counselor",
    grade: "K–12",
    students: 0,
    mastery: 0,
    type: "counselor"
  },
  {
    name: "Kevin Park",
    role: "Student Support Lead",
    grade: "All",
    students: 0,
    mastery: 0,
    type: "support"
  }
];
const TYPE_STYLE = {
  teacher: {
    label: "Teacher",
    color: "oklch(0.68 0.18 280)",
    bg: "rgba(160,100,255,0.1)"
  },
  it: {
    label: "IT Staff",
    color: "oklch(0.72 0.17 155)",
    bg: "rgba(0,220,130,0.1)"
  },
  admin: { label: "Admin", color: AMBER, bg: "rgba(255,185,0,0.1)" },
  counselor: {
    label: "Counselor",
    color: "oklch(0.75 0.20 330)",
    bg: "rgba(255,100,220,0.1)"
  },
  support: {
    label: "Support",
    color: "oklch(0.72 0.17 200)",
    bg: "rgba(0,210,255,0.1)"
  }
};
const FILTER_TABS = [
  "ALL",
  "TEACHER",
  "IT",
  "ADMIN",
  "COUNSELOR",
  "SUPPORT"
];
function ActivityLog({ staffId }) {
  const { data: log = [] } = useStaffActivityLog(staffId);
  if (log.length === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground px-4 py-2", children: "No recent activity recorded." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 space-y-1", children: log.slice(0, 5).map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-start gap-2 text-xs",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground shrink-0", children: new Date(Number(entry.timestamp) / 1e6).toLocaleTimeString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground/90", children: entry.action }),
          entry.details ? ` — ${entry.details}` : ""
        ] })
      ]
    },
    `activity-${entry.timestamp ?? i}`
  )) });
}
function roleLabel(role) {
  switch (role) {
    case StaffRole.STAFF_ADMIN:
      return "Admin";
    case StaffRole.STAFF_IT:
      return "IT Staff";
    case StaffRole.STAFF_COUNSELOR:
      return "Counselor";
    case StaffRole.STAFF_SUPPORT:
      return "Support";
    case StaffRole.STAFF_COACH:
      return "Coach";
    case StaffRole.STAFF_LIBRARIAN:
      return "Librarian";
    default:
      return "Staff";
  }
}
function PrincipalStaffOverview() {
  const [activeTab, setActiveTab] = reactExports.useState("ALL");
  const [expandedStaffId, setExpandedStaffId] = reactExports.useState(null);
  const [editingRole, setEditingRole] = reactExports.useState(null);
  const [roleSuccess, setRoleSuccess] = reactExports.useState(null);
  const { data: staffList = [] } = useStaffRoster();
  const updateRole = useUpdateStaffRole();
  function handleRoleUpdate(staffId, newRole) {
    updateRole.mutate(
      { staffId, newRole },
      {
        onSuccess: () => {
          setRoleSuccess(staffId);
          setEditingRole(null);
          setTimeout(() => setRoleSuccess(null), 3e3);
        }
      }
    );
  }
  const displayStaff = staffList.length > 0 ? staffList.map((s) => ({
    name: s.name,
    role: roleLabel(s.role),
    grade: s.department,
    students: 0,
    mastery: 0,
    type: s.role === StaffRole.STAFF_IT ? "it" : s.role === StaffRole.STAFF_ADMIN ? "admin" : s.role === StaffRole.STAFF_COUNSELOR ? "counselor" : s.role === StaffRole.STAFF_SUPPORT ? "support" : "teacher",
    staffId: s.staffId,
    accessLevel: Number(s.accessLevel),
    lastActive: Number(s.lastActive),
    backendRole: s.role
  })) : STAFF.map((s, i) => ({
    ...s,
    staffId: `static-${i}`,
    accessLevel: 0,
    lastActive: 0,
    backendRole: StaffRole.STAFF_ADMIN
  }));
  const filtered = activeTab === "ALL" ? displayStaff : displayStaff.filter((p) => p.type.toUpperCase() === activeTab);
  const counts = {
    ALL: displayStaff.length,
    TEACHER: displayStaff.filter((p) => p.type === "teacher").length,
    IT: displayStaff.filter((p) => p.type === "it").length,
    ADMIN: displayStaff.filter((p) => p.type === "admin").length,
    COUNSELOR: displayStaff.filter((p) => p.type === "counselor").length,
    SUPPORT: displayStaff.filter((p) => p.type === "support").length
  };
  const teacherCount = counts.TEACHER;
  const avgMastery = displayStaff.filter((s) => s.mastery > 0).reduce((sum, s, _, arr) => sum + s.mastery / arr.length, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-[21px] space-y-[21px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Staff Overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "All non-student facing roles, activity logs, and role management" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              className: "glass-portal-principal border-0 text-xs",
              style: { color: AMBER },
              children: [
                displayStaff.length,
                " Staff Members"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-[13px]", children: [
      { label: "Teachers", value: String(counts.TEACHER), icon: Users },
      { label: "IT Staff", value: String(counts.IT), icon: Shield },
      { label: "Admin", value: String(counts.ADMIN), icon: Award },
      {
        label: "Avg Mastery",
        value: teacherCount > 0 && avgMastery > 0 ? `${Math.round(avgMastery)}%` : "N/A",
        icon: TrendingUp
      }
    ].map(({ label, value, icon: Icon }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        "data-ocid": `staff_overview.summary_card.${i + 1}`,
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.08 },
        className: "glass-portal-principal rounded-xl p-[13px] text-center space-y-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 mx-auto mb-1", style: { color: AMBER } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-mono text-foreground", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: label })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-wrap gap-2",
        "data-ocid": "staff_overview.filter_tabs",
        children: FILTER_TABS.map((tab) => {
          const active = tab === activeTab;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `staff_overview.filter_tab.${tab.toLowerCase()}`,
              onClick: () => setActiveTab(tab),
              className: cn(
                "px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest transition-smooth",
                active ? "text-foreground" : "glass-sm text-muted-foreground hover:text-foreground"
              ),
              style: active ? {
                background: "rgba(255,185,0,0.15)",
                border: "1px solid rgba(255,185,0,0.35)",
                color: AMBER,
                boxShadow: "0 0 10px rgba(255,185,0,0.15)"
              } : {},
              children: [
                tab,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-60 ml-1", children: counts[tab] })
              ]
            },
            tab
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-sm rounded-2xl p-12 text-center",
        "data-ocid": "staff_overview.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-10 w-10 mx-auto mb-3 text-muted-foreground/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No staff members in this category." })
        ]
      }
    ) : filtered.map((person, i) => {
      const style = TYPE_STYLE[person.type];
      const isExpanded = expandedStaffId === person.staffId;
      const isEditing = editingRole === person.staffId;
      const justUpdated = roleSuccess === person.staffId;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          "data-ocid": `staff_overview.staff_card.${i + 1}`,
          initial: { opacity: 0, x: -13 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.08 + i * 0.06 },
          className: "glass-sm rounded-xl overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full p-5 flex items-center gap-4 cursor-pointer transition-smooth hover:bg-white/[0.02] text-left",
                onClick: () => setExpandedStaffId(
                  isExpanded ? null : person.staffId ?? null
                ),
                "data-ocid": `staff_overview.expand_button.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                      style: {
                        background: style.bg,
                        border: `1px solid ${style.color}40`
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        GraduationCap,
                        {
                          className: "h-4 w-4",
                          style: { color: style.color }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: person.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: "text-[9px] px-1.5 py-0 border-0",
                          style: { background: style.bg, color: style.color },
                          children: style.label
                        }
                      ),
                      person.accessLevel > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          className: "text-[9px] px-1.5 py-0 font-mono",
                          style: {
                            background: "rgba(255,185,0,0.08)",
                            color: AMBER,
                            border: "1px solid rgba(255,185,0,0.20)"
                          },
                          children: [
                            "L",
                            person.accessLevel
                          ]
                        }
                      ),
                      justUpdated && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[9px] font-mono text-emerald-400", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3 w-3" }),
                        "Updated"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      person.role,
                      " · ",
                      person.grade
                    ] })
                  ] }),
                  person.students > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 shrink-0 text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm font-bold font-mono",
                          style: { color: AMBER },
                          children: person.students
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: "Students" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          className: "text-sm font-bold font-mono",
                          style: { color: AMBER },
                          children: [
                            person.mastery,
                            "%"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: "Avg Mastery" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `staff_overview.edit_role_button.${i + 1}`,
                        className: "glass-sm rounded-lg p-2 text-muted-foreground hover:text-foreground transition-smooth",
                        "aria-label": `Edit role for ${person.name}`,
                        onClick: (e) => {
                          e.stopPropagation();
                          setEditingRole(
                            isEditing ? null : person.staffId ?? null
                          );
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `staff_overview.contact_button.${i + 1}`,
                        className: "glass-sm rounded-lg p-2 text-muted-foreground hover:text-foreground transition-smooth",
                        "aria-label": `Contact ${person.name}`,
                        onClick: (e) => e.stopPropagation(),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" })
                      }
                    )
                  ] })
                ]
              }
            ),
            isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                transition: { duration: 0.22 },
                className: "border-t border-white/5 px-5 py-4",
                "data-ocid": `staff_overview.role_editor.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground mb-3 uppercase tracking-wider", children: "UPDATE ROLE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: Object.values(StaffRole).map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `staff_overview.role_option.${role.toLowerCase()}`,
                      onClick: () => handleRoleUpdate(person.staffId ?? "", role),
                      disabled: updateRole.isPending,
                      className: "px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold transition-smooth hover:border-amber-500/40 glass-sm",
                      style: {
                        color: role === person.backendRole ? AMBER : void 0,
                        border: role === person.backendRole ? "1px solid rgba(255,185,0,0.35)" : void 0,
                        background: role === person.backendRole ? "rgba(255,185,0,0.12)" : void 0
                      },
                      children: roleLabel(role)
                    },
                    role
                  )) })
                ]
              }
            ),
            isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                transition: { duration: 0.25 },
                className: "border-t border-white/5",
                "data-ocid": `staff_overview.activity_log.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityLog, { staffId: person.staffId ?? "" })
              }
            )
          ]
        },
        person.staffId ?? person.name
      );
    }) })
  ] });
}
export {
  PrincipalStaffOverview as default
};
