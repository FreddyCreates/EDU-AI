import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateFactoryStudent, useFactoryStatus } from "@/hooks/use-factory";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Lock,
  Settings,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AMBER = "oklch(0.76 0.18 84)";
const AMBER_GLOW = "rgba(245, 155, 0, 0.18)";
const AMBER_BORDER = "rgba(245, 155, 0, 0.25)";

const GRADE_OPTIONS = [
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

function useLocalFactoryInit() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (adminName: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.factoryAdminSetup(adminName);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
  });
}

const inputStyle = {
  background: "rgba(12,14,28,0.80)",
  backdropFilter: "blur(8px)",
  borderColor: AMBER_BORDER,
};

export default function FactorySetupPage() {
  const navigate = useNavigate();
  const { data: isInitialized, isLoading } = useQuery<boolean>({
    queryKey: ["factoryInitialized"],
    queryFn: async () => false,
    enabled: false,
  });
  const { data: factoryStatus, isLoading: statusLoading } = useFactoryStatus();
  const setupMutation = useLocalFactoryInit();
  const createStudent = useCreateFactoryStudent();
  const [adminName, setAdminName] = useState("");
  const [success, setSuccess] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newGrade, setNewGrade] = useState("5");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate({ to: "/admin" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminName.trim()) return;
    setupMutation.mutate(adminName.trim(), {
      onSuccess: () => {
        setSuccess(true);
        toast.success("Factory initialized successfully");
      },
      onError: (err) => {
        toast.error("Setup failed", {
          description:
            err instanceof Error ? err.message : "Initialization error.",
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div
        className="max-w-lg mx-auto px-4 py-16 space-y-4"
        data-ocid="factory.loading_state"
      >
        <Skeleton className="h-8 w-48 rounded-xl" />
        <div
          className="glass-xl rounded-2xl h-40"
          style={{ border: `1px solid ${AMBER_BORDER}` }}
        />
      </div>
    );
  }

  void isInitialized;

  if (isInitialized) {
    return (
      <div
        className="max-w-lg mx-auto px-4 py-16"
        data-ocid="factory.initialized_page"
      >
        <div
          className="glass-xl rounded-3xl p-10 text-center relative overflow-hidden"
          style={{ border: `1px solid ${AMBER_BORDER}` }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245,155,0,0.10) 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{
                background: "rgba(245,155,0,0.12)",
                border: `1px solid ${AMBER_BORDER}`,
              }}
            >
              <Lock className="w-8 h-8" style={{ color: AMBER }} />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">
              Factory Already Initialized
            </h2>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              This setup was sealed on first deploy. The factory admin has
              already been configured. This page is now permanently locked.
            </p>
            <Link to="/admin">
              <button
                type="button"
                className="w-full rounded-xl py-3 font-mono text-sm font-bold"
                style={{
                  background: "rgba(245,155,0,0.18)",
                  color: AMBER,
                  border: `1px solid ${AMBER_BORDER}`,
                }}
                data-ocid="factory.go_admin_button"
              >
                Go to Admin Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div
        className="max-w-lg mx-auto px-4 py-16"
        data-ocid="factory.success_page"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-xl rounded-3xl p-10 text-center relative overflow-hidden"
          style={{ border: "1px solid rgba(0,220,130,0.25)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,220,130,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{
                background: "rgba(0,220,130,0.12)",
                border: "1px solid rgba(0,220,130,0.25)",
              }}
            >
              <CheckCircle2
                className="w-8 h-8"
                style={{ color: "oklch(0.72 0.17 155)" }}
              />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">
              ✶ Factory Admin Initialized
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              The platform has been sealed and admin access is now active.
              Redirecting to Admin Dashboard in 3 seconds…
            </p>
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ background: "rgba(0,220,130,0.15)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  background: "oklch(0.72 0.17 155)",
                  animation: "factory-progress 3s linear forwards",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="max-w-lg mx-auto px-4 py-16 space-y-5"
      data-ocid="factory.setup_page"
    >
      {/* OS Header */}
      <div
        className="glass-xl rounded-3xl p-8 text-center relative overflow-hidden glass-shimmer"
        style={{ border: `1px solid ${AMBER_BORDER}` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,155,0,0.14) 0%, transparent 70%)",
          }}
        />
        <div className="relative">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background: "rgba(245,155,0,0.12)",
              border: `1px solid ${AMBER_BORDER}`,
              boxShadow: `0 0 20px ${AMBER_GLOW}`,
            }}
          >
            <Settings className="w-7 h-7" style={{ color: AMBER }} />
          </div>
          <h1
            className="text-2xl font-display font-black tracking-tight"
            style={{ color: AMBER, textShadow: `0 0 28px ${AMBER_GLOW}` }}
          >
            FACTORY ADMIN SETUP
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            First-deploy initialization · This page locks after first use
          </p>
        </div>
      </div>

      {/* Factory Status card */}
      <div
        className="glass rounded-2xl p-4"
        style={{ border: `1px solid ${AMBER_BORDER}` }}
        data-ocid="factory.status_card"
      >
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4" style={{ color: AMBER }} />
          <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
            Factory Status
          </p>
        </div>
        {statusLoading ? (
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-sm rounded-xl h-14" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              {
                label: "Admin Account",
                value: factoryStatus?.adminExists ? "Created" : "Pending",
                color: factoryStatus?.adminExists
                  ? "oklch(0.72 0.17 155)"
                  : AMBER,
              },
              {
                label: "Students",
                value: String(factoryStatus?.studentCount ?? 0),
                color: AMBER,
              },
              {
                label: "Factory",
                value: factoryStatus?.factoryLocked ? "Locked" : "Active",
                color: factoryStatus?.factoryLocked
                  ? "oklch(0.65 0.22 22)"
                  : "oklch(0.72 0.17 155)",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="glass-sm rounded-xl p-2.5 text-center"
              >
                <p className="text-sm font-display font-bold" style={{ color }}>
                  {value}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Warning banner */}
      <div
        className="glass-sm rounded-2xl p-4 flex items-start gap-3"
        style={{
          background: "rgba(245,155,0,0.06)",
          border: `1px solid ${AMBER_BORDER}`,
        }}
        data-ocid="factory.warning_banner"
      >
        <AlertTriangle
          className="w-5 h-5 flex-shrink-0 mt-0.5"
          style={{ color: AMBER }}
        />
        <div className="text-sm">
          <p className="font-semibold" style={{ color: AMBER }}>
            Irreversible Action
          </p>
          <p className="text-muted-foreground mt-0.5">
            Once submitted, this setup page locks permanently. The admin
            identity will be sealed to the platform canister.
          </p>
        </div>
      </div>

      {/* Setup form */}
      <div
        className="glass-xl rounded-2xl p-6"
        style={{ border: `1px solid ${AMBER_BORDER}` }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="admin-name"
              className="text-xs text-muted-foreground"
            >
              Admin Name
            </Label>
            <Input
              id="admin-name"
              type="text"
              placeholder="Enter admin display name"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              autoComplete="off"
              data-ocid="factory.admin_name_input"
              style={inputStyle}
            />
            <p className="text-xs text-muted-foreground">
              This name is sealed into the platform registry and never shown to
              students.
            </p>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl py-4 font-mono text-sm font-bold transition-smooth"
            disabled={!adminName.trim() || setupMutation.isPending}
            data-ocid="factory.submit_button"
            style={{
              background:
                !adminName.trim() || setupMutation.isPending
                  ? "rgba(245,155,0,0.08)"
                  : "rgba(245,155,0,0.20)",
              color: AMBER,
              border: `1px solid ${AMBER_BORDER}`,
              boxShadow:
                !adminName.trim() || setupMutation.isPending
                  ? undefined
                  : `0 0 24px ${AMBER_GLOW}`,
            }}
          >
            {setupMutation.isPending
              ? "Initializing…"
              : "Initialize Factory Admin"}
          </button>
        </form>
      </div>

      {/* Create Student section */}
      {factoryStatus?.adminExists && !factoryStatus?.factoryLocked && (
        <div
          className="glass-xl rounded-2xl p-6 space-y-4"
          style={{ border: `1px solid ${AMBER_BORDER}` }}
          data-ocid="factory.create_student_section"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: AMBER }} />
            <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
              Create Student Account
            </p>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="new-username"
              className="text-xs text-muted-foreground"
            >
              Username
            </Label>
            <Input
              id="new-username"
              type="text"
              placeholder="student_username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              autoComplete="off"
              data-ocid="factory.new_username_input"
              style={inputStyle}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="new-grade"
              className="text-xs text-muted-foreground"
            >
              Grade Level
            </Label>
            <select
              id="new-grade"
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
              data-ocid="factory.grade_select"
              className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none"
              style={{
                background: "rgba(12,14,28,0.80)",
                borderColor: AMBER_BORDER,
                backdropFilter: "blur(8px)",
                color: "inherit",
              }}
            >
              {GRADE_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g === "K" ? "Kindergarten" : `Grade ${g}`}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-mono text-sm font-bold transition-smooth"
            disabled={!newUsername.trim() || createStudent.isPending}
            data-ocid="factory.create_student_button"
            style={{
              background:
                !newUsername.trim() || createStudent.isPending
                  ? "rgba(245,155,0,0.08)"
                  : "rgba(245,155,0,0.16)",
              color: AMBER,
              border: `1px solid ${AMBER_BORDER}`,
            }}
            onClick={() => {
              if (!newUsername.trim()) return;
              createStudent.mutate(
                { username: newUsername.trim(), gradeLevel: newGrade },
                {
                  onSuccess: () => {
                    toast.success("Student account created");
                    setNewUsername("");
                    setNewGrade("5");
                  },
                },
              );
            }}
          >
            {createStudent.isPending ? "Creating…" : "Create Student"}
          </button>
        </div>
      )}
    </div>
  );
}
