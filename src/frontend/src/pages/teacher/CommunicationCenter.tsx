import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bell,
  Calendar,
  ChevronRight,
  FileText,
  Inbox,
  MessageSquare,
  Plus,
  Search,
  Send,
  Users,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface Message {
  id: string;
  from: string;
  fromType: "student" | "parent";
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  studentName?: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  audience: "class" | "parents" | "all";
  views: number;
}

interface Meeting {
  id: string;
  title: string;
  with: string;
  withType: "student" | "parent";
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
}

const messages: Message[] = [
  {
    id: "1",
    from: "Sarah Johnson",
    fromType: "parent",
    subject: "Absence next week",
    preview:
      "Hi Ms. Rivera, I wanted to let you know that Sarah will be absent...",
    date: "May 24",
    unread: true,
    studentName: "Sarah Johnson",
  },
  {
    id: "2",
    from: "James Kim",
    fromType: "student",
    subject: "Question about homework",
    preview: "I'm confused about problem #5 on the worksheet. Can you...",
    date: "May 23",
    unread: true,
  },
  {
    id: "3",
    from: "Maria Santos",
    fromType: "parent",
    subject: "Thank you",
    preview: "Thank you for the extra help you've been giving Maria with...",
    date: "May 22",
    unread: false,
    studentName: "Maria Santos",
  },
  {
    id: "4",
    from: "Carlos Mendoza",
    fromType: "student",
    subject: "Re: Missing assignments",
    preview: "I've completed the missing assignments and submitted them...",
    date: "May 21",
    unread: false,
  },
];

const announcements: Announcement[] = [
  {
    id: "1",
    title: "Unit 4 Test - May 28",
    content:
      "Reminder that the Unit 4 test on Polynomials is next Thursday. Study guide has been posted.",
    date: "May 24",
    audience: "class",
    views: 24,
  },
  {
    id: "2",
    title: "Parent-Teacher Conferences",
    content:
      "Sign-up slots are now available for next month's conferences. Please select a time that works for you.",
    date: "May 20",
    audience: "parents",
    views: 18,
  },
];

const upcomingMeetings: Meeting[] = [
  {
    id: "1",
    title: "Progress Discussion",
    with: "Carlos Mendoza (Parent)",
    withType: "parent",
    date: "May 26",
    time: "3:30 PM",
    status: "scheduled",
  },
  {
    id: "2",
    title: "Extra Help Session",
    with: "James Kim",
    withType: "student",
    date: "May 27",
    time: "4:00 PM",
    status: "scheduled",
  },
];

const messageTemplates = [
  {
    id: "1",
    title: "Missing Assignment Reminder",
    preview: "This is a friendly reminder that [STUDENT] has...",
  },
  {
    id: "2",
    title: "Positive Progress Report",
    preview: "I wanted to share that [STUDENT] has been showing...",
  },
  {
    id: "3",
    title: "Parent Conference Request",
    preview: "I would like to schedule a meeting to discuss...",
  },
  {
    id: "4",
    title: "Absence Follow-up",
    preview: "I noticed [STUDENT] was absent on [DATE]. Please...",
  },
];

const VIOLET = "oklch(0.7 0.18 270)";
const GOLD = "oklch(0.85 0.15 85)";
const EMERALD = "oklch(0.72 0.17 155)";
const _AMBER = "oklch(0.68 0.20 40)";

export default function CommunicationCenter() {
  const [activeTab, setActiveTab] = useState<
    "inbox" | "announcements" | "meetings" | "templates"
  >("inbox");
  const [showCompose, setShowCompose] = useState(false);
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = messages.filter((m) => m.unread).length;

  const filteredMessages = messages.filter(
    (m) =>
      m.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      data-ocid="teacher.messages.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] p-4 md:p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/teacher"
            className="text-[oklch(0.6_0.08_265)] hover:text-violet-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
              Communication Center
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              Messages · Announcements · Meetings
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {activeTab === "inbox" && (
            <Button
              type="button"
              size="sm"
              onClick={() => setShowCompose(true)}
              className="bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30"
            >
              <Plus className="w-4 h-4 mr-1" />
              Compose
            </Button>
          )}
          {activeTab === "announcements" && (
            <Button
              type="button"
              size="sm"
              onClick={() => setShowNewAnnouncement(true)}
              className="bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30"
            >
              <Plus className="w-4 h-4 mr-1" />
              Announcement
            </Button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { key: "inbox", label: "Inbox", icon: Inbox, badge: unreadCount },
          { key: "announcements", label: "Announcements", icon: Bell },
          { key: "meetings", label: "Meetings", icon: Calendar },
          { key: "templates", label: "Templates", icon: FileText },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                : "bg-white/5 text-[oklch(0.6_0.06_265)] border border-white/10 hover:bg-white/10"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <Badge className="bg-violet-500/30 text-violet-200 border-0 text-xs px-1.5 py-0">
                {tab.badge}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Search (for inbox) */}
      {activeTab === "inbox" && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.5_0.06_265)]" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-violet-500/40"
          />
        </div>
      )}

      {/* Inbox Tab */}
      {activeTab === "inbox" && (
        <div className="space-y-2">
          {filteredMessages.map((message, i) => (
            <motion.div
              key={message.id}
              data-ocid={`teacher.messages.message.${i + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`bg-white/5 border backdrop-blur-xl rounded-xl p-4 cursor-pointer hover:bg-white/8 transition-all ${
                message.unread ? "border-violet-500/30" : "border-white/10"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                    style={{
                      background:
                        message.fromType === "parent"
                          ? `${EMERALD}20`
                          : `${VIOLET}20`,
                      color: message.fromType === "parent" ? EMERALD : VIOLET,
                    }}
                  >
                    {message.from
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p
                        className={`font-medium ${message.unread ? "text-[oklch(0.95_0.02_265)]" : "text-[oklch(0.8_0.05_265)]"}`}
                      >
                        {message.from}
                      </p>
                      <Badge
                        className="text-[10px]"
                        style={{
                          background:
                            message.fromType === "parent"
                              ? `${EMERALD}20`
                              : `${VIOLET}20`,
                          color:
                            message.fromType === "parent" ? EMERALD : VIOLET,
                          borderColor:
                            message.fromType === "parent"
                              ? `${EMERALD}40`
                              : `${VIOLET}40`,
                        }}
                      >
                        {message.fromType}
                      </Badge>
                    </div>
                    <p className="text-[oklch(0.7_0.05_265)] text-sm">
                      {message.subject}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {message.unread && (
                    <div className="w-2 h-2 rounded-full bg-violet-400" />
                  )}
                  <span className="text-[oklch(0.5_0.06_265)] text-xs">
                    {message.date}
                  </span>
                </div>
              </div>
              <p className="text-[oklch(0.5_0.06_265)] text-sm line-clamp-1 ml-13">
                {message.preview}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Announcements Tab */}
      {activeTab === "announcements" && (
        <div className="space-y-3">
          {announcements.map((announcement, i) => (
            <motion.div
              key={announcement.id}
              data-ocid={`teacher.messages.announcement.${i + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[oklch(0.9_0.05_265)] font-medium">
                    {announcement.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      className="text-[10px] capitalize"
                      style={{
                        background:
                          announcement.audience === "class"
                            ? `${VIOLET}20`
                            : announcement.audience === "parents"
                              ? `${EMERALD}20`
                              : `${GOLD}20`,
                        color:
                          announcement.audience === "class"
                            ? VIOLET
                            : announcement.audience === "parents"
                              ? EMERALD
                              : GOLD,
                        borderColor:
                          announcement.audience === "class"
                            ? `${VIOLET}40`
                            : announcement.audience === "parents"
                              ? `${EMERALD}40`
                              : `${GOLD}40`,
                      }}
                    >
                      {announcement.audience}
                    </Badge>
                    <span className="text-[oklch(0.5_0.06_265)] text-xs">
                      {announcement.views} views
                    </span>
                  </div>
                </div>
                <span className="text-[oklch(0.5_0.06_265)] text-xs">
                  {announcement.date}
                </span>
              </div>
              <p className="text-[oklch(0.6_0.06_265)] text-sm">
                {announcement.content}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Meetings Tab */}
      {activeTab === "meetings" && (
        <div className="space-y-3">
          <div className="flex justify-end mb-4">
            <Button
              type="button"
              size="sm"
              className="bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30"
            >
              <Plus className="w-4 h-4 mr-1" />
              Schedule Meeting
            </Button>
          </div>
          {upcomingMeetings.map((meeting, i) => (
            <motion.div
              key={meeting.id}
              data-ocid={`teacher.messages.meeting.${i + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        meeting.withType === "parent"
                          ? `${EMERALD}20`
                          : `${VIOLET}20`,
                    }}
                  >
                    <Calendar
                      className="w-5 h-5"
                      style={{
                        color: meeting.withType === "parent" ? EMERALD : VIOLET,
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-[oklch(0.9_0.05_265)] font-medium">
                      {meeting.title}
                    </p>
                    <p className="text-[oklch(0.6_0.06_265)] text-sm">
                      {meeting.with}
                    </p>
                    <p className="text-[oklch(0.5_0.06_265)] text-xs">
                      {meeting.date} at {meeting.time}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                  >
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === "templates" && (
        <div className="space-y-3">
          {messageTemplates.map((template, i) => (
            <motion.div
              key={template.id}
              data-ocid={`teacher.messages.template.${i + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4 cursor-pointer hover:bg-white/8 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-[oklch(0.9_0.05_265)] font-medium">
                      {template.title}
                    </p>
                    <p className="text-[oklch(0.5_0.06_265)] text-sm">
                      {template.preview}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[oklch(0.5_0.06_265)]" />
              </div>
            </motion.div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed border-white/20 text-[oklch(0.6_0.06_265)] hover:bg-white/5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Template
          </Button>
        </div>
      )}

      {/* Compose Modal */}
      {showCompose && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCompose(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[oklch(0.1_0.02_265)] border border-white/10 rounded-2xl p-6 w-full max-w-lg"
          >
            <h2 className="text-lg font-bold text-[oklch(0.95_0.02_265)] mb-4">
              New Message
            </h2>
            <div className="space-y-4">
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-violet-500/40">
                <option value="">Select recipient...</option>
                <optgroup label="Students">
                  {messages
                    .filter((m) => m.fromType === "student")
                    .map((m) => (
                      <option key={m.id} value={m.from}>
                        {m.from}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Parents">
                  {messages
                    .filter((m) => m.fromType === "parent")
                    .map((m) => (
                      <option key={m.id} value={m.from}>
                        {m.from} (Parent of {m.studentName})
                      </option>
                    ))}
                </optgroup>
              </select>
              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-violet-500/40"
              />
              <Textarea
                placeholder="Type your message..."
                className="min-h-[150px] bg-white/5 border-white/10 text-[oklch(0.9_0.05_265)] placeholder:text-[oklch(0.4_0.05_265)]"
              />
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCompose(false)}
                  className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Send
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* New Announcement Modal */}
      {showNewAnnouncement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewAnnouncement(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[oklch(0.1_0.02_265)] border border-white/10 rounded-2xl p-6 w-full max-w-lg"
          >
            <h2 className="text-lg font-bold text-[oklch(0.95_0.02_265)] mb-4">
              New Announcement
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Announcement title"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-violet-500/40"
              />
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-violet-500/40">
                <option value="class">Class Only</option>
                <option value="parents">Parents Only</option>
                <option value="all">Everyone</option>
              </select>
              <Textarea
                placeholder="Announcement content..."
                className="min-h-[150px] bg-white/5 border-white/10 text-[oklch(0.9_0.05_265)] placeholder:text-[oklch(0.4_0.05_265)]"
              />
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewAnnouncement(false)}
                  className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30"
                >
                  <Bell className="w-4 h-4 mr-1" />
                  Post
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
