import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Download, FileText, Users } from "lucide-react";
import { motion } from "motion/react";

const reports = [
  {
    title: "District Mastery Summary — Spring 2026",
    type: "Academic",
    date: "May 15, 2026",
    status: "ready",
  },
  {
    title: "Enrollment Trends Report 2025–2026",
    type: "Compliance",
    date: "May 1, 2026",
    status: "ready",
  },
  {
    title: "Professional Development Hours Summary",
    type: "PD",
    date: "Apr 28, 2026",
    status: "ready",
  },
  {
    title: "ELL Progress Annual Report",
    type: "Compliance",
    date: "Apr 15, 2026",
    status: "pending",
  },
  {
    title: "Special Education Compliance Overview",
    type: "Compliance",
    date: "Mar 30, 2026",
    status: "ready",
  },
];

const summaryStats = [
  { label: "Total Enrollment", value: "4,495", icon: Users },
  { label: "PD Hours Logged", value: "2,847", icon: Clock },
  { label: "Reports Generated", value: "23", icon: FileText },
];

export default function DistrictReports() {
  return (
    <div
      data-ocid="district.reports.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] p-6 md:p-10"
    >
      <div className="flex items-center gap-3 mb-8">
        <Link
          to="/district"
          className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[oklch(0.95_0.02_265)]">
            District Reports
          </h1>
          <p className="text-[oklch(0.5_0.06_265)] text-sm">
            Compliance, academic, and PD summaries
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {summaryStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[oklch(0.85_0.15_85)]/15 flex items-center justify-center mx-auto mb-3">
              <s.icon className="w-5 h-5 text-[oklch(0.85_0.15_85)]" />
            </div>
            <p className="text-xl font-bold text-[oklch(0.85_0.15_85)]">
              {s.value}
            </p>
            <p className="text-[oklch(0.5_0.06_265)] text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Report List */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6"
      >
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-5">
          Available Reports
        </h2>
        <div className="space-y-3">
          {reports.map((r, i) => (
            <motion.div
              key={r.title}
              data-ocid={`district.report.${i + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[oklch(0.85_0.15_85)]/15 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-[oklch(0.85_0.15_85)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[oklch(0.85_0.05_265)] text-sm font-medium truncate">
                    {r.title}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[oklch(0.5_0.06_265)] text-xs">
                      {r.date}
                    </span>
                    <Badge className="text-xs bg-white/10 text-[oklch(0.6_0.06_265)] border-white/20">
                      {r.type}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button
                data-ocid={`district.report_download.${i + 1}`}
                size="sm"
                variant="outline"
                disabled={r.status === "pending"}
                className="shrink-0 ml-4 border-white/20 text-[oklch(0.7_0.08_265)] hover:bg-white/10 disabled:opacity-40"
              >
                <Download className="w-3.5 h-3.5" />
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Research & Impact */}
      <motion.section
        data-ocid="district.research_impact_section"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
          Research &amp; Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(255,185,0,0.12)",
                  color: "oklch(0.85 0.18 85)",
                  border: "1px solid rgba(255,185,0,0.25)",
                }}
              >
                CASE STUDY
              </span>
            </div>
            <p className="text-sm font-bold text-[oklch(0.9_0.04_265)] mb-1">
              The Diego Protocol
            </p>
            <p className="text-xs text-[oklch(0.5_0.06_265)] mb-3">
              Sovereign intelligence-driven preparation for non-traditional
              academic competition. Fibonacci backward milestones + elastic
              schedule adaptation.
            </p>
            <Link
              data-ocid="district.diego_protocol_link"
              to="/vision"
              className="text-xs font-semibold"
              style={{ color: "oklch(0.85 0.18 85)" }}
            >
              Read Full Paper →
            </Link>
          </div>
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(100,200,255,0.10)",
                  color: "oklch(0.78 0.14 210)",
                  border: "1px solid rgba(100,200,255,0.20)",
                }}
              >
                SOVEREIGN VISION
              </span>
            </div>
            <p className="text-sm font-bold text-[oklch(0.9_0.04_265)] mb-1">
              EduAI Vision Document
            </p>
            <p className="text-xs text-[oklch(0.5_0.06_265)] mb-3">
              System-generated funding case, technical sovereignty overview, and
              impact analysis — built by COGT+META+AUTN engines.
            </p>
            <Link
              data-ocid="district.vision_document_link"
              to="/vision"
              className="text-xs font-semibold"
              style={{ color: "oklch(0.78 0.14 210)" }}
            >
              View Vision Document →
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
