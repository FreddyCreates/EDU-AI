import { cn } from "@/lib/utils";
import { Crown, Share2, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

export function GoldCelebrationOverlay() {
  const [dismissed, setDismissed] = useState(false);

  function handleDismiss() {
    setDismissed(true);
  }

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          key="gold-overlay"
          data-ocid="recognition.gold_celebration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, oklch(0.72 0.22 75 / 0.92) 0%, oklch(0.45 0.18 55 / 0.97) 55%, oklch(0.12 0.04 30 / 0.98) 100%)",
          }}
          aria-modal="true"
          aria-label="Gold Achievement Celebration"
        >
          {/* Dismiss button */}
          <button
            type="button"
            data-ocid="recognition.gold_close_button"
            onClick={handleDismiss}
            aria-label="Dismiss celebration"
            className="absolute top-[21px] right-[21px] rounded-full p-2 bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Burst particles: 12 dots from center */}
          <BurstParticles />
          {/* Background particle ring */}
          <GoldParticles />
          {/* Gold halo ring */}
          <GoldHalo />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.85, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{
              delay: 0.15,
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="relative z-10 flex flex-col items-center gap-[21px] px-[34px] text-center max-w-[55ch]"
          >
            {/* Crown — pulses via recognition-crown-pulse keyframe */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: 89, height: 89 }}
            >
              <motion.div
                animate={{ rotate: [0, 3, -3, 3, 0] }}
                transition={{
                  delay: 0.7,
                  duration: 1.2,
                  repeat: 2,
                  ease: "easeInOut",
                }}
                className="recognition-crown-pulse relative flex items-center justify-center rounded-full"
                style={{
                  width: 89,
                  height: 89,
                  background:
                    "radial-gradient(circle, oklch(0.95 0.22 90) 0%, oklch(0.78 0.20 70) 60%, oklch(0.55 0.16 55) 100%)",
                  boxShadow:
                    "0 0 40px oklch(0.85 0.25 85 / 0.9), 0 0 80px oklch(0.72 0.22 75 / 0.5), inset 0 2px 4px oklch(1 0 0 / 0.4)",
                }}
              >
                <Crown className="h-10 w-10 text-amber-900" strokeWidth={1.5} />
                {/* Small star accents */}
                {[0, 72, 144, 216, 288].map((deg, i) => (
                  <motion.div
                    key={deg}
                    className="absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${deg}deg) translateY(-52px) translateX(-50%)`,
                    }}
                    animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                    transition={{
                      duration: 1.8,
                      delay: i * 0.18,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Star className="h-3 w-3 text-amber-200 fill-amber-200" />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Headline */}
            <div className="space-y-[8px]">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="font-display font-extrabold text-white"
                style={{
                  fontSize: 34,
                  lineHeight: 1.1,
                  textShadow: "0 2px 20px oklch(0.72 0.22 75 / 0.8)",
                }}
              >
                Nationally Recognized Excellence
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="text-amber-100/90 font-medium leading-relaxed"
                style={{ fontSize: 16 }}
              >
                You achieved what Alfredo Medina Hernandez achieved at Ferris
                High School — nationally recognized excellence. Your teacher saw
                what the system missed.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="text-amber-200/60 text-sm"
              >
                This achievement has been permanently sealed in your passport.
                It follows you from today through graduation.
              </motion.p>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.35 }}
              className="flex flex-row gap-3"
            >
              <button
                type="button"
                data-ocid="recognition.gold_confirm_button"
                onClick={handleDismiss}
                className={cn(
                  "rounded-2xl px-[34px] py-[13px] font-semibold text-base",
                  "bg-amber-950/40 border border-amber-300/40 text-amber-100",
                  "hover:bg-amber-900/50 hover:border-amber-300/70",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300/60",
                  "transition-all duration-200",
                )}
                style={{
                  boxShadow:
                    "0 0 24px oklch(0.85 0.22 85 / 0.25), inset 0 1px 0 oklch(1 0 0 / 0.1)",
                }}
              >
                Carry it forward
              </button>

              <button
                type="button"
                data-ocid="recognition.share_excellence_button"
                onClick={() => window.print()}
                aria-label="Share My Excellence"
                className={cn(
                  "flex items-center gap-2 rounded-2xl px-[21px] py-[13px] font-semibold text-base",
                  "backdrop-blur-md bg-white/5 border border-white/20 text-amber-400",
                  "hover:bg-white/10 hover:border-white/30",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400/60",
                  "transition-all duration-200",
                )}
                style={{
                  boxShadow:
                    "0 0 16px oklch(0.85 0.22 85 / 0.15), inset 0 1px 0 oklch(1 0 0 / 0.08)",
                }}
              >
                <Share2 className="h-4 w-4" />
                Share My Excellence
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** 12 burst particles that fly outward from center on mount */
function BurstParticles() {
  const bursts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        angle: i * 30 + Math.random() * 15,
        distance: 80 + Math.random() * 80,
        size: [4, 5, 6, 8][i % 4],
        delay: i * 0.04,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {bursts.map((b) => {
        const rad = (b.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * b.distance;
        const ty = Math.sin(rad) * b.distance;
        return (
          <motion.div
            key={`${b.angle}-${b.distance}`}
            className="absolute rounded-full bg-amber-300"
            style={{ width: b.size, height: b.size }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: tx,
              y: ty,
              opacity: [1, 0.9, 0],
              scale: [1, 1.4, 0.3],
            }}
            transition={{
              duration: 1.2,
              delay: b.delay,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}

/** Gold halo ring that expands and fades */
function GoldHalo() {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: 120,
        height: 120,
        border: "2px solid rgba(251,191,36,0.7)",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
      }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 2, opacity: 0 }}
      transition={{
        duration: 2,
        ease: "easeOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 0.5,
      }}
    />
  );
}

/** Floating particle ring around the overlay */
function GoldParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 21 }, (_, i) => ({
        x: (i * 37 + 13) % 97,
        y: (i * 53 + 7) % 95,
        size: [3, 4, 5, 6, 8][i % 5],
        delay: (i * 0.13) % 2.1,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={`${p.x}-${p.y}`}
          className="absolute rounded-full bg-amber-300"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.7, 0],
            y: [-20, -60],
            scale: [0.8, 1.2, 0.5],
          }}
          transition={{
            duration: 2.5 + (i % 5) * 0.3,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
