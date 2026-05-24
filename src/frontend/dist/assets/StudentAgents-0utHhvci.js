import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { E as EddiOrb } from "./EddiOrb-BVFxfmXd.js";
import { m as motion } from "./motion-BK2wxCtX.js";
function StudentAgents() {
  const MODE_CARDS = [
    {
      icon: "🧠",
      title: "Explain",
      desc: "Breaks down complex concepts into clear understanding"
    },
    {
      icon: "📋",
      title: "Quiz",
      desc: "Tests and reinforces your knowledge adaptively"
    },
    {
      icon: "🔥",
      title: "Encourage",
      desc: "Keeps your momentum alive through every challenge"
    },
    {
      icon: "🗺",
      title: "Guide",
      desc: "Navigates your learning path from where you are"
    },
    {
      icon: "📊",
      title: "Assess",
      desc: "Measures your mastery and surfaces gaps"
    },
    {
      icon: "✨",
      title: "Curate",
      desc: "Discovers exactly what you need, when you need it"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "agents.page",
      initial: { opacity: 0, y: 13 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "portal-enter p-[21px] space-y-[34px]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-[13px] text-center pt-[13px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(EddiOrb, { mode: "EXPLORE", size: "lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-[8px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "font-display text-5xl font-black tracking-tight",
                style: {
                  background: "linear-gradient(135deg, oklch(0.82 0.18 82), oklch(0.75 0.22 72), oklch(0.68 0.18 82))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                },
                children: "EDDI"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-white/50 max-w-sm mx-auto", children: "One sovereign intelligence. Seven modes of mastery." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-[13px]", children: MODE_CARDS.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": `agents.mode_card.${i + 1}`,
            initial: { opacity: 0, y: 13 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.07 },
            className: "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:bg-white/8 hover:border-white/20 transition-all duration-300",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl leading-none", children: card.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-[5px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-display font-bold text-sm",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.82 0.18 82), oklch(0.75 0.22 72))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    },
                    children: card.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/45 leading-relaxed", children: card.desc })
              ] })
            ]
          },
          card.title
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center pb-[8px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/25 font-mono tracking-wide", children: "All modes are EDDI. One mind, seven lenses." }) })
      ]
    }
  );
}
export {
  StudentAgents as default
};
