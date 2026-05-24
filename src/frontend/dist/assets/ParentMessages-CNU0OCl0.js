import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { P as Plus } from "./plus-DLM4cYLL.js";
import { i as createLucideIcon, M as MessageSquare } from "./index-BivnQ6bB.js";
import { A as AnimatePresence, m as motion } from "./motion-BK2wxCtX.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m3 11 18-5v12L3 14v-3z", key: "n962bs" }],
  ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6", key: "1yl0tm" }]
];
const Megaphone = createLucideIcon("megaphone", __iconNode);
const threads = [
  {
    id: "1",
    from: "Ms. Rivera (Math)",
    subject: "Great progress on last week's quiz!",
    preview: "Marcus scored 8/10 on Tuesday's algebra quiz. He's really...",
    time: "2h ago",
    unread: true
  },
  {
    id: "2",
    from: "Mr. Thompson (History)",
    subject: "Upcoming project deadline",
    preview: "Reminder that the Reconstruction Era project is due...",
    time: "Yesterday",
    unread: true
  },
  {
    id: "3",
    from: "Counselor Williams",
    subject: "College readiness meeting",
    preview: "I'd like to schedule a meeting to discuss Marcus's senior year...",
    time: "May 16",
    unread: false
  },
  {
    id: "4",
    from: "Principal Rodriguez",
    subject: "End-of-year ceremony information",
    preview: "Please join us for our annual academic recognition ceremony...",
    time: "May 14",
    unread: false
  }
];
const announcements = [
  {
    title: "STAAR Testing Schedule — May 20–24",
    date: "May 18",
    priority: "urgent"
  },
  {
    title: "Summer School Registration Open",
    date: "May 15",
    priority: "normal"
  },
  {
    title: "Parent-Teacher Conferences: June 3",
    date: "May 12",
    priority: "normal"
  }
];
function ParentMessages() {
  const [tab, setTab] = reactExports.useState("messages");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "parent.messages.page",
      className: "min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/parent",
                className: "text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Messages" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "parent.compose.button",
              size: "sm",
              className: "bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                " Compose"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1 bg-white/5 rounded-xl p-1 mb-6",
            "data-ocid": "parent.messages.tab",
            children: ["messages", "announcements"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `parent.tab.${t}`,
                onClick: () => setTab(t),
                className: `flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${tab === t ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)]" : "text-[oklch(0.55_0.06_265)] hover:text-[oklch(0.75_0.08_265)]"}`,
                children: [
                  t === "messages" ? /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-4 h-4" }),
                  t.charAt(0).toUpperCase() + t.slice(1)
                ]
              },
              t
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: tab === "messages" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "space-y-3",
            children: threads.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                "data-ocid": `parent.message.${i + 1}`,
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.07 },
                className: `bg-white/5 border rounded-xl p-4 cursor-pointer hover:bg-white/8 transition-all ${t.unread ? "border-[oklch(0.85_0.15_85)]/30" : "border-white/10"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-sm font-medium ${t.unread ? "text-[oklch(0.9_0.05_265)]" : "text-[oklch(0.65_0.06_265)]"}`,
                        children: t.from
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.45_0.05_265)] text-xs", children: t.time }),
                      t.unread && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-[oklch(0.85_0.15_85)]" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-sm ${t.unread ? "text-[oklch(0.85_0.05_265)]" : "text-[oklch(0.6_0.06_265)]"}`,
                      children: t.subject
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.45_0.05_265)] text-xs mt-1 truncate", children: t.preview })
                ]
              },
              t.id
            ))
          },
          "msgs"
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "space-y-3",
            children: announcements.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                "data-ocid": `parent.announcement.${i + 1}`,
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.07 },
                className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4 flex items-center justify-between",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.85_0.05_265)] text-sm font-medium", children: a.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs mt-0.5", children: a.date })
                  ] }),
                  a.priority === "urgent" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[oklch(0.65_0.22_30)]/20 text-[oklch(0.75_0.2_60)] border-[oklch(0.65_0.22_30)]/30 text-xs", children: "Urgent" })
                ]
              },
              a.title
            ))
          },
          "anns"
        ) })
      ]
    }
  );
}
export {
  ParentMessages as default
};
