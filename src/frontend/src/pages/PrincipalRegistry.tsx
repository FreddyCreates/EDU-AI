import { Badge } from "@/components/ui/badge";
import { useEngines } from "@/hooks/use-engines";
import { useSilverBuilders } from "@/hooks/use-silver-builders";
import { cn } from "@/lib/utils";
import { Database, Lock, Server, Shield, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const AMBER = "oklch(0.75 0.16 70)";

const REGISTRIES = [
  {
    id: "ENGR",
    name: "Engine Registry",
    desc: "All engines across all substrates",
    entries: 18,
    status: "SEALED",
    icon: Zap,
  },
  {
    id: "BLDR",
    name: "Builder Registry",
    desc: "All silver builder agents",
    entries: 8,
    status: "SEALED",
    icon: Users,
  },
  {
    id: "PROT",
    name: "Protocol Registry",
    desc: "All LEX_ laws — sealed at ratification",
    entries: 11,
    status: "SEALED",
    icon: Shield,
  },
  {
    id: "SDKR",
    name: "SDK Registry",
    desc: "All interfaces and entry points",
    entries: 34,
    status: "LIVE",
    icon: Server,
  },
  {
    id: "BRDG",
    name: "Bridge Registry",
    desc: "All language bridges",
    entries: 5,
    status: "SEALED",
    icon: Database,
  },
  {
    id: "RTME",
    name: "Runtime Registry",
    desc: "All substrates and runtimes",
    entries: 5,
    status: "LIVE",
    icon: Server,
  },
  {
    id: "SUBJ",
    name: "Subject Registry",
    desc: "12 subjects · 36 weeks · K-12",
    entries: 156,
    status: "LIVE",
    icon: Database,
  },
  {
    id: "STUD",
    name: "Student Registry",
    desc: "Passport hashes — auth-gated",
    entries: 406,
    status: "AUTH",
    icon: Lock,
  },
];

export default function PrincipalRegistry() {
  const { engines } = useEngines();
  const { builders } = useSilverBuilders();

  return (
    <div className="p-[21px] space-y-[21px]">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Registry
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            ALPH — All sovereign registries under one view
          </p>
        </div>
        <Badge
          className="glass-portal-principal border-0 text-xs"
          style={{ color: AMBER }}
        >
          ALPH Sealed
        </Badge>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[13px]">
        {REGISTRIES.map((reg, i) => (
          <motion.div
            key={reg.id}
            data-ocid={`registry.entry.${i + 1}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass-portal-principal rounded-xl p-5 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(255,185,0,0.1)",
                    border: "1px solid rgba(255,185,0,0.25)",
                  }}
                >
                  <reg.icon className="h-4 w-4" style={{ color: AMBER }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-bold text-sm text-foreground">
                      {reg.id}
                    </p>
                    <Badge
                      className={cn(
                        "text-[9px] px-1.5 border-0",
                        reg.status === "SEALED"
                          ? "bg-[rgba(255,185,0,0.15)] text-[oklch(0.75_0.16_70)]"
                          : reg.status === "AUTH"
                            ? "bg-[rgba(0,210,255,0.1)] text-[oklch(0.78_0.22_200)]"
                            : "bg-[rgba(0,220,130,0.1)] text-[oklch(0.72_0.17_155)]",
                      )}
                    >
                      {reg.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{reg.name}</p>
                </div>
              </div>
              <span
                className="text-lg font-mono font-bold"
                style={{ color: AMBER }}
                data-ocid={`registry.count.${reg.id.toLowerCase()}`}
              >
                {reg.id === "ENGR"
                  ? (engines?.length ?? reg.entries)
                  : reg.id === "BLDR"
                    ? (builders?.length ?? reg.entries)
                    : reg.entries}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{reg.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
