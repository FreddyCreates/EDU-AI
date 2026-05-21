import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Megaphone, MessageSquare, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const threads = [
  {
    id: "1",
    from: "Ms. Rivera (Math)",
    subject: "Great progress on last week's quiz!",
    preview: "Marcus scored 8/10 on Tuesday's algebra quiz. He's really...",
    time: "2h ago",
    unread: true,
  },
  {
    id: "2",
    from: "Mr. Thompson (History)",
    subject: "Upcoming project deadline",
    preview: "Reminder that the Reconstruction Era project is due...",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "3",
    from: "Counselor Williams",
    subject: "College readiness meeting",
    preview:
      "I'd like to schedule a meeting to discuss Marcus's senior year...",
    time: "May 16",
    unread: false,
  },
  {
    id: "4",
    from: "Principal Rodriguez",
    subject: "End-of-year ceremony information",
    preview: "Please join us for our annual academic recognition ceremony...",
    time: "May 14",
    unread: false,
  },
];

const announcements = [
  {
    title: "STAAR Testing Schedule — May 20–24",
    date: "May 18",
    priority: "urgent" as const,
  },
  {
    title: "Summer School Registration Open",
    date: "May 15",
    priority: "normal" as const,
  },
  {
    title: "Parent-Teacher Conferences: June 3",
    date: "May 12",
    priority: "normal" as const,
  },
];

export default function ParentMessages() {
  const [tab, setTab] = useState<"messages" | "announcements">("messages");

  return (
    <div
      data-ocid="parent.messages.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/parent"
            className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
            Messages
          </h1>
        </div>
        <Button
          data-ocid="parent.compose.button"
          size="sm"
          className="bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
        >
          <Plus className="w-4 h-4 mr-1" /> Compose
        </Button>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 bg-white/5 rounded-xl p-1 mb-6"
        data-ocid="parent.messages.tab"
      >
        {(["messages", "announcements"] as const).map((t) => (
          <button
            key={t}
            type="button"
            data-ocid={`parent.tab.${t}`}
            onClick={() => setTab(t)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              tab === t
                ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)]"
                : "text-[oklch(0.55_0.06_265)] hover:text-[oklch(0.75_0.08_265)]"
            }`}
          >
            {t === "messages" ? (
              <MessageSquare className="w-4 h-4" />
            ) : (
              <Megaphone className="w-4 h-4" />
            )}
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "messages" ? (
          <motion.div
            key="msgs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {threads.map((t, i) => (
              <motion.div
                key={t.id}
                data-ocid={`parent.message.${i + 1}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`bg-white/5 border rounded-xl p-4 cursor-pointer hover:bg-white/8 transition-all ${
                  t.unread
                    ? "border-[oklch(0.85_0.15_85)]/30"
                    : "border-white/10"
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span
                    className={`text-sm font-medium ${t.unread ? "text-[oklch(0.9_0.05_265)]" : "text-[oklch(0.65_0.06_265)]"}`}
                  >
                    {t.from}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[oklch(0.45_0.05_265)] text-xs">
                      {t.time}
                    </span>
                    {t.unread && (
                      <div className="w-2 h-2 rounded-full bg-[oklch(0.85_0.15_85)]" />
                    )}
                  </div>
                </div>
                <p
                  className={`text-sm ${t.unread ? "text-[oklch(0.85_0.05_265)]" : "text-[oklch(0.6_0.06_265)]"}`}
                >
                  {t.subject}
                </p>
                <p className="text-[oklch(0.45_0.05_265)] text-xs mt-1 truncate">
                  {t.preview}
                </p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="anns"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {announcements.map((a, i) => (
              <motion.div
                key={a.title}
                data-ocid={`parent.announcement.${i + 1}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-[oklch(0.85_0.05_265)] text-sm font-medium">
                    {a.title}
                  </p>
                  <p className="text-[oklch(0.5_0.06_265)] text-xs mt-0.5">
                    {a.date}
                  </p>
                </div>
                {a.priority === "urgent" && (
                  <Badge className="bg-[oklch(0.65_0.22_30)]/20 text-[oklch(0.75_0.2_60)] border-[oklch(0.65_0.22_30)]/30 text-xs">
                    Urgent
                  </Badge>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
