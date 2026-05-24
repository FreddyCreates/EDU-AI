// IT Smart Onboarding — AI-Driven User Provisioning with Role Inference
// EDDI-powered onboarding automation, intelligent role detection, and streamlined user setup

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bot,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileSpreadsheet,
  GraduationCap,
  HelpCircle,
  Key,
  Layers,
  Mail,
  Plus,
  RefreshCw,
  School,
  Settings,
  Shield,
  Sparkles,
  Upload,
  User,
  UserCheck,
  UserPlus,
  Users,
  Wand2,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const EMERALD = "oklch(0.72 0.17 155)";
const GOLD = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.68 0.18 280)";
const CYAN = "oklch(0.65 0.22 200)";

interface OnboardingUser {
  id: string;
  name: string;
  email: string;
  sourceData: {
    sis?: string;
    csv?: string;
    manual?: boolean;
  };
  aiInferredRole: "student" | "teacher" | "principal" | "counselor" | "parent" | "it-admin";
  aiConfidence: number;
  inferredDetails: {
    grade?: string;
    department?: string;
    subjects?: string[];
    childrenIds?: string[];
  };
  status: "pending" | "approved" | "provisioned" | "rejected";
  suggestedPermissions: string[];
  aiNotes: string;
}

interface OnboardingBatch {
  id: string;
  name: string;
  source: "sis-import" | "csv-upload" | "manual-entry" | "sso-discovery";
  totalUsers: number;
  processed: number;
  approved: number;
  pending: number;
  createdAt: string;
  aiProcessingStatus: "analyzing" | "complete" | "error";
}

interface ProvisioningTemplate {
  id: string;
  role: string;
  description: string;
  defaultPermissions: string[];
  apps: string[];
  aiCustomizable: boolean;
}

const onboardingBatches: OnboardingBatch[] = [
  {
    id: "batch-001",
    name: "Spring 2024 New Students",
    source: "sis-import",
    totalUsers: 234,
    processed: 234,
    approved: 228,
    pending: 6,
    createdAt: "2 hours ago",
    aiProcessingStatus: "complete",
  },
  {
    id: "batch-002",
    name: "Substitute Teacher Pool",
    source: "csv-upload",
    totalUsers: 18,
    processed: 18,
    approved: 15,
    pending: 3,
    createdAt: "1 day ago",
    aiProcessingStatus: "complete",
  },
  {
    id: "batch-003",
    name: "SSO Auto-Discovery",
    source: "sso-discovery",
    totalUsers: 12,
    processed: 8,
    approved: 0,
    pending: 8,
    createdAt: "30 mins ago",
    aiProcessingStatus: "analyzing",
  },
];

const pendingUsers: OnboardingUser[] = [
  {
    id: "usr-001",
    name: "Dr. Sarah Mitchell",
    email: "sarah.mitchell@district.edu",
    sourceData: { sis: "PowerSchool" },
    aiInferredRole: "teacher",
    aiConfidence: 96,
    inferredDetails: {
      department: "Science",
      subjects: ["AP Biology", "Chemistry"],
    },
    status: "pending",
    suggestedPermissions: ["grade-vault", "lesson-builder", "student-progress", "recognition-nominate"],
    aiNotes: "High-confidence match: Email domain, SIS role field, and schedule data all indicate teaching staff. Course assignments suggest Science department.",
  },
  {
    id: "usr-002",
    name: "Marcus Johnson",
    email: "marcus.johnson@gmail.com",
    sourceData: { csv: "parent_contacts.csv" },
    aiInferredRole: "parent",
    aiConfidence: 89,
    inferredDetails: {
      childrenIds: ["STU-4421", "STU-4422"],
    },
    status: "pending",
    suggestedPermissions: ["parent-dashboard", "progress-view", "attendance-view", "messages"],
    aiNotes: "Parent role inferred from CSV source and email matching student emergency contacts. Two students linked via family relationship data.",
  },
  {
    id: "usr-003",
    name: "Alex Rivera",
    email: "alex.r@student.district.edu",
    sourceData: { sso: "Clever SSO" } as any,
    aiInferredRole: "student",
    aiConfidence: 98,
    inferredDetails: {
      grade: "10th Grade",
    },
    status: "pending",
    suggestedPermissions: ["learning", "self-study", "passport", "peer-collaboration"],
    aiNotes: "Student domain email + SSO student scope + enrollment record match. Grade level confirmed via SIS enrollment data.",
  },
  {
    id: "usr-004",
    name: "Jennifer Hayes",
    email: "jhayes@district.edu",
    sourceData: { sis: "PowerSchool" },
    aiInferredRole: "counselor",
    aiConfidence: 72,
    inferredDetails: {
      department: "Counseling",
    },
    status: "pending",
    suggestedPermissions: ["counselor-dashboard", "student-plans", "career-tools", "college-prep"],
    aiNotes: "Role inference uncertain: SIS shows 'Support Staff' but email signature and calendar suggest counseling duties. Manual verification recommended.",
  },
];

const provisioningTemplates: ProvisioningTemplate[] = [
  {
    id: "tpl-student",
    role: "Student",
    description: "Standard student access with learning portal and passport",
    defaultPermissions: ["learning", "self-study", "passport", "peer-collaboration", "achievements"],
    apps: ["Learning Portal", "Study Planner", "Passport", "Recognition"],
    aiCustomizable: true,
  },
  {
    id: "tpl-teacher",
    role: "Teacher",
    description: "Full teaching access with gradebook, lessons, and analytics",
    defaultPermissions: ["grade-vault", "lesson-builder", "student-progress", "recognition-nominate", "attendance"],
    apps: ["Grade Vault", "Lesson Builder", "Class Analytics", "Communication Hub"],
    aiCustomizable: true,
  },
  {
    id: "tpl-principal",
    role: "Principal",
    description: "School-wide oversight with staff and analytics access",
    defaultPermissions: ["school-analytics", "staff-overview", "grade-reports", "recognition-approve", "district-reports"],
    apps: ["School Dashboard", "Staff Portal", "Analytics Suite", "Report Center"],
    aiCustomizable: false,
  },
  {
    id: "tpl-parent",
    role: "Parent/Guardian",
    description: "Child progress monitoring and communication",
    defaultPermissions: ["parent-dashboard", "progress-view", "attendance-view", "messages", "reports"],
    apps: ["Parent Portal", "Progress Tracker", "Message Center"],
    aiCustomizable: true,
  },
];

function getRoleColor(role: OnboardingUser["aiInferredRole"]) {
  switch (role) {
    case "student":
      return CYAN;
    case "teacher":
      return GOLD;
    case "principal":
      return EMERALD;
    case "counselor":
      return PURPLE;
    case "parent":
      return "oklch(0.70 0.16 120)";
    case "it-admin":
      return "oklch(0.65 0.18 260)";
    default:
      return EMERALD;
  }
}

function getRoleIcon(role: OnboardingUser["aiInferredRole"]) {
  switch (role) {
    case "student":
      return GraduationCap;
    case "teacher":
      return BookOpen;
    case "principal":
      return School;
    case "counselor":
      return HelpCircle;
    case "parent":
      return Users;
    case "it-admin":
      return Shield;
    default:
      return User;
  }
}

function getSourceIcon(source: OnboardingBatch["source"]) {
  switch (source) {
    case "sis-import":
      return Layers;
    case "csv-upload":
      return FileSpreadsheet;
    case "manual-entry":
      return UserPlus;
    case "sso-discovery":
      return Key;
    default:
      return Layers;
  }
}

function BatchCard({ batch, index }: { batch: OnboardingBatch; index: number }) {
  const SourceIcon = getSourceIcon(batch.source);
  const progressPct = Math.round((batch.processed / batch.totalUsers) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="glass rounded-xl p-4 space-y-3"
      style={{ border: `1px solid ${EMERALD.replace(")", " / 0.20)")}` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              background: EMERALD.replace(")", " / 0.12)"),
              border: `1px solid ${EMERALD.replace(")", " / 0.28)")}`,
            }}
          >
            <SourceIcon className="w-4 h-4" style={{ color: EMERALD }} />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">{batch.name}</h4>
            <p className="text-[10px] text-muted-foreground capitalize">
              {batch.source.replace("-", " ")} • {batch.createdAt}
            </p>
          </div>
        </div>
        <Badge
          className="text-[9px] font-mono"
          style={{
            background: batch.aiProcessingStatus === "analyzing" ? PURPLE.replace(")", " / 0.15)") : EMERALD.replace(")", " / 0.15)"),
            color: batch.aiProcessingStatus === "analyzing" ? PURPLE : EMERALD,
          }}
        >
          {batch.aiProcessingStatus === "analyzing" && (
            <RefreshCw className="w-2.5 h-2.5 mr-1 animate-spin" />
          )}
          {batch.aiProcessingStatus === "analyzing" ? "AI Analyzing" : "Complete"}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Processing Progress</span>
          <span className="font-mono text-foreground">{batch.processed}/{batch.totalUsers}</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              background: `linear-gradient(90deg, ${EMERALD} 0%, ${CYAN} 100%)`,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2">
        {[
          { label: "Approved", value: batch.approved, color: EMERALD },
          { label: "Pending", value: batch.pending, color: GOLD },
          { label: "Total", value: batch.totalUsers, color: CYAN },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-mono text-sm font-semibold" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-[9px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function UserCard({ user, index }: { user: OnboardingUser; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const roleColor = getRoleColor(user.aiInferredRole);
  const RoleIcon = getRoleIcon(user.aiInferredRole);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-xl overflow-hidden"
      style={{ border: `1px solid ${roleColor.replace(")", " / 0.25)")}` }}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: roleColor.replace(")", " / 0.15)"),
              border: `1px solid ${roleColor.replace(")", " / 0.30)")}`,
            }}
          >
            <RoleIcon className="w-5 h-5" style={{ color: roleColor }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-foreground text-sm">{user.name}</h4>
              <Badge
                className="text-[9px]"
                style={{
                  background: roleColor.replace(")", " / 0.15)"),
                  color: roleColor,
                }}
              >
                {user.aiInferredRole}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <div className="text-right">
            <div
              className="text-lg font-display font-bold"
              style={{ color: user.aiConfidence >= 85 ? EMERALD : user.aiConfidence >= 70 ? GOLD : "oklch(0.65 0.20 25)" }}
            >
              {user.aiConfidence}%
            </div>
            <p className="text-[9px] text-muted-foreground">AI Confidence</p>
          </div>
        </div>

        {/* AI Notes */}
        <div
          className="mt-3 p-2.5 rounded-lg text-xs"
          style={{
            background: PURPLE.replace(")", " / 0.08)"),
            border: `1px solid ${PURPLE.replace(")", " / 0.18)")}`,
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3 h-3" style={{ color: PURPLE }} />
            <span className="text-[10px] font-mono uppercase" style={{ color: PURPLE }}>
              EDDI Analysis
            </span>
          </div>
          <p className="text-muted-foreground">{user.aiNotes}</p>
        </div>

        {/* Inferred Details */}
        {user.inferredDetails && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {user.inferredDetails.grade && (
              <Badge variant="outline" className="text-[9px]">
                {user.inferredDetails.grade}
              </Badge>
            )}
            {user.inferredDetails.department && (
              <Badge variant="outline" className="text-[9px]">
                {user.inferredDetails.department}
              </Badge>
            )}
            {user.inferredDetails.subjects?.map((subject) => (
              <Badge key={subject} variant="outline" className="text-[9px]">
                {subject}
              </Badge>
            ))}
            {user.inferredDetails.childrenIds && (
              <Badge variant="outline" className="text-[9px]">
                {user.inferredDetails.childrenIds.length} linked student(s)
              </Badge>
            )}
          </div>
        )}

        {/* Suggested Permissions */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 mt-3 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <Key className="w-3 h-3" />
          {user.suggestedPermissions.length} suggested permissions
          <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-2 flex flex-wrap gap-1.5"
          >
            {user.suggestedPermissions.map((perm) => (
              <Badge
                key={perm}
                className="text-[9px]"
                style={{
                  background: roleColor.replace(")", " / 0.10)"),
                  color: roleColor,
                  border: `1px solid ${roleColor.replace(")", " / 0.25)")}`,
                }}
              >
                {perm}
              </Badge>
            ))}
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
          <Button
            size="sm"
            className="flex-1 h-8 text-xs gap-1.5"
            style={{
              background: EMERALD.replace(")", " / 0.20)"),
              border: `1px solid ${EMERALD.replace(")", " / 0.40)")}`,
            }}
          >
            <CheckCircle2 className="w-3 h-3" />
            Approve & Provision
          </Button>
          <Button size="sm" variant="outline" className="h-8 text-xs">
            <Settings className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 text-xs text-red-400">
            <XCircle className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function TemplateCard({ template, index }: { template: ProvisioningTemplate; index: number }) {
  const roleColors: Record<string, string> = {
    Student: CYAN,
    Teacher: GOLD,
    Principal: EMERALD,
    "Parent/Guardian": "oklch(0.70 0.16 120)",
  };
  const color = roleColors[template.role] || EMERALD;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06 }}
      className="glass rounded-xl p-4 space-y-3"
      style={{ border: `1px solid ${color.replace(")", " / 0.20)")}` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-foreground text-sm">{template.role}</h4>
          <p className="text-[10px] text-muted-foreground mt-0.5">{template.description}</p>
        </div>
        {template.aiCustomizable && (
          <Badge
            className="text-[9px]"
            style={{
              background: PURPLE.replace(")", " / 0.15)"),
              color: PURPLE,
            }}
          >
            <Wand2 className="w-2.5 h-2.5 mr-1" />
            AI-Adaptive
          </Badge>
        )}
      </div>

      <div>
        <p className="text-[10px] text-muted-foreground mb-1.5">Default Apps</p>
        <div className="flex flex-wrap gap-1">
          {template.apps.map((app) => (
            <Badge key={app} variant="outline" className="text-[9px]">
              {app}
            </Badge>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-white/5">
        <p className="text-[10px] text-muted-foreground">
          {template.defaultPermissions.length} default permissions
        </p>
      </div>
    </motion.div>
  );
}

export default function SmartOnboarding() {
  const [activeView, setActiveView] = useState<"batches" | "pending" | "templates">("pending");
  const totalPending = pendingUsers.length;
  const highConfidence = pendingUsers.filter((u) => u.aiConfidence >= 85).length;

  return (
    <div className="portal-enter min-h-screen" data-ocid="it_onboarding.page">
      {/* Header */}
      <div
        className="glass sticky top-0 z-30"
        style={{ borderBottom: `1px solid ${EMERALD.replace(")", " / 0.18)")}` }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/it/portal">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                IT Portal
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2.5 rounded-xl px-4 py-2"
                style={{
                  background: `linear-gradient(135deg, ${EMERALD.replace(")", " / 0.20)")} 0%, ${PURPLE.replace(")", " / 0.10)")} 100%)`,
                  border: `1px solid ${EMERALD.replace(")", " / 0.35)")}`,
                }}
              >
                <UserPlus className="h-4 w-4" style={{ color: EMERALD }} />
                <span
                  className="font-display font-bold text-sm"
                  style={{ color: EMERALD, letterSpacing: "0.18em" }}
                >
                  SMART ONBOARD
                </span>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-base leading-none">
                  AI-Driven Provisioning
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Role Inference · Auto-Permissions · Streamlined Setup
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Upload className="h-4 w-4" />
              Import Users
            </Button>
            <Button
              size="sm"
              className="gap-1.5"
              style={{
                background: PURPLE.replace(")", " / 0.20)"),
                border: `1px solid ${PURPLE.replace(")", " / 0.40)")}`,
              }}
            >
              <Sparkles className="h-4 w-4" />
              Auto-Approve High Confidence
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Pending Review", value: totalPending, icon: Clock, color: GOLD },
            { label: "High Confidence", value: highConfidence, icon: Sparkles, color: PURPLE },
            { label: "Active Batches", value: onboardingBatches.length, icon: Layers, color: EMERALD },
            { label: "Ready to Provision", value: highConfidence, icon: UserCheck, color: CYAN },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-4 flex items-center gap-4"
              style={{ border: `1px solid ${stat.color.replace(")", " / 0.20)")}` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: stat.color.replace(")", " / 0.12)"),
                  border: `1px solid ${stat.color.replace(")", " / 0.28)")}`,
                }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="font-display font-bold text-xl text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3">
          {[
            { id: "pending" as const, label: "Pending Review", count: pendingUsers.length },
            { id: "batches" as const, label: "Import Batches", count: onboardingBatches.length },
            { id: "templates" as const, label: "Role Templates", count: provisioningTemplates.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeView === tab.id
                  ? "glass text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={
                activeView === tab.id
                  ? { border: `1px solid ${EMERALD.replace(")", " / 0.30)")}` }
                  : {}
              }
            >
              {tab.label}
              <Badge variant="secondary" className="text-[10px]">
                {tab.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeView === "pending" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pendingUsers.map((user, i) => (
              <UserCard key={user.id} user={user} index={i} />
            ))}
          </div>
        )}

        {activeView === "batches" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {onboardingBatches.map((batch, i) => (
              <BatchCard key={batch.id} batch={batch} index={i} />
            ))}
          </div>
        )}

        {activeView === "templates" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {provisioningTemplates.map((template, i) => (
              <TemplateCard key={template.id} template={template} index={i} />
            ))}
          </div>
        )}

        {/* AI Assistant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-5"
          style={{
            border: `1px solid ${PURPLE.replace(")", " / 0.25)")}`,
            background: `linear-gradient(135deg, ${PURPLE.replace(")", " / 0.08)")} 0%, transparent 50%)`,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: PURPLE.replace(")", " / 0.15)"),
                border: `1px solid ${PURPLE.replace(")", " / 0.30)")}`,
              }}
            >
              <Bot className="w-6 h-6" style={{ color: PURPLE }} />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-foreground">
                EDDI Onboarding Intelligence
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                I've analyzed {totalPending} pending users and identified {highConfidence} with high confidence role matches.
                I can auto-provision these users with appropriate permissions based on SIS data, email patterns, and organizational structure.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "Bulk Approve High Confidence",
                  "Re-analyze Low Confidence",
                  "Generate Onboarding Report",
                  "Configure AI Rules",
                ].map((action) => (
                  <Button
                    key={action}
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    style={{ borderColor: PURPLE.replace(")", " / 0.30)") }}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
