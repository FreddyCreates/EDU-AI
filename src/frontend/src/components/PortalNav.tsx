// PortalNav — Unified navigation component for all portals
// Provides consistent navigation with portal-specific styling

import { EddiModeSwitcher, type EddiMode, EDDI_MODES } from "@/components/EddiModeSwitcher";
import { Badge } from "@/components/ui/badge";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronLeft,
  Home,
  Menu,
  Server,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

// Portal type definitions
export type PortalType =
  | "student"
  | "teacher"
  | "principal"
  | "it"
  | "parent"
  | "counselor"
  | "district";

// Portal configuration with colors and labels
export const PORTAL_CONFIG: Record<
  PortalType,
  {
    label: string;
    color: string;
    glow: string;
    border: string;
    eddiMode: EddiMode;
    terminalPath: string;
  }
> = {
  student: {
    label: "Student",
    color: "oklch(0.78 0.22 200)",
    glow: "rgba(0, 210, 255, 0.25)",
    border: "rgba(0, 210, 255, 0.35)",
    eddiMode: "student",
    terminalPath: "/terminal/student",
  },
  teacher: {
    label: "Teacher",
    color: "oklch(0.68 0.18 280)",
    glow: "rgba(160, 100, 255, 0.25)",
    border: "rgba(160, 100, 255, 0.35)",
    eddiMode: "teacher",
    terminalPath: "/terminal/staff",
  },
  principal: {
    label: "Principal",
    color: "oklch(0.75 0.16 70)",
    glow: "rgba(255, 185, 0, 0.25)",
    border: "rgba(255, 185, 0, 0.35)",
    eddiMode: "principal",
    terminalPath: "/terminal/admin",
  },
  it: {
    label: "IT/Security",
    color: "oklch(0.72 0.17 155)",
    glow: "rgba(0, 220, 130, 0.25)",
    border: "rgba(0, 220, 130, 0.35)",
    eddiMode: "architect",
    terminalPath: "/terminal/admin",
  },
  parent: {
    label: "Parent",
    color: "oklch(0.76 0.18 30)",
    glow: "rgba(255, 180, 100, 0.25)",
    border: "rgba(255, 180, 100, 0.35)",
    eddiMode: "memory",
    terminalPath: "/terminal/external",
  },
  counselor: {
    label: "Counselor",
    color: "oklch(0.74 0.18 320)",
    glow: "rgba(220, 120, 200, 0.25)",
    border: "rgba(220, 120, 200, 0.35)",
    eddiMode: "student",
    terminalPath: "/terminal/staff",
  },
  district: {
    label: "District",
    color: "oklch(0.70 0.16 240)",
    glow: "rgba(120, 140, 255, 0.25)",
    border: "rgba(120, 140, 255, 0.35)",
    eddiMode: "principal",
    terminalPath: "/terminal/external",
  },
};

interface NavLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface PortalNavProps {
  portal: PortalType;
  links: NavLink[];
  title?: string;
  showEddiMode?: boolean;
  onEddiModeChange?: (mode: EddiMode) => void;
}

export function PortalNav({
  portal,
  links,
  title,
  showEddiMode = true,
  onEddiModeChange,
}: PortalNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentEddiMode, setCurrentEddiMode] = useState<EddiMode>(
    PORTAL_CONFIG[portal].eddiMode
  );
  const { location } = useRouterState();
  const config = PORTAL_CONFIG[portal];

  const handleModeChange = (mode: EddiMode) => {
    setCurrentEddiMode(mode);
    onEddiModeChange?.(mode);
  };

  return (
    <>
      {/* Desktop & Tablet Navigation */}
      <nav
        className="sticky top-0 z-40 glass backdrop-blur-xl"
        style={{ borderBottom: `1px solid ${config.border}` }}
        data-ocid={`portal_nav.${portal}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Left: Portal Badge & Title */}
            <div className="flex items-center gap-3">
              {/* Back to Terminal */}
              <Link
                to={config.terminalPath}
                className="hidden md:flex items-center gap-1 text-white/40 hover:text-white/60 transition-colors"
                data-ocid={`portal_nav.${portal}.back`}
              >
                <ChevronLeft className="w-4 h-4" />
              </Link>

              {/* Portal Badge */}
              <Badge
                className="text-[10px] font-mono tracking-wider"
                style={{
                  background: `${config.color.replace(")", " / 0.12)")}`,
                  color: config.color,
                  border: `1px solid ${config.border}`,
                }}
              >
                {config.label.toUpperCase()}
              </Badge>

              {/* Page Title */}
              {title && (
                <h1 className="hidden sm:block text-sm font-semibold text-white/80">
                  {title}
                </h1>
              )}
            </div>

            {/* Center: Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-1">
              {links.slice(0, 6).map((link) => {
                const isActive = location.pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                    }`}
                    data-ocid={`portal_nav.${portal}.link.${link.label.toLowerCase().replace(/\s/g, "_")}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden xl:inline">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right: EDDI Mode & Actions */}
            <div className="flex items-center gap-3">
              {/* EDDI Mode Switcher */}
              {showEddiMode && (
                <div className="hidden md:block">
                  <EddiModeSwitcher
                    currentMode={currentEddiMode}
                    onModeChange={handleModeChange}
                    variant="compact"
                  />
                </div>
              )}

              {/* Terminal Hub Link */}
              <Link
                to="/terminals"
                className="hidden sm:flex items-center gap-1 text-white/30 hover:text-white/50 transition-colors"
                data-ocid={`portal_nav.${portal}.hub`}
              >
                <Server className="w-4 h-4" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
                data-ocid={`portal_nav.${portal}.mobile_toggle`}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-white/70" />
                ) : (
                  <Menu className="w-5 h-5 text-white/70" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed inset-x-0 top-14 z-30 glass backdrop-blur-xl border-b border-white/10"
            style={{ maxHeight: "60vh", overflowY: "auto" }}
            data-ocid={`portal_nav.${portal}.mobile_menu`}
          >
            <div className="p-4 space-y-2">
              {/* EDDI Mode (Mobile) */}
              {showEddiMode && (
                <div className="mb-4 pb-4 border-b border-white/10">
                  <p className="text-[10px] text-white/40 font-mono mb-2">
                    EDDI MODE
                  </p>
                  <EddiModeSwitcher
                    currentMode={currentEddiMode}
                    onModeChange={handleModeChange}
                    variant="dropdown"
                  />
                </div>
              )}

              {/* Navigation Links */}
              {links.map((link) => {
                const isActive = location.pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5"
                    }`}
                    style={
                      isActive
                        ? { border: `1px solid ${config.border}` }
                        : { border: "1px solid transparent" }
                    }
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: isActive ? config.color : undefined }}
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {/* Terminal Hub Link (Mobile) */}
              <Link
                to="/terminals"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl text-white/40 hover:bg-white/5 transition-all mt-4 pt-4 border-t border-white/10"
              >
                <Server className="w-5 h-5" />
                <span>Terminal Hub</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PortalNav;
