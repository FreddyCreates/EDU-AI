// StudentTerminal — Kiosk entry for Student portal
// Links to Student Dashboard, Learning, Passport, Achievements

import EddiOrb from "@/components/EddiOrb";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookMarked,
  BookOpen,
  Brain,
  ChevronRight,
  Compass,
  GraduationCap,
  Heart,
  Layers,
  MessageSquare,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

const STUDENT_ACCENT = "oklch(0.78 0.22 200)";
const STUDENT_GLOW = "rgba(0, 210, 255, 0.25)";
const STUDENT_BORDER = "rgba(0, 210, 255, 0.35)";

const STUDENT_LINKS = [
  {
    label: "Dashboard",
    description: "Your learning overview and daily goals",
    href: "/dashboard",
    icon: GraduationCap,
    primary: true,
  },
  {
    label: "My Learning",
    description: "Continue your courses and lessons",
    href: "/learning",
    icon: BookOpen,
    primary: true,
  },
  {
    label: "Subjects",
    description: "Browse all K-12 subjects",
    href: "/subjects",
    icon: Layers,
    primary: false,
  },
  {
    label: "Passport",
    description: "Your academic memory and achievements",
    href: "/passport",
    icon: BookMarked,
    primary: true,
  },
  {
    label: "Study Session",
    description: "Deep focus learning with EDDI",
    href: "/collegium",
    icon: Brain,
    primary: false,
  },
  {
    label: "Test Prep",
    description: "Practice tests and quizzes",
    href: "/student/test-prep",
    icon: Sparkles,
    primary: false,
  },
  {
    label: "Career Explorer",
    description: "Discover career pathways",
    href: "/student/career",
    icon: Compass,
    primary: false,
  },
  {
    label: "Scholarships",
    description: "Find scholarship opportunities",
    href: "/student/scholarships",
    icon: Award,
    primary: false,
  },
  {
    label: "Mental Health",
    description: "Wellness check-ins and support",
    href: "/student/mental-health",
    icon: Heart,
    primary: false,
  },
  {
    label: "Tutoring",
    description: "Connect with tutors and study groups",
    href: "/student/tutoring",
    icon: MessageSquare,
    primary: false,
  },
] as const;

function PortalLink({
  link,
  index,
}: {
  link: (typeof STUDENT_LINKS)[number];
  index: number;
}) {
  const Icon = link.icon;

  return (
    <Link to={link.href} data-ocid={`student_terminal.link.${link.label.toLowerCase().replace(/\s/g, "_")}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 + index * 0.05 }}
        whileHover={{ x: 4, scale: 1.01 }}
        className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
          link.primary
            ? "glass border border-[rgba(0,210,255,0.25)]"
            : "glass-sm border border-white/10 hover:border-[rgba(0,210,255,0.20)]"
        }`}
        style={
          link.primary
            ? {
                background:
                  "linear-gradient(135deg, rgba(0,210,255,0.08) 0%, rgba(0,210,255,0.02) 100%)",
              }
            : {}
        }
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: link.primary
              ? `${STUDENT_ACCENT.replace(")", " / 0.15)")}`
              : "rgba(255,255,255,0.05)",
            border: link.primary
              ? `1px solid ${STUDENT_BORDER}`
              : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Icon
            className="w-5 h-5"
            style={{ color: link.primary ? STUDENT_ACCENT : "rgba(255,255,255,0.6)" }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-sm"
            style={{ color: link.primary ? STUDENT_ACCENT : "rgba(255,255,255,0.85)" }}
          >
            {link.label}
          </h3>
          <p className="text-xs text-white/50 truncate">{link.description}</p>
        </div>
        <ChevronRight
          className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors"
        />
      </motion.div>
    </Link>
  );
}

export default function StudentTerminal() {
  return (
    <div
      data-ocid="student_terminal.page"
      className="min-h-screen px-4 py-8 md:px-8 md:py-12"
      style={{
        background:
          "radial-gradient(ellipse at top, oklch(0.12 0.04 200) 0%, oklch(0.07 0.01 260) 50%)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="relative">
            <EddiOrb size="md" mode="EXPLORE" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" style={{ color: STUDENT_ACCENT }} />
              <Badge
                className="text-[10px] font-mono"
                style={{
                  background: `${STUDENT_ACCENT.replace(")", " / 0.12)")}`,
                  color: STUDENT_ACCENT,
                  border: `1px solid ${STUDENT_BORDER}`,
                }}
              >
                STUDENT TERMINAL
              </Badge>
            </div>
            <h1 className="font-display text-2xl font-bold text-white/90 mt-1">
              Student Portal
            </h1>
            <p className="text-sm text-white/50">
              Learning, Achievements & Academic Passport
            </p>
          </div>
        </motion.div>

        {/* EDDI Mode Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-4 mb-6 flex items-center justify-between"
          style={{ border: `1px solid ${STUDENT_BORDER}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: STUDENT_ACCENT }}
            />
            <span className="text-sm text-white/70">
              EDDI Mode: <span style={{ color: STUDENT_ACCENT }}>Student</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[oklch(0.76_0.18_84)]" />
            <span className="text-xs font-mono text-white/50">
              Recognition Active
            </span>
          </div>
        </motion.div>

        {/* Navigation Links */}
        <div className="space-y-3">
          {STUDENT_LINKS.map((link, i) => (
            <PortalLink key={link.label} link={link} index={i} />
          ))}
        </div>

        {/* Back to Hub */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <Link
            to="/terminals"
            className="text-xs font-mono text-white/30 hover:text-white/50 transition-colors"
            data-ocid="student_terminal.back_to_hub"
          >
            ← Back to Terminal Hub
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
