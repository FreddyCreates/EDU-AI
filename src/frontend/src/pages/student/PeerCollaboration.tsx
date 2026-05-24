import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  FileText,
  MessageSquare,
  Plus,
  Search,
  Share2,
  Star,
  Users,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  members: number;
  maxMembers: number;
  nextSession: string;
  isJoined: boolean;
  description: string;
}

interface SharedResource {
  id: string;
  title: string;
  type: "notes" | "flashcards" | "quiz";
  author: string;
  rating: number;
  downloads: number;
  subject: string;
}

const studyGroups: StudyGroup[] = [
  {
    id: "1",
    name: "Algebra II Study Squad",
    subject: "math",
    members: 5,
    maxMembers: 8,
    nextSession: "Today, 4:00 PM",
    isJoined: true,
    description: "Weekly practice problems and exam prep",
  },
  {
    id: "2",
    name: "Biology Lab Partners",
    subject: "science",
    members: 4,
    maxMembers: 6,
    nextSession: "Tomorrow, 3:30 PM",
    isJoined: true,
    description: "Lab report collaboration and review",
  },
  {
    id: "3",
    name: "History Debate Club",
    subject: "history",
    members: 7,
    maxMembers: 10,
    nextSession: "Wed, 5:00 PM",
    isJoined: false,
    description: "Discussing historical events and perspectives",
  },
  {
    id: "4",
    name: "English Essay Writers",
    subject: "english",
    members: 3,
    maxMembers: 6,
    nextSession: "Thu, 4:30 PM",
    isJoined: false,
    description: "Peer review and writing improvement",
  },
];

const sharedResources: SharedResource[] = [
  {
    id: "1",
    title: "Quadratic Formula Flashcards",
    type: "flashcards",
    author: "Maria S.",
    rating: 4.8,
    downloads: 45,
    subject: "math",
  },
  {
    id: "2",
    title: "Cell Division Notes",
    type: "notes",
    author: "James K.",
    rating: 4.5,
    downloads: 32,
    subject: "science",
  },
  {
    id: "3",
    title: "WWII Timeline Quiz",
    type: "quiz",
    author: "Priya N.",
    rating: 4.9,
    downloads: 58,
    subject: "history",
  },
];

const subjectColors: Record<string, string> = {
  math: "oklch(0.85 0.15 85)",
  science: "oklch(0.72 0.17 155)",
  english: "oklch(0.7 0.18 270)",
  history: "oklch(0.68 0.20 40)",
};

const resourceTypeIcons: Record<string, typeof FileText> = {
  notes: FileText,
  flashcards: Share2,
  quiz: Star,
};

export default function PeerCollaboration() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"groups" | "resources">("groups");
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const myGroups = studyGroups.filter((g) => g.isJoined);
  const availableGroups = studyGroups.filter((g) => !g.isJoined);

  return (
    <div
      data-ocid="student.collaboration.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
              Peer Collaboration
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              Study Groups · Shared Resources
            </p>
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => setShowCreateGroup(true)}
          className="bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.5_0.06_265)]" />
        <input
          type="text"
          placeholder="Search groups or resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40"
        />
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("groups")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "groups"
              ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/40"
              : "bg-white/5 text-[oklch(0.6_0.06_265)] border border-white/10"
          }`}
        >
          <Users className="inline w-4 h-4 mr-1" />
          Study Groups
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("resources")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "resources"
              ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/40"
              : "bg-white/5 text-[oklch(0.6_0.06_265)] border border-white/10"
          }`}
        >
          <Share2 className="inline w-4 h-4 mr-1" />
          Resources
        </button>
      </div>

      {activeTab === "groups" && (
        <>
          {/* My Groups */}
          {myGroups.length > 0 && (
            <section className="mb-8">
              <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
                <Users className="inline w-4 h-4 mr-2" />
                My Study Groups
              </h2>
              <div className="space-y-3">
                {myGroups.map((group, i) => (
                  <motion.div
                    key={group.id}
                    data-ocid={`student.collaboration.mygroup.${i + 1}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: `${subjectColors[group.subject]}20`,
                          }}
                        >
                          <Users
                            className="w-5 h-5"
                            style={{ color: subjectColors[group.subject] }}
                          />
                        </div>
                        <div>
                          <p className="text-[oklch(0.9_0.05_265)] font-medium">
                            {group.name}
                          </p>
                          <p className="text-[oklch(0.5_0.06_265)] text-xs">
                            {group.members}/{group.maxMembers} members
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-[oklch(0.72_0.17_155)]/20 text-[oklch(0.72_0.17_155)] border-[oklch(0.72_0.17_155)]/30">
                        Joined
                      </Badge>
                    </div>
                    <p className="text-[oklch(0.6_0.06_265)] text-sm mb-3">
                      {group.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[oklch(0.5_0.06_265)] text-xs">
                        Next: {group.nextSession}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          className="bg-[oklch(0.72_0.17_155)]/20 hover:bg-[oklch(0.72_0.17_155)]/30 text-[oklch(0.72_0.17_155)] border border-[oklch(0.72_0.17_155)]/30"
                        >
                          <Video className="w-4 h-4 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Available Groups */}
          <section>
            <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
              Discover Groups
            </h2>
            <div className="space-y-3">
              {availableGroups.map((group, i) => (
                <motion.div
                  key={group.id}
                  data-ocid={`student.collaboration.availablegroup.${i + 1}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${subjectColors[group.subject]}20`,
                        }}
                      >
                        <Users
                          className="w-5 h-5"
                          style={{ color: subjectColors[group.subject] }}
                        />
                      </div>
                      <div>
                        <p className="text-[oklch(0.9_0.05_265)] font-medium">
                          {group.name}
                        </p>
                        <p className="text-[oklch(0.5_0.06_265)] text-xs">
                          {group.members}/{group.maxMembers} members
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-[oklch(0.6_0.06_265)] text-sm mb-3">
                    {group.description}
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    className="w-full bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Request to Join
                  </Button>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === "resources" && (
        <section>
          <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
            <Share2 className="inline w-4 h-4 mr-2" />
            Shared Resources
          </h2>
          <div className="space-y-3">
            {sharedResources.map((resource, i) => {
              const Icon = resourceTypeIcons[resource.type];
              return (
                <motion.div
                  key={resource.id}
                  data-ocid={`student.collaboration.resource.${i + 1}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${subjectColors[resource.subject]}20`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: subjectColors[resource.subject] }}
                        />
                      </div>
                      <div>
                        <p className="text-[oklch(0.9_0.05_265)] font-medium">
                          {resource.title}
                        </p>
                        <p className="text-[oklch(0.5_0.06_265)] text-xs">
                          by {resource.author}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-white/5 text-[oklch(0.7_0.06_265)] border-white/10 capitalize">
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-[oklch(0.5_0.06_265)]">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[oklch(0.85_0.15_85)] text-[oklch(0.85_0.15_85)]" />
                        {resource.rating}
                      </span>
                      <span>{resource.downloads} downloads</span>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                    >
                      View
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Upload Resource */}
          <Button
            type="button"
            variant="outline"
            className="w-full mt-6 border-dashed border-white/20 text-[oklch(0.6_0.06_265)] hover:bg-white/5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Share Your Notes
          </Button>
        </section>
      )}

      {/* Create Group Modal */}
      {showCreateGroup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCreateGroup(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[oklch(0.1_0.02_265)] border border-white/10 rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-bold text-[oklch(0.95_0.02_265)] mb-4">
              Create Study Group
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Group name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40"
              />
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40">
                <option value="">Select Subject</option>
                <option value="math">Mathematics</option>
                <option value="science">Science</option>
                <option value="english">English</option>
                <option value="history">History</option>
              </select>
              <textarea
                placeholder="Group description..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40 resize-none"
              />
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateGroup(false)}
                  className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
                >
                  Create Group
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
