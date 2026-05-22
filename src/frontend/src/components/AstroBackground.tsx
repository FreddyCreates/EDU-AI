// AstroBackground — Animated deep-space educational star field.
// Renders a layered cosmic background with:
//   • Twinkling stars in 3 depth layers (far/mid/near)
//   • Knowledge nebula blobs (colored by educational domain)
//   • PHI-positioned constellation nodes
//   • Subtle orbital ring effects
//
// Education-themed: star densities, nebula colors, and node labels
// all tie directly to EDDI's educational domains.
// Zero external dependencies — pure React + CSS animation.

import { motion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  layer: "far" | "mid" | "near";
}

interface NebulaBlob {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
  duration: number;
}

interface ConstellationNode {
  id: number;
  x: number;
  y: number;
  label: string;
  color: string;
  size: number;
}

// ── PHI-seeded pseudo-random number ─────────────────────────────────────────
// Uses the golden ratio to generate a stable sequence without a random seed,
// giving deterministic layout that doesn't re-render on each mount.
const PHI = 1.6180339887;
function phiSeq(index: number, modulus = 1): number {
  return ((index * PHI) % 1) * modulus;
}

// ── Educational domain colors (matching EDDI engine palette) ─────────────────
const DOMAIN_COLORS = [
  "oklch(0.78 0.22 200)",  // Math — cyan
  "oklch(0.68 0.18 280)",  // Science — purple
  "oklch(0.76 0.18 84)",   // History — gold
  "oklch(0.72 0.17 155)",  // English — teal
  "oklch(0.72 0.16 185)",  // Languages — blue-teal
  "oklch(0.75 0.16 70)",   // Arts — amber
];

const DOMAIN_LABELS = [
  "MATH", "SCIENCE", "HISTORY",
  "ENGLISH", "LANGUAGE", "ARTS",
];

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => {
    const layerIdx = i % 3;
    const layer: Star["layer"] =
      layerIdx === 0 ? "far" : layerIdx === 1 ? "mid" : "near";
    const layerScale = layer === "far" ? 0.5 : layer === "mid" ? 0.8 : 1.0;
    return {
      id: i,
      x: phiSeq(i * 7 + 3) * 100,
      y: phiSeq(i * 11 + 5) * 100,
      size: (0.5 + phiSeq(i * 13) * 1.5) * layerScale,
      opacity: 0.1 + phiSeq(i * 17) * 0.5 * layerScale,
      duration: 2 + phiSeq(i * 19) * 4,
      delay: phiSeq(i * 23) * 3,
      layer,
    };
  });
}

function generateNebulae(count: number): NebulaBlob[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: phiSeq(i * 31 + 7) * 90 + 5,
    y: phiSeq(i * 37 + 11) * 90 + 5,
    width: 180 + phiSeq(i * 41) * 320,
    height: 120 + phiSeq(i * 43) * 200,
    color: DOMAIN_COLORS[i % DOMAIN_COLORS.length],
    opacity: 0.02 + phiSeq(i * 47) * 0.04,
    duration: 8 + phiSeq(i * 53) * 12,
  }));
}

function generateConstellationNodes(count: number): ConstellationNode[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    // PHI-spiral positions
    x: 50 + Math.cos(i * PHI * 2 * Math.PI) * (20 + i * 2.5),
    y: 50 + Math.sin(i * PHI * 2 * Math.PI) * (20 + i * 2.5),
    label: DOMAIN_LABELS[i % DOMAIN_LABELS.length],
    color: DOMAIN_COLORS[i % DOMAIN_COLORS.length],
    size: 2 + (i % 3),
  }));
}

interface AstroBackgroundProps {
  /** Number of stars to render (default 144 — Fibonacci) */
  starCount?: number;
  /** Number of nebula blobs (default 8) */
  nebulaCount?: number;
  /** Show PHI-spiral constellation nodes (default true) */
  showConstellation?: boolean;
  /** Fixed height; if omitted the element is position:fixed covering the viewport */
  fixed?: boolean;
  /** Reduce motion for users with prefers-reduced-motion */
  reducedMotion?: boolean;
  className?: string;
}

export default function AstroBackground({
  starCount = 144,
  nebulaCount = 8,
  showConstellation = true,
  fixed = true,
  reducedMotion = false,
  className = "",
}: AstroBackgroundProps) {
  const stars = useMemo(() => generateStars(starCount), [starCount]);
  const nebulae = useMemo(() => generateNebulae(nebulaCount), [nebulaCount]);
  const nodes = useMemo(() => generateConstellationNodes(6), []);

  const posClass = fixed
    ? "fixed inset-0 w-full h-full"
    : "absolute inset-0 w-full h-full";

  return (
    <div
      className={`${posClass} pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* ── Deep space base gradient ──────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(60,20,80,0.18) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 75% 70%, rgba(0,40,80,0.15) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 50% 50%, rgba(5,5,15,0.9) 0%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* ── Nebula blobs ─────────────────────────────────────────────────── */}
      {nebulae.map((n) => (
        <motion.div
          key={n.id}
          className="absolute rounded-full"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: n.width,
            height: n.height,
            background: n.color,
            opacity: n.opacity,
            filter: "blur(60px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={
            reducedMotion
              ? {}
              : {
                  scale: [1, 1.12, 0.96, 1],
                  opacity: [n.opacity, n.opacity * 1.6, n.opacity * 0.7, n.opacity],
                }
          }
          transition={{
            duration: n.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: n.id * 1.3,
          }}
        />
      ))}

      {/* ── Star field ───────────────────────────────────────────────────── */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
          animate={
            reducedMotion
              ? {}
              : {
                  opacity: [star.opacity, star.opacity * 2.2, star.opacity * 0.4, star.opacity],
                  scale: [1, 1.4, 0.8, 1],
                }
          }
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}

      {/* ── PHI-spiral constellation (educational domain nodes) ───────────── */}
      {showConstellation && (
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.12 }}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Connection lines between adjacent nodes */}
          {nodes.map((node, i) => {
            if (i === 0) return null;
            const prev = nodes[i - 1];
            return (
              <line
                key={`line-${i}`}
                x1={prev.x}
                y1={prev.y}
                x2={node.x}
                y2={node.y}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.15"
                strokeDasharray="0.5 0.8"
              />
            );
          })}
          {/* Domain nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size * 0.4}
                fill={node.color}
                opacity={0.7}
              />
              <text
                x={node.x}
                y={node.y - node.size * 0.7}
                textAnchor="middle"
                fill={node.color}
                fontSize="2.2"
                fontFamily="monospace"
                opacity={0.6}
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      )}

      {/* ── Orbital ring accent ───────────────────────────────────────────── */}
      <motion.div
        className="absolute"
        style={{
          width: "min(70vw, 70vh)",
          height: "min(70vw, 70vh)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(192,132,252,0.06)",
          borderRadius: "50%",
        }}
        animate={reducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 89, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute"
        style={{
          width: "min(55vw, 55vh)",
          height: "min(55vw, 55vh)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(100,200,255,0.05)",
          borderRadius: "50%",
        }}
        animate={reducedMotion ? {} : { rotate: -360 }}
        transition={{ duration: 144, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
