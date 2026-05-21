import type { Portal } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const PORTAL_COLORS: Record<
  Portal,
  { from: string; to: string; accent: string }
> = {
  student: {
    from: "rgba(0, 210, 255, 0.0)",
    to: "rgba(0, 210, 255, 0.18)",
    accent: "oklch(0.78 0.22 200)",
  },
  teacher: {
    from: "rgba(160, 100, 255, 0.0)",
    to: "rgba(160, 100, 255, 0.18)",
    accent: "oklch(0.68 0.18 280)",
  },
  principal: {
    from: "rgba(255, 185, 0, 0.0)",
    to: "rgba(255, 185, 0, 0.18)",
    accent: "oklch(0.75 0.16 70)",
  },
  it: {
    from: "rgba(0, 220, 130, 0.0)",
    to: "rgba(0, 220, 130, 0.18)",
    accent: "oklch(0.72 0.17 155)",
  },
  parent: {
    from: "rgba(255, 120, 80, 0.0)",
    to: "rgba(255, 120, 80, 0.18)",
    accent: "oklch(0.72 0.18 40)",
  },
  counselor: {
    from: "rgba(80, 200, 180, 0.0)",
    to: "rgba(80, 200, 180, 0.18)",
    accent: "oklch(0.74 0.16 175)",
  },
  district: {
    from: "rgba(200, 80, 200, 0.0)",
    to: "rgba(200, 80, 200, 0.18)",
    accent: "oklch(0.68 0.20 315)",
  },
};

interface PortalTransitionOverlayProps {
  portal: Portal;
  isTransitioning: boolean;
  onComplete: () => void;
}

export function PortalTransitionOverlay({
  portal,
  isTransitioning,
  onComplete,
}: PortalTransitionOverlayProps) {
  const colors = PORTAL_COLORS[portal];

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isTransitioning && (
        <motion.div
          key={`transition-${portal}`}
          data-ocid="portal.transition_overlay"
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: [0, 1, 0], scale: [0.95, 1, 1.05] }}
          transition={{ duration: 0.8, times: [0, 0.38, 1], ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${colors.to}, transparent 70%)`,
            backdropFilter: "blur(2px) saturate(180%)",
          }}
        >
          {/* Accent ring */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 2.0] }}
            transition={{
              duration: 0.8,
              times: [0, 0.382, 1],
              ease: "easeOut",
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: 240,
                height: 240,
                border: `1px solid ${colors.accent}`,
                boxShadow: `0 0 80px ${colors.to}, 0 0 160px ${colors.from}`,
              }}
            />
          </motion.div>
          {/* Scan line */}
          <motion.div
            className="absolute inset-x-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${colors.accent} 50%, transparent 100%)`,
            }}
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Hook for portal transition state ─────────────────────────────────────────
export function usePortalTransition(initial: Portal) {
  const [portal, setPortal] = useState<Portal>(initial);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingPortal, setPendingPortal] = useState<Portal | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("eduai-active-portal") as Portal | null;
    if (saved && saved in PORTAL_COLORS) {
      setPortal(saved);
    }
  }, []);

  const switchPortal = (next: Portal) => {
    if (next === portal || isTransitioning) return;
    setPendingPortal(next);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = useCallback(() => {
    if (pendingPortal) {
      setPortal(pendingPortal);
      localStorage.setItem("eduai-active-portal", pendingPortal);
      setPendingPortal(null);
    }
    setIsTransitioning(false);
  }, [pendingPortal]);

  // Fallback timeout — never freeze on animation failure
  useEffect(() => {
    if (isTransitioning) {
      timerRef.current = setTimeout(() => {
        handleTransitionComplete();
      }, 900);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTransitioning, handleTransitionComplete]);

  return {
    portal,
    isTransitioning,
    pendingPortal,
    switchPortal,
    handleTransitionComplete,
  };
}
