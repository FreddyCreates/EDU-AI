import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { u as useComposedRefs } from "./index-Ctl2T3XX.js";
import { P as Primitive, c as composeEventHandlers, a as createContextScope } from "./index-Dla_9Jug.js";
import { u as useControllableState } from "./index-DD4zw4TC.js";
import { a as usePrevious, u as useSize, C as Check } from "./index-DstPCoQp.js";
import { P as Presence } from "./index-BfPMFYr5.js";
import { i as createLucideIcon, c as cn, k as Shield, I as ClipboardList, u as ue, U as Users, g as Activity, J as SquareTerminal, Z as Zap, E as Globe, S as Skeleton } from "./index-BivnQ6bB.js";
import { I as Input } from "./input-dqEl3BdT.js";
import { L as Label } from "./label-CpNG7Eze.js";
import { u as useApiEndpoints, a as useApiStats, f as useRegisterApiCaller, e as useApiCallLogs } from "./use-apix-BV8BqXWi.js";
import { g as useListPendingRegistrations, h as useApproveClient } from "./useBackend-DrgJPcWN.js";
import { T as Terminal, R as Radio, K as Key } from "./terminal-B_j_OuFG.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { S as ShieldCheck } from "./shield-check-5IduDo33.js";
import { A as ArrowRight } from "./arrow-right-CsqnM8Ko.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
import "./router-D6GUppNf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const GREEN = "oklch(0.72 0.17 155)";
const GREEN_BG = "rgba(0,220,130,0.10)";
const GREEN_GLOW = "0 0 18px rgba(0,220,130,0.25)";
const FALLBACK_ENDPOINTS = [
  {
    id: "ep_phix_01",
    name: "PHI Compute",
    path: "v1/phi/compute",
    method: "POST",
    version: "v1",
    domain: "JLIA",
    substrateDomain: "Julia Runtime",
    description: "PHIX golden ratio arithmetic — PHI, PHI_INV, PHI³",
    requiresAuth: true,
    rateLimit: BigInt(144),
    sealedAt: BigInt(0)
  },
  {
    id: "ep_fibr_01",
    name: "Fibonacci Floor",
    path: "v1/fib/floor",
    method: "POST",
    version: "v1",
    domain: "JLIA",
    substrateDomain: "Julia Runtime",
    description: "FLOR Fibonacci floor function — deterministic integer rounding",
    requiresAuth: true,
    rateLimit: BigInt(233),
    sealedAt: BigInt(0)
  },
  {
    id: "ep_vekt_01",
    name: "Vector Query",
    path: "v1/knowledge/vector",
    method: "POST",
    version: "v1",
    domain: "JLIA",
    substrateDomain: "Julia Runtime",
    description: "VEKT dot-product retrieval from PHANTM knowledge corpus",
    requiresAuth: true,
    rateLimit: BigInt(89),
    sealedAt: BigInt(0)
  },
  {
    id: "ep_engr_01",
    name: "Engine Registry",
    path: "v1/registry/engines",
    method: "GET",
    version: "v1",
    domain: "RGST",
    substrateDomain: "ICP Motoko",
    description: "List all registered engines with live stats",
    requiresAuth: false,
    rateLimit: BigInt(377),
    sealedAt: BigInt(0)
  },
  {
    id: "ep_cohs_01",
    name: "Coherence Score",
    path: "v1/coherence/score",
    method: "POST",
    version: "v1",
    domain: "JLIA",
    substrateDomain: "Julia Runtime",
    description: "COHS coherence scoring from phase output vectors",
    requiresAuth: true,
    rateLimit: BigInt(144),
    sealedAt: BigInt(0)
  },
  {
    id: "ep_pass_01",
    name: "Passport Summary",
    path: "v1/passport/summary",
    method: "GET",
    version: "v1",
    domain: "EMRT",
    substrateDomain: "Memory Runtime",
    description: "Student passport mastery summary (auth-gated)",
    requiresAuth: true,
    rateLimit: BigInt(55),
    sealedAt: BigInt(0)
  }
];
const FALLBACK_LOGS = [
  {
    endpointId: "v1/phi/compute",
    callerId: "PHIX-bridge",
    timestamp: BigInt(Date.now()) * BigInt(1e6),
    success: true,
    responseTime: BigInt(13e5)
  },
  {
    endpointId: "v1/fib/floor",
    callerId: "FIBR-agent",
    timestamp: BigInt(Date.now() - 3e3) * BigInt(1e6),
    success: true,
    responseTime: BigInt(8e5)
  },
  {
    endpointId: "v1/coherence/score",
    callerId: "COHS-caller",
    timestamp: BigInt(Date.now() - 8e3) * BigInt(1e6),
    success: true,
    responseTime: BigInt(21e5)
  },
  {
    endpointId: "v1/registry/engines",
    callerId: "ENGR-watch",
    timestamp: BigInt(Date.now() - 13e3) * BigInt(1e6),
    success: false,
    responseTime: BigInt(4e5)
  },
  {
    endpointId: "v1/knowledge/vector",
    callerId: "VEKT-query",
    timestamp: BigInt(Date.now() - 21e3) * BigInt(1e6),
    success: true,
    responseTime: BigInt(6e5)
  },
  {
    endpointId: "v1/passport/summary",
    callerId: "PASS-engine",
    timestamp: BigInt(Date.now() - 34e3) * BigInt(1e6),
    success: true,
    responseTime: BigInt(18e5)
  },
  {
    endpointId: "v1/phi/compute",
    callerId: "VEKT-bridge",
    timestamp: BigInt(Date.now() - 55e3) * BigInt(1e6),
    success: true,
    responseTime: BigInt(9e5)
  },
  {
    endpointId: "v1/fib/floor",
    callerId: "GATE-check",
    timestamp: BigInt(Date.now() - 89e3) * BigInt(1e6),
    success: true,
    responseTime: BigInt(5e5)
  },
  {
    endpointId: "v1/coherence/score",
    callerId: "META-scan",
    timestamp: BigInt(Date.now() - 144e3) * BigInt(1e6),
    success: true,
    responseTime: BigInt(11e5)
  },
  {
    endpointId: "v1/registry/engines",
    callerId: "SDKR-lookup",
    timestamp: BigInt(Date.now() - 233e3) * BigInt(1e6),
    success: true,
    responseTime: BigInt(7e5)
  },
  {
    endpointId: "v1/knowledge/vector",
    callerId: "AUTN-cycle",
    timestamp: BigInt(Date.now() - 377e3) * BigInt(1e6),
    success: true,
    responseTime: BigInt(14e5)
  },
  {
    endpointId: "v1/passport/summary",
    callerId: "COHR-agent",
    timestamp: BigInt(Date.now() - 61e4) * BigInt(1e6),
    success: false,
    responseTime: BigInt(3e5)
  },
  {
    endpointId: "v1/phi/compute",
    callerId: "SPRL-engine",
    timestamp: BigInt(Date.now() - 987e3) * BigInt(1e6),
    success: true,
    responseTime: BigInt(2e6)
  }
];
const FIB_TIERS = [
  {
    label: "TIER_1",
    limit: 5,
    color: "oklch(0.72 0.17 155)",
    bg: "rgba(0,220,130,0.10)"
  },
  {
    label: "TIER_2",
    limit: 21,
    color: "oklch(0.76 0.16 70)",
    bg: "rgba(255,185,0,0.10)"
  },
  {
    label: "TIER_3",
    limit: 55,
    color: "oklch(0.75 0.16 280)",
    bg: "rgba(160,100,255,0.10)"
  }
];
function getFibTier(limit) {
  if (limit <= 5) return FIB_TIERS[0];
  if (limit <= 21) return FIB_TIERS[1];
  return FIB_TIERS[2];
}
const METHOD_COLOR = {
  GET: GREEN,
  POST: "oklch(0.68 0.18 280)",
  PUT: "oklch(0.76 0.16 70)",
  DELETE: "oklch(0.65 0.22 22)"
};
const DOMAIN_COLOR = {
  JLIA: "oklch(0.75 0.16 280)",
  ICPM: GREEN,
  EMRT: "oklch(0.76 0.16 70)",
  RGST: "oklch(0.78 0.15 200)",
  EART: "oklch(0.73 0.14 190)"
};
function fmtTs(ts) {
  const d = new Date(Number(ts) / 1e6);
  return d.toLocaleTimeString("en-US", { hour12: false });
}
function fmtMs(ns) {
  return `${(Number(ns) / 1e6).toFixed(1)}ms`;
}
function StatsRow() {
  const { data: stats, isLoading } = useApiStats();
  const cards = [
    {
      label: "Total Calls",
      value: stats ? Number(stats.totalCalls).toLocaleString() : isLoading ? null : "12,840",
      icon: Zap,
      ocid: "apix.stat_card.1"
    },
    {
      label: "Active Keys",
      value: stats ? Number(stats.activeEndpoints).toLocaleString() : isLoading ? null : "7",
      icon: Key,
      ocid: "apix.stat_card.2"
    },
    {
      label: "Endpoints",
      value: stats ? Number(stats.totalEndpoints).toLocaleString() : isLoading ? null : "6",
      icon: Globe,
      ocid: "apix.stat_card.3"
    },
    {
      label: "Avg Latency",
      value: stats ? `${Number(stats.totalCalls)}calls` : isLoading ? null : "1.3ms",
      icon: Activity,
      ocid: "apix.stat_card.4"
    },
    {
      label: "Success Rate",
      value: stats ? `${Number(stats.activeEndpoints)} active` : isLoading ? null : "98.7%",
      icon: ShieldCheck,
      ocid: "apix.stat_card.5"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3",
      "data-ocid": "apix.stats_row",
      children: cards.map(({ label, value, icon: Icon, ocid }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.07 },
          "data-ocid": ocid,
          className: "glass-portal-it rounded-2xl px-5 py-4",
          style: { boxShadow: GREEN_GLOW },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5", style: { color: GREEN } })
            ] }),
            value === null ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-20 rounded" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-display text-xl font-bold",
                style: { color: GREEN },
                children: value
              }
            )
          ]
        },
        label
      ))
    }
  );
}
function EndpointGrid() {
  const { data: endpoints, isLoading } = useApiEndpoints();
  const [copied, setCopied] = reactExports.useState(null);
  const rows = endpoints && endpoints.length > 0 ? endpoints : FALLBACK_ENDPOINTS;
  const copyPath = (path) => {
    navigator.clipboard.writeText(`https://apix.eduai.sovereign/api/${path}`);
    setCopied(path);
    ue.success("Endpoint URL copied");
    setTimeout(() => setCopied(null), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-lg rounded-2xl overflow-hidden",
      "data-ocid": "apix.endpoint_grid",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-5 pt-5 pb-3 border-b",
            style: { borderColor: "rgba(0,220,130,0.12)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquareTerminal, { className: "h-4 w-4", style: { color: GREEN } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Registered Endpoints" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: "ml-auto text-[9px] px-2 py-0.5 border-0",
                  style: { background: GREEN_BG, color: GREEN },
                  children: "APIX v1"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 space-y-2.5", children: isLoading ? Array.from({ length: 4 }, (_, k) => k).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) : rows.map((ep, i) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -8 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.05 + i * 0.06 },
              "data-ocid": `apix.endpoint.${i + 1}`,
              className: "glass-portal-it rounded-xl p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-mono text-xs font-bold shrink-0 w-12",
                        style: { color: METHOD_COLOR[ep.method] ?? GREEN },
                        children: ep.method
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground font-semibold truncate", children: ep.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground truncate", children: [
                        "/api/",
                        ep.path
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        className: "text-[9px] px-1.5 border-0",
                        style: {
                          background: ep.requiresAuth ? "rgba(255,185,0,0.10)" : GREEN_BG,
                          color: ep.requiresAuth ? "oklch(0.76 0.16 70)" : GREEN
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-2.5 w-2.5 mr-0.5 inline" }),
                          ep.requiresAuth ? "AUTH" : "PUBLIC"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `apix.copy_button.${i + 1}`,
                        onClick: () => copyPath(ep.path),
                        className: "glass-sm rounded-lg p-1.5 text-muted-foreground hover:text-foreground transition-smooth",
                        "aria-label": "Copy endpoint URL",
                        children: copied === ep.path ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleCheck,
                          {
                            className: "h-3.5 w-3.5",
                            style: { color: GREEN }
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mb-3 leading-snug", children: ep.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "px-2.5 py-1.5 rounded-lg",
                      style: {
                        background: "rgba(0,220,130,0.08)",
                        border: "1px solid rgba(0,220,130,0.20)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-muted-foreground/60 uppercase block", children: "Lock ID" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-mono text-sm font-black tracking-widest",
                            style: { color: GREEN },
                            children: ((_a = ep.id.split("_")[0]) == null ? void 0 : _a.toUpperCase().slice(0, 4)) || ep.domain.slice(0, 4)
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/60 uppercase", children: "Substrate" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-mono text-[11px] font-bold",
                        style: { color: DOMAIN_COLOR[ep.domain] ?? GREEN },
                        children: ep.domain
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/60 uppercase", children: "Runtime" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-foreground", children: ep.substrateDomain })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/60 uppercase", children: "Version" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-foreground", children: ep.version })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/60 uppercase", children: "Rate Limit" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          className: "font-mono text-[11px]",
                          style: { color: GREEN },
                          children: [
                            Number(ep.rateLimit),
                            "/min"
                          ]
                        }
                      ),
                      (() => {
                        const tier = getFibTier(Number(ep.rateLimit));
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[8px] font-mono font-bold px-1.5 py-0.5 rounded",
                            style: {
                              background: tier.bg,
                              color: tier.color,
                              border: `1px solid ${tier.color}30`
                            },
                            children: tier.label
                          }
                        );
                      })()
                    ] })
                  ] })
                ] })
              ]
            },
            ep.id
          );
        }) })
      ]
    }
  );
}
function RegisterCallerForm({ endpoints }) {
  const [name, setName] = reactExports.useState("");
  const [domain, setDomain] = reactExports.useState("");
  const [pubKey, setPubKey] = reactExports.useState("");
  const [allowed, setAllowed] = reactExports.useState([]);
  const { mutate, isPending } = useRegisterApiCaller();
  const toggleEndpoint = (path) => {
    setAllowed(
      (prev) => prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !pubKey.trim()) {
      ue.error("Name and Public Key are required");
      return;
    }
    mutate(
      {
        id: `caller_${Date.now()}`,
        name: name.trim(),
        pubKey: pubKey.trim(),
        allowed
      },
      {
        onSuccess: () => {
          ue.success("API caller registered — GATE sealed");
          setName("");
          setDomain("");
          setPubKey("");
          setAllowed([]);
        },
        onError: () => ue.error("Registration failed — GATE rejected")
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-lg rounded-2xl overflow-hidden",
      "data-ocid": "apix.register_form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-5 pt-5 pb-3 border-b",
            style: { borderColor: "rgba(0,220,130,0.12)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4", style: { color: GREEN } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Register API Caller" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: "ml-auto text-[9px] px-2 py-0.5 border-0",
                  style: { background: GREEN_BG, color: GREEN },
                  children: "GATE-GATED"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Caller Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "apix.name_input",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: "e.g. PHIX-external-bridge",
                  className: "glass-sm bg-transparent border-[rgba(0,220,130,0.15)] text-foreground placeholder:text-muted-foreground/40 focus:border-[oklch(0.72_0.17_155)] font-mono text-sm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Domain" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "apix.domain_input",
                  value: domain,
                  onChange: (e) => setDomain(e.target.value),
                  placeholder: "e.g. JLIA, ICPM, EMRT",
                  className: "glass-sm bg-transparent border-[rgba(0,220,130,0.15)] text-foreground placeholder:text-muted-foreground/40 focus:border-[oklch(0.72_0.17_155)] font-mono text-sm"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Public Key" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "apix.pubkey_input",
                value: pubKey,
                onChange: (e) => setPubKey(e.target.value),
                placeholder: "Sovereign public key — hex or base64",
                className: "glass-sm bg-transparent border-[rgba(0,220,130,0.15)] text-foreground placeholder:text-muted-foreground/40 focus:border-[oklch(0.72_0.17_155)] font-mono text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Allowed Endpoints" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
                "data-ocid": "apix.endpoint_permissions",
                children: endpoints.map((ep, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: `ep-checkbox-${ep.id}`,
                    "data-ocid": `apix.endpoint_checkbox.${i + 1}`,
                    className: "glass-portal-it rounded-xl px-3 py-2.5 flex items-center gap-3 cursor-pointer hover:brightness-110 transition-smooth",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: `ep-checkbox-${ep.id}`,
                          checked: allowed.includes(ep.path),
                          onCheckedChange: () => toggleEndpoint(ep.path),
                          className: "border-[rgba(0,220,130,0.30)] data-[state=checked]:bg-[oklch(0.72_0.17_155)] data-[state=checked]:border-[oklch(0.72_0.17_155)]"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-foreground truncate", children: ep.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-muted-foreground/60 truncate", children: [
                          "/api/",
                          ep.path
                        ] })
                      ] })
                    ]
                  },
                  ep.id
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: isPending,
              "data-ocid": "apix.register_submit_button",
              className: "w-full font-mono font-bold text-sm",
              style: {
                background: GREEN_BG,
                color: GREEN,
                border: "1px solid rgba(0,220,130,0.25)",
                boxShadow: GREEN_GLOW
              },
              children: isPending ? "REGISTERING..." : "REGISTER CALLER → SEAL WITH GATE"
            }
          )
        ] })
      ]
    }
  );
}
function CallLogFeed() {
  const { data: logs, isLoading } = useApiCallLogs(BigInt(13));
  const rows = logs && logs.length > 0 ? logs : FALLBACK_LOGS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-lg rounded-2xl overflow-hidden",
      "data-ocid": "apix.call_log_feed",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-5 pt-5 pb-3 border-b",
            style: { borderColor: "rgba(0,220,130,0.12)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-4 w-4", style: { color: GREEN } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Live Call Log" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "h-1.5 w-1.5 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]",
                    style: { background: GREEN }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px]", style: { color: GREEN }, children: "LIVE · F(7)=13" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 space-y-2 max-h-[480px] overflow-y-auto", children: isLoading ? Array.from({ length: 6 }, (_, k) => k).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded-xl" }, k)) : rows.map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 6 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: idx * 0.04 },
            "data-ocid": `apix.log.item.${idx + 1}`,
            className: "glass-portal-it rounded-xl px-3 py-2.5 flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-2 w-2 rounded-full shrink-0",
                  style: {
                    background: log.success ? GREEN : "oklch(0.65 0.22 22)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-foreground flex-1 truncate min-w-0", children: log.endpointId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/70 shrink-0 hidden md:inline", children: log.callerId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3 text-muted-foreground/40 shrink-0 hidden md:inline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-[11px] shrink-0",
                  style: { color: log.success ? GREEN : "oklch(0.65 0.22 22)" },
                  children: fmtMs(log.responseTime)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground/60 shrink-0", children: fmtTs(log.timestamp) })
            ]
          },
          `${log.endpointId}-${log.callerId}-${String(log.timestamp)}`
        )) })
      ]
    }
  );
}
function ITApixGateway() {
  const { data: endpoints } = useApiEndpoints();
  const activeEndpoints = endpoints && endpoints.length > 0 ? endpoints : FALLBACK_ENDPOINTS;
  const { data: pendingRegs = [] } = useListPendingRegistrations();
  const approveClient = useApproveClient();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "portal-enter min-h-screen", "data-ocid": "apix.gateway_page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-xl glass-shimmer sticky top-0 z-30 border-b",
        style: { borderColor: "rgba(0,220,130,0.12)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1600px] mx-auto px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex h-10 w-10 items-center justify-center rounded-xl",
                style: { background: GREEN_BG, boxShadow: GREEN_GLOW },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "h-5 w-5", style: { color: GREEN } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "font-display text-lg font-bold leading-tight",
                  style: {
                    color: GREEN,
                    textShadow: "0 0 20px rgba(0,220,130,0.35)"
                  },
                  children: "APIX SOVEREIGN GATEWAY"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono", children: "Versioned · Identity-gated · GATE-enforced · LEX_PONT" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: "GATE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-[11px]",
                  style: { color: GREEN },
                  children: "ENFORCED"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-px bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: "LEX_SOVEREIGNUS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "h-1.5 w-1.5 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]",
                  style: { background: GREEN }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-px bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: "NO EXTERNAL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleCheck,
                {
                  className: "h-3.5 w-3.5",
                  style: { color: GREEN }
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "text-xs font-mono font-bold border",
              style: {
                background: GREEN_BG,
                color: GREEN,
                borderColor: "rgba(0,220,130,0.25)",
                boxShadow: GREEN_GLOW
              },
              children: "v1 LIVE"
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1600px] mx-auto px-6 py-6 space-y-[var(--phi-21)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.38 },
          className: "glass-portal-it rounded-xl p-6",
          style: { boxShadow: GREEN_GLOW },
          "data-ocid": "apix.pending_registrations_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex h-8 w-8 items-center justify-center rounded-lg",
                  style: { background: GREEN_BG },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4", style: { color: GREEN } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Pending Registrations" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: "ml-auto text-[9px] px-2 py-0.5 border-0 font-mono",
                  style: { background: GREEN_BG, color: GREEN },
                  children: [
                    pendingRegs.length,
                    " pending"
                  ]
                }
              )
            ] }),
            pendingRegs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-sm rounded-xl p-6 flex flex-col items-center gap-3",
                style: { border: "1px dashed rgba(0,220,130,0.18)" },
                "data-ocid": "apix.pending_registrations_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ClipboardList,
                    {
                      className: "h-8 w-8",
                      style: { color: GREEN, opacity: 0.4 }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "No pending registrations. External clients submit requests via the Register form below." })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: pendingRegs.map((req, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": `apix.pending_reg.${idx + 1}`,
                className: "glass-sm rounded-xl p-4",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: "name" in req ? String(req.name) : "Unknown Client" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: "description" in req ? String(req.description) : "" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-2", children: "requestedEndpoints" in req && Array.isArray(req.requestedEndpoints) && req.requestedEndpoints.map((ep) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: "text-[9px] px-1.5 border-0 font-mono",
                        style: { background: GREEN_BG, color: GREEN },
                        children: ep
                      },
                      ep
                    )) }),
                    "submittedAt" in req && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60 font-mono mt-1", children: new Date(
                      Number(req.submittedAt) / 1e6
                    ).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      "data-ocid": `apix.approve_button.${idx + 1}`,
                      onClick: () => approveClient.mutate(
                        {
                          requestId: "requestId" in req ? String(req.requestId) : "",
                          apiKey: crypto.randomUUID()
                        },
                        {
                          onSuccess: () => ue.success("Client approved — API key issued"),
                          onError: () => ue.error("Approval failed")
                        }
                      ),
                      disabled: approveClient.isPending,
                      className: "shrink-0 font-mono text-xs font-bold",
                      style: {
                        background: GREEN_BG,
                        color: GREEN,
                        border: "1px solid rgba(0,220,130,0.25)",
                        boxShadow: GREEN_GLOW
                      },
                      children: "Approve"
                    }
                  )
                ] })
              },
              "requestId" in req ? String(req.requestId) : String(idx)
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.06 },
          className: "glass-portal-it rounded-xl p-6",
          style: { boxShadow: GREEN_GLOW },
          "data-ocid": "apix.active_clients_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex h-8 w-8 items-center justify-center rounded-lg",
                  style: { background: GREEN_BG },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4", style: { color: GREEN } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Active Clients" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-sm rounded-xl p-6 flex flex-col items-center gap-3",
                style: { border: "1px dashed rgba(0,220,130,0.18)" },
                "data-ocid": "apix.active_clients_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8", style: { color: GREEN, opacity: 0.4 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "No external clients registered yet." })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4", style: { color: GREEN } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "Gateway Stats" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "h-1.5 w-1.5 rounded-full ml-1 animate-[status-pulse_2s_ease-in-out_infinite]",
                  style: { background: GREEN }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px]", style: { color: GREEN }, children: "LIVE" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatsRow, {})
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquareTerminal, { className: "h-4 w-4", style: { color: GREEN } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "Sovereign Endpoints" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(EndpointGrid, {})
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.18 },
          className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4", style: { color: GREEN } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "Register Caller" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterCallerForm, { endpoints: activeEndpoints })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-4 w-4", style: { color: GREEN } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "API Activity" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CallLogFeed, {})
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-portal-it rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-3",
          "data-ocid": "apix.law_banner",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 shrink-0", style: { color: GREEN } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: GREEN }, className: "font-bold", children: "LEX_PONT" }),
                " ",
                "— Every bridge is sovereign and native. No bridge calls a commercial runtime."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ShieldCheck,
                {
                  className: "h-4 w-4 shrink-0",
                  style: { color: GREEN }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: GREEN }, className: "font-bold", children: "LEX_RGST" }),
                " ",
                "— All endpoints sealed with 4-letter lock names. Identity permanent."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/50 font-mono", children: "APIX SOVEREIGN GATEWAY · No external calls · No commercial dependencies · LEX_SOVEREIGNUS ENFORCED" }) })
    ] })
  ] });
}
export {
  ITApixGateway as default
};
