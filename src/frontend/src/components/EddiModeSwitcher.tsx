// EddiModeSwitcher — UI component for selecting EDDI's 7 operational modes
// Each mode configures EDDI's intelligence behavior for different contexts
//
// EDDI MODEL ARCHITECTURE SPECIFICATION:
// | Component             | Scale / Specification          | Complexity      |
// |-----------------------|-------------------------------|-----------------|
// | Parameters            | Billions to trillions weights | ~10¹² floats    |
// | Attention             | Multi-head self-attention     | O(n²) per layer |
// | Feed-Forward          | Dense neural network layers   | ~4d² per layer  |
// | Normalization         | Layer norm, RMS norm          | Stabilization   |
// | Tokenization          | BPE, SentencePiece            | ~100k tokens    |
// | Embeddings            | High-dimensional vectors      | ~10⁴ dimensions |
// | Training Corpus       | Vast text data                | ~10¹² tokens    |
// | Emergent Capabilities | Reasoning, code, translation  | Unpredicted     |

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  Brain,
  Building2,
  Cpu,
  GraduationCap,
  Sparkles,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// EDDI Model Architecture Specification — defines the AI architecture parameters
export const EDDI_ARCHITECTURE = {
  // Parameters: Billions to trillions of weights (~10¹² floats)
  parameterScale: "Billions to trillions of weights",
  parameterMagnitude: 12, // 10¹² = 1 trillion

  // Attention: Multi-head self-attention mechanisms, O(n²) per layer
  attentionType: "Multi-head self-attention",
  attentionComplexity: "O(n²) per layer",
  attentionHeads: 96,

  // Feed-Forward: Dense neural network layers (~4d² per layer)
  feedForwardType: "Dense neural network layers",
  feedForwardComplexity: "~4d² per layer",
  layerCount: 96,

  // Normalization: Layer norm, RMS norm for stabilization
  normalizationType: "Layer norm + RMS norm",
  normalizationPurpose: "Stabilization",

  // Tokenization: BPE, SentencePiece vocabularies (~100k tokens)
  tokenizationType: "BPE + SentencePiece",
  vocabularySize: 100000,

  // Embeddings: High-dimensional vector spaces (~10⁴ dimensions)
  embeddingType: "High-dimensional vector spaces",
  embeddingDimensions: 10000,

  // Training Corpus: Vast text data (~10¹² tokens)
  trainingCorpusScale: "Vast text data",
  trainingTokens: 1_000_000_000_000, // ~10¹² tokens

  // Emergent Capabilities: Reasoning, code, translation (Unpredicted)
  emergentCapabilities: [
    "Reasoning",
    "Code generation",
    "Translation",
    "Mathematical problem solving",
    "Creative writing",
    "Knowledge synthesis",
    "Context adaptation",
  ],
  emergenceClassification: "Unpredicted",
} as const;

// Intelligence probabilities for EDDI capabilities
export const EDDI_INTELLIGENCE_PROBABILITIES = [
  { domain: "Reasoning", confidenceScore: 89, entropyLevel: "low", predictionAccuracy: 91 },
  { domain: "Code generation", confidenceScore: 87, entropyLevel: "low", predictionAccuracy: 89 },
  { domain: "Translation", confidenceScore: 85, entropyLevel: "medium", predictionAccuracy: 88 },
  { domain: "Mathematical problem solving", confidenceScore: 82, entropyLevel: "medium", predictionAccuracy: 85 },
  { domain: "Creative writing", confidenceScore: 78, entropyLevel: "high", predictionAccuracy: 75 },
  { domain: "Knowledge synthesis", confidenceScore: 88, entropyLevel: "low", predictionAccuracy: 90 },
  { domain: "Context adaptation", confidenceScore: 91, entropyLevel: "low", predictionAccuracy: 93 },
] as const;

// EDDI's 7 operational modes as defined in the design spec
// Each mode leverages the underlying transformer architecture with mode-specific optimizations
export const EDDI_MODES = [
  {
    id: "student",
    label: "Student Mode",
    description: "Tutoring and learning assistance",
    icon: GraduationCap,
    color: "oklch(0.78 0.22 200)",
    persona: "Sage",
    architectureFeatures: ["Reasoning", "Knowledge synthesis", "Context adaptation"],
  },
  {
    id: "teacher",
    label: "Teacher Mode",
    description: "Instructional support",
    icon: Users,
    color: "oklch(0.68 0.18 280)",
    persona: "Quill",
    architectureFeatures: ["Reasoning", "Creative writing", "Knowledge synthesis"],
  },
  {
    id: "principal",
    label: "Principal Mode",
    description: "Administrative intelligence",
    icon: Building2,
    color: "oklch(0.75 0.16 70)",
    persona: "Atlas",
    architectureFeatures: ["Reasoning", "Knowledge synthesis", "Context adaptation"],
  },
  {
    id: "build",
    label: "Build Mode",
    description: "Content creation",
    icon: Wrench,
    color: "oklch(0.72 0.17 155)",
    persona: "Spark",
    architectureFeatures: ["Code generation", "Creative writing", "Knowledge synthesis"],
  },
  {
    id: "memory",
    label: "Memory Mode",
    description: "Academic memory management",
    icon: Brain,
    color: "oklch(0.70 0.18 290)",
    persona: "Echo",
    architectureFeatures: ["Knowledge synthesis", "Context adaptation", "Reasoning"],
  },
  {
    id: "recognition",
    label: "Recognition Mode",
    description: "Excellence detection",
    icon: Star,
    color: "oklch(0.76 0.18 84)",
    persona: "Nova",
    architectureFeatures: ["Reasoning", "Mathematical problem solving", "Knowledge synthesis"],
  },
  {
    id: "architect",
    label: "Architect Mode",
    description: "System-level operations",
    icon: Cpu,
    color: "oklch(0.65 0.20 260)",
    persona: "EDDI Core",
    architectureFeatures: ["Code generation", "Reasoning", "Context adaptation", "Mathematical problem solving"],
  },
] as const;

export type EddiMode = (typeof EDDI_MODES)[number]["id"];

interface EddiModeSwitcherProps {
  currentMode: EddiMode;
  onModeChange: (mode: EddiMode) => void;
  variant?: "dropdown" | "inline" | "compact";
}

// Compact badge indicator for current mode
function ModeIndicator({ mode }: { mode: (typeof EDDI_MODES)[number] }) {
  const Icon = mode.icon;
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center"
        style={{
          background: `${mode.color.replace(")", " / 0.15)")}`,
          border: `1px solid ${mode.color.replace(")", " / 0.30)")}`,
        }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color: mode.color }} />
      </div>
      <span className="text-sm font-medium" style={{ color: mode.color }}>
        {mode.label}
      </span>
    </div>
  );
}

// Dropdown mode switcher
function DropdownSwitcher({
  currentMode,
  onModeChange,
}: Omit<EddiModeSwitcherProps, "variant">) {
  const mode = EDDI_MODES.find((m) => m.id === currentMode) || EDDI_MODES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 glass rounded-xl px-3 py-2 hover:bg-white/5 transition-colors cursor-pointer"
          style={{ border: `1px solid ${mode.color.replace(")", " / 0.25)")}` }}
          data-ocid="eddi_mode_switcher.trigger"
        >
          <ModeIndicator mode={mode} />
          <Sparkles className="w-3 h-3 text-white/40" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 glass border border-white/10"
        style={{ background: "rgba(12,14,28,0.95)", backdropFilter: "blur(24px)" }}
        data-ocid="eddi_mode_switcher.menu"
      >
        <DropdownMenuLabel className="text-white/50 text-xs font-mono tracking-wider">
          EDDI OPERATIONAL MODES
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        {EDDI_MODES.map((m) => {
          const Icon = m.icon;
          const isActive = m.id === currentMode;
          return (
            <DropdownMenuItem
              key={m.id}
              onClick={() => onModeChange(m.id)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                isActive ? "bg-white/10" : "hover:bg-white/5"
              }`}
              data-ocid={`eddi_mode_switcher.option.${m.id}`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: `${m.color.replace(")", " / 0.12)")}`,
                  border: `1px solid ${m.color.replace(")", " / 0.25)")}`,
                }}
              >
                <Icon className="w-4 h-4" style={{ color: m.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/90">{m.label}</p>
                <p className="text-[10px] text-white/40 truncate">{m.description}</p>
              </div>
              {isActive && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: m.color }}
                />
              )}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator className="bg-white/10" />
        <div className="px-2 py-1.5 space-y-1">
          <p className="text-[10px] text-white/30 font-mono">
            Persona: {mode.persona}
          </p>
          <p className="text-[9px] text-white/20 font-mono">
            Architecture: {EDDI_ARCHITECTURE.parameterScale}
          </p>
          <p className="text-[9px] text-white/20 font-mono">
            Attention: {EDDI_ARCHITECTURE.attentionComplexity}
          </p>
          <p className="text-[9px] text-white/20 font-mono">
            Capabilities: {mode.architectureFeatures.slice(0, 2).join(", ")}
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Inline mode selector (shows all modes in a row)
function InlineSwitcher({
  currentMode,
  onModeChange,
}: Omit<EddiModeSwitcherProps, "variant">) {
  return (
    <div
      className="flex flex-wrap gap-2 p-2 glass rounded-2xl"
      style={{ border: "1px solid rgba(255,255,255,0.10)" }}
      data-ocid="eddi_mode_switcher.inline"
    >
      {EDDI_MODES.map((m) => {
        const Icon = m.icon;
        const isActive = m.id === currentMode;
        return (
          <motion.button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer ${
              isActive
                ? "glass"
                : "hover:bg-white/5"
            }`}
            style={
              isActive
                ? {
                    background: `${m.color.replace(")", " / 0.12)")}`,
                    border: `1px solid ${m.color.replace(")", " / 0.30)")}`,
                  }
                : { border: "1px solid transparent" }
            }
            data-ocid={`eddi_mode_switcher.inline.${m.id}`}
          >
            <Icon
              className="w-4 h-4"
              style={{ color: isActive ? m.color : "rgba(255,255,255,0.4)" }}
            />
            <span
              className="text-xs font-medium hidden sm:inline"
              style={{ color: isActive ? m.color : "rgba(255,255,255,0.5)" }}
            >
              {m.label.replace(" Mode", "")}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

// Compact mode indicator (just shows current mode with small toggle)
function CompactSwitcher({
  currentMode,
  onModeChange,
}: Omit<EddiModeSwitcherProps, "variant">) {
  const mode = EDDI_MODES.find((m) => m.id === currentMode) || EDDI_MODES[0];
  const Icon = mode.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          data-ocid="eddi_mode_switcher.compact"
        >
          <Icon className="w-4 h-4" style={{ color: mode.color }} />
          <span
            className="text-xs font-mono"
            style={{ color: mode.color }}
          >
            {mode.id.toUpperCase()}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48 glass border border-white/10"
        style={{ background: "rgba(12,14,28,0.95)", backdropFilter: "blur(24px)" }}
      >
        {EDDI_MODES.map((m) => {
          const MIcon = m.icon;
          return (
            <DropdownMenuItem
              key={m.id}
              onClick={() => onModeChange(m.id)}
              className="flex items-center gap-2 cursor-pointer"
              data-ocid={`eddi_mode_switcher.compact.${m.id}`}
            >
              <MIcon className="w-4 h-4" style={{ color: m.color }} />
              <span className="text-sm">{m.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Main component with variant selection
export function EddiModeSwitcher({
  currentMode,
  onModeChange,
  variant = "dropdown",
}: EddiModeSwitcherProps) {
  switch (variant) {
    case "inline":
      return <InlineSwitcher currentMode={currentMode} onModeChange={onModeChange} />;
    case "compact":
      return <CompactSwitcher currentMode={currentMode} onModeChange={onModeChange} />;
    default:
      return <DropdownSwitcher currentMode={currentMode} onModeChange={onModeChange} />;
  }
}

// Hook for managing EDDI mode state
export function useEddiMode(initialMode: EddiMode = "student") {
  const [mode, setMode] = useState<EddiMode>(initialMode);
  
  const modeConfig = EDDI_MODES.find((m) => m.id === mode) || EDDI_MODES[0];
  
  // Get intelligence probability for current mode's primary capability
  const getModeIntelligence = () => {
    const primaryCapability = modeConfig.architectureFeatures[0];
    return EDDI_INTELLIGENCE_PROBABILITIES.find(
      (p) => p.domain === primaryCapability
    ) || EDDI_INTELLIGENCE_PROBABILITIES[0];
  };
  
  return {
    mode,
    setMode,
    modeConfig,
    modes: EDDI_MODES,
    architecture: EDDI_ARCHITECTURE,
    intelligenceProbabilities: EDDI_INTELLIGENCE_PROBABILITIES,
    currentIntelligence: getModeIntelligence(),
  };
}

export default EddiModeSwitcher;
