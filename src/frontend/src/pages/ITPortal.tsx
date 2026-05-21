// ITPortal — Registry Health dashboard with STMP + Knowledge Layer monitoring
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  CheckCircle2,
  Cpu,
  Database,
  FileText,
  Grid3X3,
  Lock,
  Server,
  Shield,
  Unlock,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const EMERALD = "oklch(0.72 0.17 155)";
const TEAL = "oklch(0.72 0.16 185)";
const GOLD = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.68 0.18 280)";

// Static STMP registry data
const STMP_DATA = {
  totalTemplates: 89,
  maxTemplates: 144,
  lockedTemplates: 55,
  unlockedTemplates: 34,
  bySubject: [
    { subject: "Mathematics", grades: 13, locked: false },
    { subject: "Science", grades: 13, locked: false },
    { subject: "English Language Arts", grades: 13, locked: false },
    { subject: "History", grades: 13, locked: false },
    { subject: "Geography", grades: 8, locked: false },
    { subject: "Physics", grades: 4, locked: true },
    { subject: "Chemistry", grades: 4, locked: true },
    { subject: "Biology", grades: 6, locked: false },
    { subject: "Computer Science", grades: 5, locked: false },
    { subject: "Spanish", grades: 4, locked: true },
    { subject: "Art", grades: 7, locked: false },
    { subject: "PE/Health", grades: 13, locked: false },
  ],
};

// Static Knowledge Layer data
const KNOWLEDGE_DATA = {
  totalSubjects: 12,
  totalTopics: 233,
  seedStatus: "active" as const,
  gradeGates: 13,
  digestedTextbooks: 8,
  pendingDigest: 3,
  coverage: [
    { grade: "K", pct: 94 },
    { grade: "1", pct: 91 },
    { grade: "2", pct: 88 },
    { grade: "3", pct: 85 },
    { grade: "4", pct: 82 },
    { grade: "5", pct: 79 },
    { grade: "6", pct: 73 },
    { grade: "7", pct: 68 },
    { grade: "8", pct: 62 },
    { grade: "9", pct: 71 },
    { grade: "10", pct: 65 },
    { grade: "11", pct: 58 },
    { grade: "12", pct: 44 },
  ],
};

const IT_LINKS = [
  { label: "Security Panel", to: "/it-security", icon: Shield, color: EMERALD },
  { label: "Network Status", to: "/it/network", icon: Activity, color: TEAL },
  { label: "Audit Log", to: "/it/audit", icon: FileText, color: GOLD },
  { label: "Engine Monitor", to: "/it/engines", icon: Cpu, color: PURPLE },
  { label: "APIX Gateway", to: "/it/apix", icon: Zap, color: EMERALD },
];

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  sub,
  index,
}: {
  label: string;
  value: string | number;
  icon: typeof Shield;
  color: string;
  sub?: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="glass rounded-2xl p-5 space-y-3"
      style={{ border: `1px solid ${color.replace(")", " / 0.20)")}` }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{
          background: color.replace(")", " / 0.10)"),
          border: `1px solid ${color.replace(")", " / 0.25)")}`,
        }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div>
        <p className="font-display font-bold text-2xl text-foreground">
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
        {sub && (
          <p className="text-[10px] font-mono mt-1" style={{ color }}>
            {sub}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function ITPortal() {
  const [stmpLoading] = useState(false);
  const [knowledgeLoading] = useState(false);

  const stmpFillPct = Math.round(
    (STMP_DATA.totalTemplates / STMP_DATA.maxTemplates) * 100,
  );

  return (
    <div className="portal-enter min-h-screen" data-ocid="it_portal.page">
      {/* OS Header */}
      <div
        className="glass sticky top-0 z-30"
        style={{
          borderBottom: `1px solid ${EMERALD.replace(")", " / 0.18)")}`,
        }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2.5 rounded-xl px-4 py-2"
              style={{
                background: `linear-gradient(135deg, ${EMERALD.replace(")", " / 0.20)")} 0%, ${EMERALD.replace(")", " / 0.10)")} 100%)`,
                border: `1px solid ${EMERALD.replace(")", " / 0.35)")}`,
              }}
            >
              <Server className="h-4 w-4" style={{ color: EMERALD }} />
              <span
                className="font-display font-bold text-sm"
                style={{ color: EMERALD, letterSpacing: "0.18em" }}
              >
                IT PORTAL
              </span>
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-base leading-none">
                Registry Health Monitor
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                STMP · Knowledge Layer · System Registries
              </p>
            </div>
          </div>
          <Badge
            className="font-mono text-[10px] tracking-widest"
            style={{
              background: EMERALD.replace(")", " / 0.12)"),
              color: EMERALD,
              border: `1px solid ${EMERALD.replace(")", " / 0.30)")}`,
            }}
          >
            SYSTEM HEALTHY
          </Badge>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-6 space-y-8">
        {/* Quick nav to other IT sub-pages */}
        <div className="flex flex-wrap gap-3" data-ocid="it_portal.nav">
          {IT_LINKS.map((link, i) => (
            <Link
              key={link.label}
              to={link.to}
              data-ocid={`it_portal.nav_link.${i + 1}`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 glass-sm rounded-xl px-4 py-2.5 hover:scale-[1.02] transition-smooth cursor-pointer"
                style={{
                  border: `1px solid ${link.color.replace(")", " / 0.25)")}`,
                }}
              >
                <link.icon
                  className="h-3.5 w-3.5"
                  style={{ color: link.color }}
                />
                <span className="text-xs font-medium text-foreground">
                  {link.label}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* ── SECTION: STMP Registry Health ─────────────────────────────── */}
        <section data-ocid="it_portal.stmp_section">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl"
              style={{
                background: GOLD.replace(")", " / 0.12)"),
                border: `1px solid ${GOLD.replace(")", " / 0.28)")}`,
              }}
            >
              <Grid3X3 className="h-4 w-4" style={{ color: GOLD }} />
            </div>
            <div>
              <h2 className="font-display font-bold text-foreground text-lg">
                STMP Registry Status
              </h2>
              <p className="text-xs text-muted-foreground">
                Subject Template Master Protocol · Grade-locked master templates
              </p>
            </div>
          </div>

          {stmpLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-28 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {/* Stats row — .glass-grade-vault for performance/mastery data */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="Total Templates"
                  value={STMP_DATA.totalTemplates}
                  icon={Database}
                  color={GOLD}
                  sub={`${stmpFillPct}% of max 144`}
                  index={0}
                />
                <StatCard
                  label="Master-Locked"
                  value={STMP_DATA.lockedTemplates}
                  icon={Lock}
                  color={GOLD}
                  sub="Protected from edits"
                  index={1}
                />
                <StatCard
                  label="Unlocked (Draft)"
                  value={STMP_DATA.unlockedTemplates}
                  icon={Unlock}
                  color={GOLD}
                  sub="Pending finalization"
                  index={2}
                />
                <StatCard
                  label="Subjects Covered"
                  value={12}
                  icon={BookOpen}
                  color={GOLD}
                  sub="All 12 subject areas"
                  index={3}
                />
              </div>

              {/* Fill bar */}
              <div
                className="glass-grade-vault rounded-2xl p-5 space-y-3"
                data-ocid="it_portal.stmp_fill_bar"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    Registry Capacity
                  </span>
                  <span
                    className="font-mono font-bold text-sm"
                    style={{ color: GOLD }}
                  >
                    {STMP_DATA.totalTemplates} / {STMP_DATA.maxTemplates}{" "}
                    (F(12)=144 max)
                  </span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden bg-white/5">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${stmpFillPct}%` }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                    style={{
                      background: `linear-gradient(90deg, ${GOLD} 0%, oklch(0.82 0.14 84) 100%)`,
                      boxShadow: `0 0 12px ${GOLD.replace(")", " / 0.35)")}`,
                    }}
                  />
                </div>

                {/* Subject breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 pt-2">
                  {STMP_DATA.bySubject.map((s, i) => (
                    <motion.div
                      key={s.subject}
                      data-ocid={`it_portal.stmp_subject.${i + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="glass-sm rounded-lg px-3 py-2 flex items-center justify-between gap-2"
                    >
                      <span className="text-xs text-foreground truncate">
                        {s.subject}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className="font-mono text-[10px]"
                          style={{ color: GOLD }}
                        >
                          {s.grades}G
                        </span>
                        {s.locked ? (
                          <Lock className="h-2.5 w-2.5 text-amber-400/70" />
                        ) : (
                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400/70" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── SECTION: Knowledge Layer ───────────────────────────────────── */}
        <section data-ocid="it_portal.knowledge_section">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl"
              style={{
                background: TEAL.replace(")", " / 0.12)"),
                border: `1px solid ${TEAL.replace(")", " / 0.28)")}`,
              }}
            >
              <BookOpen className="h-4 w-4" style={{ color: TEAL }} />
            </div>
            <div>
              <h2 className="font-display font-bold text-foreground text-lg">
                Knowledge Layer
              </h2>
              <p className="text-xs text-muted-foreground">
                Sovereign curriculum content · GVLT-gated by grade · Digest
                engine status
              </p>
            </div>
          </div>

          {knowledgeLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-28 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="Total Subjects"
                  value={KNOWLEDGE_DATA.totalSubjects}
                  icon={BookOpen}
                  color={TEAL}
                  sub="12 sovereign subjects"
                  index={0}
                />
                <StatCard
                  label="Total Topics"
                  value={KNOWLEDGE_DATA.totalTopics}
                  icon={FileText}
                  color={TEAL}
                  sub={"F(13)=233 topics"}
                  index={1}
                />
                <StatCard
                  label="Digested Textbooks"
                  value={KNOWLEDGE_DATA.digestedTextbooks}
                  icon={Database}
                  color={TEAL}
                  sub={`${KNOWLEDGE_DATA.pendingDigest} pending`}
                  index={2}
                />
                <StatCard
                  label="Grade Gates"
                  value={KNOWLEDGE_DATA.gradeGates}
                  icon={Lock}
                  color={TEAL}
                  sub="K–12 PHI-locked"
                  index={3}
                />
              </div>

              {/* Knowledge coverage heatmap — .glass-knowledge-surface */}
              <div
                className="glass-knowledge-surface rounded-2xl p-5 space-y-4"
                data-ocid="it_portal.knowledge_coverage"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    Curriculum Coverage by Grade
                  </span>
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                    style={{
                      background: TEAL.replace(")", " / 0.10)"),
                      border: `1px solid ${TEAL.replace(")", " / 0.25)")}`,
                    }}
                  >
                    <Activity className="h-3 w-3" style={{ color: TEAL }} />
                    <span
                      className="font-mono text-[10px] font-bold"
                      style={{ color: TEAL }}
                    >
                      SEED ACTIVE
                    </span>
                  </div>
                </div>

                <div className="flex items-end gap-2 h-24">
                  {KNOWLEDGE_DATA.coverage.map((c, i) => (
                    <motion.div
                      key={c.grade}
                      data-ocid={`it_portal.coverage_bar.${i + 1}`}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      style={{ originY: 1, flex: 1 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <span
                        className="text-[9px] font-mono"
                        style={{ color: TEAL }}
                      >
                        {c.pct}%
                      </span>
                      <div
                        className="w-full rounded-t-sm"
                        style={{
                          height: `${c.pct}%`,
                          background:
                            c.pct >= 80
                              ? `${TEAL.replace(")", " / 0.70)")}`
                              : c.pct >= 60
                                ? "oklch(0.78 0.17 100 / 0.60)"
                                : "oklch(0.75 0.16 50 / 0.50)",
                          boxShadow:
                            c.pct >= 80
                              ? `0 0 8px ${TEAL.replace(")", " / 0.30)")}`
                              : "none",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {KNOWLEDGE_DATA.coverage.map((c) => (
                    <span
                      key={c.grade}
                      className="flex-1 text-center text-[9px] font-mono text-muted-foreground"
                    >
                      {c.grade}
                    </span>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 pt-1">
                  {[
                    { color: TEAL, label: "≥80% covered" },
                    { color: "oklch(0.78 0.17 100)", label: "60–79%" },
                    { color: "oklch(0.75 0.16 50)", label: "<60% sparse" },
                  ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <div
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ background: color }}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── System Quick Links ─────────────────────────────────────────── */}
        <section
          className="glass rounded-2xl p-5"
          data-ocid="it_portal.system_links"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            System Access Points
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {IT_LINKS.map((link, i) => (
              <Link
                key={link.label}
                to={link.to}
                data-ocid={`it_portal.system_link.${i + 1}`}
              >
                <div
                  className="glass-sm rounded-xl p-4 flex flex-col items-center gap-3 hover:scale-[1.03] transition-smooth text-center cursor-pointer"
                  style={{
                    border: `1px solid ${link.color.replace(")", " / 0.22)")}`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: link.color.replace(")", " / 0.10)"),
                      border: `1px solid ${link.color.replace(")", " / 0.28)")}`,
                    }}
                  >
                    <link.icon
                      className="h-4 w-4"
                      style={{ color: link.color }}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {link.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
