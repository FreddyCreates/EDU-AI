import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { f as useActor, S as Skeleton, j as Send, u as ue, h as createActor } from "./index-BivnQ6bB.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { u as usePassportStats, b as useAutoSeal } from "./use-passport-VGmcZtEk.js";
import { a as useQuery } from "./query-8urnerR0.js";
import { e as useParams, f as useSearch, L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
const FEATURED = {
  sage: {
    emoji: "🦉",
    idTag: "SAGE",
    substrate: "ICPM",
    domain: "Concept Translation",
    intro: "Sage explains every concept from first principles — clearly, patiently, at exactly your level.",
    firstMessage: "Hello, I'm Sage. What do you want to understand today?",
    accentColor: "oklch(0.78 0.22 200)",
    glowColor: "rgba(0,210,255,0.20)",
    borderColor: "rgba(0,210,255,0.30)"
  },
  quill: {
    emoji: "📝",
    idTag: "QUIL",
    substrate: "ICPM",
    domain: "Assessment",
    intro: "Quill builds mastery through creation — every question is a seed.",
    firstMessage: "Hi, I'm Quill. What shall we test today?",
    accentColor: "oklch(0.75 0.16 70)",
    glowColor: "rgba(255,185,0,0.20)",
    borderColor: "rgba(255,185,0,0.30)"
  },
  spark: {
    emoji: "⚡",
    idTag: "SPRK",
    substrate: "EART",
    domain: "Motivation",
    intro: "Spark keeps you moving — celebrating every win on the way to mastery.",
    firstMessage: "Hey! Let's keep that momentum going — what are you working on?",
    accentColor: "oklch(0.75 0.16 70)",
    glowColor: "rgba(255,185,0,0.20)",
    borderColor: "rgba(255,185,0,0.30)"
  },
  nova: {
    emoji: "✨",
    idTag: "NOVX",
    substrate: "JLIA",
    domain: "Cross-Subject Links",
    intro: "Nova discovers hidden connections across subjects — illuminating the bigger picture.",
    firstMessage: "Hello, I'm Nova. What shall we explore together?",
    accentColor: "oklch(0.68 0.18 280)",
    glowColor: "rgba(160,100,255,0.20)",
    borderColor: "rgba(160,100,255,0.30)"
  }
};
const DEFAULT_FLAVOUR = {
  emoji: "🤖",
  idTag: "AGNT",
  substrate: "ICPM",
  domain: "General",
  intro: "Your sovereign AI learning companion.",
  firstMessage: "Hello! What would you like to explore today?",
  accentColor: "oklch(0.62 0.20 260)",
  glowColor: "rgba(100,130,255,0.18)",
  borderColor: "rgba(100,130,255,0.25)"
};
function flavourFor(name) {
  return FEATURED[name.toLowerCase()] ?? DEFAULT_FLAVOUR;
}
function useAgentByName(name) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["agent", name],
    queryFn: async () => {
      if (!actor) return null;
      return await actor.getAgent(name);
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 5
  });
}
function AgentPage() {
  const { agentName } = useParams({ strict: false });
  const { actor } = useActor(createActor);
  const search = useSearch({ strict: false });
  const topic = search == null ? void 0 : search.topic;
  const subject = search == null ? void 0 : search.subject;
  const gradeLevel = (search == null ? void 0 : search.grade) ?? "6";
  const agentRoleMap = {
    sage: "explainer",
    quill: "quizmaster",
    spark: "encourager",
    nova: "curator"
  };
  const agentRole = agentRoleMap[agentName.toLowerCase()] ?? "curator";
  const flavour = flavourFor(agentName);
  const { data: agent, isLoading: agentLoading } = useAgentByName(agentName);
  const { data: passportStats } = usePassportStats();
  const autoSeal = useAutoSeal();
  const [messages, setMessages] = reactExports.useState([]);
  const [input, setInput] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [messageCount, setMessageCount] = reactExports.useState(0);
  const [sessionSealed, setSessionSealed] = reactExports.useState(false);
  const bottomRef = reactExports.useRef(null);
  const textareaRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
  reactExports.useEffect(() => {
    if (!actor || messages.length > 0) return;
    let cancelled = false;
    setIsLoading(true);
    actor.askAgent(
      agentRole,
      "introduce yourself and ask the student what topic they want to explore today",
      topic ?? "General Learning",
      subject ?? "General",
      gradeLevel,
      BigInt(0)
    ).then((res) => {
      if (!cancelled)
        setMessages([{ role: "agent", text: res, id: Date.now() }]);
    }).catch(() => {
      if (!cancelled)
        setMessages([
          { role: "agent", text: flavour.firstMessage, id: Date.now() }
        ]);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [actor]);
  async function sendMessage() {
    if (!input.trim() || isLoading || !actor) return;
    const userText = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "student", text: userText, id: Date.now() }
    ]);
    setIsLoading(true);
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    try {
      const response = await actor.askAgent(
        agentRole,
        userText,
        topic ?? "General Learning",
        subject ?? "General",
        gradeLevel,
        BigInt(newCount)
      );
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: response, id: Date.now() }
      ]);
    } catch {
      try {
        const response = await actor.askAgent(
          agentRole,
          userText,
          topic ?? "General Learning",
          subject ?? "General",
          gradeLevel,
          BigInt(newCount)
        );
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: response, id: Date.now() }
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            text: "Let's keep going — what would you like to explore?",
            id: Date.now()
          }
        ]);
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        var _a;
        return (_a = textareaRef.current) == null ? void 0 : _a.focus();
      }, 50);
    }
  }
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
  function handleInput(e) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 80)}px`;
  }
  async function handleSealSession() {
    const lastAgent = [...messages].reverse().find((m) => m.role === "agent");
    if (!lastAgent) return;
    try {
      await autoSeal.mutateAsync({
        summary: lastAgent.text.slice(0, 200),
        engineUsed: agentRole,
        subject: subject ?? "General",
        gradeLevel: gradeLevel ?? "K"
      });
      setSessionSealed(true);
      ue.success("Session sealed to your passport!");
    } catch {
      ue.error("Seal failed — try again.");
    }
  }
  const displayName = (agent == null ? void 0 : agent.name) ?? agentName.charAt(0).toUpperCase() + agentName.slice(1);
  const taglineMap = {
    sage: "Concept Explainer",
    quill: "Quiz Master",
    spark: "Your Encourager",
    nova: "Learning Curator"
  };
  const tagline = taglineMap[agentName.toLowerCase()] ?? "AI Learning Guide";
  const showSealButton = messages.length >= 3 && !sessionSealed && messages.some((m) => m.role === "agent");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto",
      "data-ocid": "agent_page.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-sm flex items-center gap-3 px-4 py-3 border-b shrink-0",
            style: { borderColor: flavour.borderColor },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/agents",
                  className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0",
                  "data-ocid": "agent_page.back_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Agents" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "glass rounded-xl px-2.5 py-1 font-mono text-sm font-black shrink-0",
                  style: {
                    color: flavour.accentColor,
                    border: `1px solid ${flavour.borderColor}`
                  },
                  children: flavour.idTag
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: agentLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "font-display font-bold text-base leading-tight",
                    style: { color: flavour.accentColor },
                    children: displayName
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  tagline,
                  " · ",
                  flavour.substrate
                ] })
              ] }) }),
              topic && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs shrink-0 glass-sm", children: decodeURIComponent(topic) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-1.5 h-1.5 rounded-full animate-pulse",
                    style: { background: "oklch(0.72 0.17 155)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-mono",
                    style: { color: "oklch(0.72 0.17 155)" },
                    children: "LIVE"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-1 overflow-y-auto px-4 py-4 space-y-4",
            "data-ocid": "agent_page.chat_list",
            children: [
              messages.map((msg) => {
                const isAgent = msg.role === "agent";
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.22 },
                    className: `flex gap-3 ${isAgent ? "items-start" : "items-start flex-row-reverse"}`,
                    children: [
                      isAgent ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "glass-sm w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm",
                          style: { border: `1px solid ${flavour.borderColor}` },
                          children: flavour.emoji
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "glass w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold",
                          style: { color: "oklch(0.62 0.20 260)" },
                          children: "You"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${isAgent ? "glass rounded-tl-sm" : "rounded-tr-sm"}`,
                          style: isAgent ? { border: `1px solid ${flavour.borderColor}` } : {
                            background: flavour.accentColor,
                            color: "oklch(0.07 0.01 260)"
                          },
                          children: msg.text
                        }
                      )
                    ]
                  },
                  msg.id
                );
              }),
              isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 6 },
                  animate: { opacity: 1, y: 0 },
                  className: "flex gap-3 items-start",
                  "data-ocid": "agent_page.loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "glass-sm w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm",
                        style: { border: `1px solid ${flavour.borderColor}` },
                        children: flavour.emoji
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl rounded-tl-sm px-4 py-2.5 flex gap-1 items-center", children: [
                      [0, 0.15, 0.3].map((delay) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.span,
                        {
                          className: "w-1.5 h-1.5 rounded-full bg-muted-foreground",
                          animate: { opacity: [0.3, 1, 0.3] },
                          transition: {
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1,
                            delay
                          }
                        },
                        delay
                      )),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "Thinking…" })
                    ] })
                  ]
                }
              ),
              showSealButton && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex justify-center",
                  "data-ocid": "agent_page.seal_section",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "agent_page.seal_button",
                      onClick: handleSealSession,
                      disabled: autoSeal.isPending,
                      className: "glass-sm rounded-full px-4 py-1.5 text-xs font-mono font-semibold transition-smooth hover:scale-105 disabled:opacity-50",
                      style: {
                        color: flavour.accentColor,
                        border: `1px solid ${flavour.borderColor}`
                      },
                      children: autoSeal.isPending ? "Sealing…" : "✦ Seal this session"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-sm shrink-0 border-t px-4 py-3",
            style: { borderColor: "rgba(255,255,255,0.06)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    ref: textareaRef,
                    rows: 1,
                    value: input,
                    onChange: handleInput,
                    onKeyDown: handleKeyDown,
                    placeholder: `Ask ${displayName} anything…`,
                    disabled: isLoading,
                    "data-ocid": "agent_page.chat_input",
                    className: "flex-1 min-w-0 glass rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 transition-smooth disabled:opacity-50 resize-none overflow-hidden leading-relaxed",
                    style: {
                      minHeight: "40px",
                      maxHeight: "80px",
                      border: `1px solid ${flavour.borderColor}`
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    disabled: !input.trim() || isLoading || !actor,
                    onClick: sendMessage,
                    "data-ocid": "agent_page.send_button",
                    className: "glass-sm rounded-xl px-3 h-10 shrink-0 flex items-center justify-center transition-smooth hover:scale-105 disabled:opacity-40",
                    style: {
                      border: `1px solid ${flavour.borderColor}`,
                      color: flavour.accentColor
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Send" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-1.5 text-center font-mono", children: [
                passportStats ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  Number(passportStats.totalSeeds),
                  " seeds · Score:",
                  " ",
                  passportStats.compoundScore.toFixed(2)
                ] }) : "Seal a session to begin your passport",
                " · ",
                "Enter to send"
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  AgentPage as default
};
