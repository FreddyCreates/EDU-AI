import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { f as useActor, u as ue, h as createActor, S as Skeleton, U as Users } from "./index-BivnQ6bB.js";
import { I as Input } from "./input-dqEl3BdT.js";
import { L as Label } from "./label-CpNG7Eze.js";
import { a as useQuery, u as useQueryClient, b as useMutation } from "./query-8urnerR0.js";
import { d as useNavigate, L as Link } from "./router-D6GUppNf.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import { S as Settings } from "./settings-C4T1En8l.js";
import { T as TriangleAlert } from "./triangle-alert-DEqO8oET.js";
import "./index-Ctl2T3XX.js";
function useFactoryStatus() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["factory-status-full"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.factoryStatus();
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useCreateFactoryStudent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ username, gradeLevel }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createFactoryStudent(username, gradeLevel);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (msg) => {
      ue.success(msg ?? "Student account created.");
      queryClient.invalidateQueries({ queryKey: ["factory-status-full"] });
    },
    onError: (err) => {
      ue.error(err.message ?? "Failed to create student.");
    }
  });
}
const AMBER = "oklch(0.76 0.18 84)";
const AMBER_GLOW = "rgba(245, 155, 0, 0.18)";
const AMBER_BORDER = "rgba(245, 155, 0, 0.25)";
const GRADE_OPTIONS = [
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12"
];
function useLocalFactoryInit() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (adminName) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.factoryAdminSetup(adminName);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    }
  });
}
const inputStyle = {
  background: "rgba(12,14,28,0.80)",
  backdropFilter: "blur(8px)",
  borderColor: AMBER_BORDER
};
function FactorySetupPage() {
  const navigate = useNavigate();
  const { data: isInitialized, isLoading } = useQuery({
    queryKey: ["factoryInitialized"],
    queryFn: async () => false,
    enabled: false
  });
  const { data: factoryStatus, isLoading: statusLoading } = useFactoryStatus();
  const setupMutation = useLocalFactoryInit();
  const createStudent = useCreateFactoryStudent();
  const [adminName, setAdminName] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const [newUsername, setNewUsername] = reactExports.useState("");
  const [newGrade, setNewGrade] = reactExports.useState("5");
  reactExports.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate({ to: "/admin" }), 3e3);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!adminName.trim()) return;
    setupMutation.mutate(adminName.trim(), {
      onSuccess: () => {
        setSuccess(true);
        ue.success("Factory initialized successfully");
      },
      onError: (err) => {
        ue.error("Setup failed", {
          description: err instanceof Error ? err.message : "Initialization error."
        });
      }
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-lg mx-auto px-4 py-16 space-y-4",
        "data-ocid": "factory.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "glass-xl rounded-2xl h-40",
              style: { border: `1px solid ${AMBER_BORDER}` }
            }
          )
        ]
      }
    );
  }
  if (isInitialized) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-lg mx-auto px-4 py-16",
        "data-ocid": "factory.initialized_page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-xl rounded-3xl p-10 text-center relative overflow-hidden",
            style: { border: `1px solid ${AMBER_BORDER}` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245,155,0,0.10) 0%, transparent 70%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4",
                    style: {
                      background: "rgba(245,155,0,0.12)",
                      border: `1px solid ${AMBER_BORDER}`
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-8 h-8", style: { color: AMBER } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-3", children: "Factory Already Initialized" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 leading-relaxed", children: "This setup was sealed on first deploy. The factory admin has already been configured. This page is now permanently locked." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "w-full rounded-xl py-3 font-mono text-sm font-bold",
                    style: {
                      background: "rgba(245,155,0,0.18)",
                      color: AMBER,
                      border: `1px solid ${AMBER_BORDER}`
                    },
                    "data-ocid": "factory.go_admin_button",
                    children: "Go to Admin Dashboard"
                  }
                ) })
              ] })
            ]
          }
        )
      }
    );
  }
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-lg mx-auto px-4 py-16",
        "data-ocid": "factory.success_page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            className: "glass-xl rounded-3xl p-10 text-center relative overflow-hidden",
            style: { border: "1px solid rgba(0,220,130,0.25)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,220,130,0.12) 0%, transparent 70%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4",
                    style: {
                      background: "rgba(0,220,130,0.12)",
                      border: "1px solid rgba(0,220,130,0.25)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleCheck,
                      {
                        className: "w-8 h-8",
                        style: { color: "oklch(0.72 0.17 155)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-3", children: "✶ Factory Admin Initialized" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "The platform has been sealed and admin access is now active. Redirecting to Admin Dashboard in 3 seconds…" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-1 rounded-full overflow-hidden",
                    style: { background: "rgba(0,220,130,0.15)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full rounded-full",
                        style: {
                          background: "oklch(0.72 0.17 155)",
                          animation: "factory-progress 3s linear forwards"
                        }
                      }
                    )
                  }
                )
              ] })
            ]
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-lg mx-auto px-4 py-16 space-y-5",
      "data-ocid": "factory.setup_page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-xl rounded-3xl p-8 text-center relative overflow-hidden glass-shimmer",
            style: { border: `1px solid ${AMBER_BORDER}` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,155,0,0.14) 0%, transparent 70%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4",
                    style: {
                      background: "rgba(245,155,0,0.12)",
                      border: `1px solid ${AMBER_BORDER}`,
                      boxShadow: `0 0 20px ${AMBER_GLOW}`
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-7 h-7", style: { color: AMBER } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "text-2xl font-display font-black tracking-tight",
                    style: { color: AMBER, textShadow: `0 0 28px ${AMBER_GLOW}` },
                    children: "FACTORY ADMIN SETUP"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "First-deploy initialization · This page locks after first use" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass rounded-2xl p-4",
            style: { border: `1px solid ${AMBER_BORDER}` },
            "data-ocid": "factory.status_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4", style: { color: AMBER } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono tracking-widest text-muted-foreground uppercase", children: "Factory Status" })
              ] }),
              statusLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-sm rounded-xl h-14" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 text-center", children: [
                {
                  label: "Admin Account",
                  value: (factoryStatus == null ? void 0 : factoryStatus.adminExists) ? "Created" : "Pending",
                  color: (factoryStatus == null ? void 0 : factoryStatus.adminExists) ? "oklch(0.72 0.17 155)" : AMBER
                },
                {
                  label: "Students",
                  value: String((factoryStatus == null ? void 0 : factoryStatus.studentCount) ?? 0),
                  color: AMBER
                },
                {
                  label: "Factory",
                  value: (factoryStatus == null ? void 0 : factoryStatus.factoryLocked) ? "Locked" : "Active",
                  color: (factoryStatus == null ? void 0 : factoryStatus.factoryLocked) ? "oklch(0.65 0.22 22)" : "oklch(0.72 0.17 155)"
                }
              ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-sm rounded-xl p-2.5 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-bold", style: { color }, children: value }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: label })
                  ]
                },
                label
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-sm rounded-2xl p-4 flex items-start gap-3",
            style: {
              background: "rgba(245,155,0,0.06)",
              border: `1px solid ${AMBER_BORDER}`
            },
            "data-ocid": "factory.warning_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TriangleAlert,
                {
                  className: "w-5 h-5 flex-shrink-0 mt-0.5",
                  style: { color: AMBER }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", style: { color: AMBER }, children: "Irreversible Action" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-0.5", children: "Once submitted, this setup page locks permanently. The admin identity will be sealed to the platform canister." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "glass-xl rounded-2xl p-6",
            style: { border: `1px solid ${AMBER_BORDER}` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "admin-name",
                    className: "text-xs text-muted-foreground",
                    children: "Admin Name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "admin-name",
                    type: "text",
                    placeholder: "Enter admin display name",
                    value: adminName,
                    onChange: (e) => setAdminName(e.target.value),
                    autoComplete: "off",
                    "data-ocid": "factory.admin_name_input",
                    style: inputStyle
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This name is sealed into the platform registry and never shown to students." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  className: "w-full flex items-center justify-center gap-2 rounded-xl py-4 font-mono text-sm font-bold transition-smooth",
                  disabled: !adminName.trim() || setupMutation.isPending,
                  "data-ocid": "factory.submit_button",
                  style: {
                    background: !adminName.trim() || setupMutation.isPending ? "rgba(245,155,0,0.08)" : "rgba(245,155,0,0.20)",
                    color: AMBER,
                    border: `1px solid ${AMBER_BORDER}`,
                    boxShadow: !adminName.trim() || setupMutation.isPending ? void 0 : `0 0 24px ${AMBER_GLOW}`
                  },
                  children: setupMutation.isPending ? "Initializing…" : "Initialize Factory Admin"
                }
              )
            ] })
          }
        ),
        (factoryStatus == null ? void 0 : factoryStatus.adminExists) && !(factoryStatus == null ? void 0 : factoryStatus.factoryLocked) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-xl rounded-2xl p-6 space-y-4",
            style: { border: `1px solid ${AMBER_BORDER}` },
            "data-ocid": "factory.create_student_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4", style: { color: AMBER } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono tracking-widest text-muted-foreground uppercase", children: "Create Student Account" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "new-username",
                    className: "text-xs text-muted-foreground",
                    children: "Username"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "new-username",
                    type: "text",
                    placeholder: "student_username",
                    value: newUsername,
                    onChange: (e) => setNewUsername(e.target.value),
                    autoComplete: "off",
                    "data-ocid": "factory.new_username_input",
                    style: inputStyle
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "new-grade",
                    className: "text-xs text-muted-foreground",
                    children: "Grade Level"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "new-grade",
                    value: newGrade,
                    onChange: (e) => setNewGrade(e.target.value),
                    "data-ocid": "factory.grade_select",
                    className: "w-full rounded-xl border px-3 py-2 text-sm focus:outline-none",
                    style: {
                      background: "rgba(12,14,28,0.80)",
                      borderColor: AMBER_BORDER,
                      backdropFilter: "blur(8px)",
                      color: "inherit"
                    },
                    children: GRADE_OPTIONS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: g, children: g === "K" ? "Kindergarten" : `Grade ${g}` }, g))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full flex items-center justify-center gap-2 rounded-xl py-3 font-mono text-sm font-bold transition-smooth",
                  disabled: !newUsername.trim() || createStudent.isPending,
                  "data-ocid": "factory.create_student_button",
                  style: {
                    background: !newUsername.trim() || createStudent.isPending ? "rgba(245,155,0,0.08)" : "rgba(245,155,0,0.16)",
                    color: AMBER,
                    border: `1px solid ${AMBER_BORDER}`
                  },
                  onClick: () => {
                    if (!newUsername.trim()) return;
                    createStudent.mutate(
                      { username: newUsername.trim(), gradeLevel: newGrade },
                      {
                        onSuccess: () => {
                          ue.success("Student account created");
                          setNewUsername("");
                          setNewGrade("5");
                        }
                      }
                    );
                  },
                  children: createStudent.isPending ? "Creating…" : "Create Student"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  FactorySetupPage as default
};
