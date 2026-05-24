import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Filter,
  FolderOpen,
  Heart,
  Plus,
  Search,
  Share2,
  Sparkles,
  Star,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "lesson_plan" | "worksheet" | "presentation" | "video" | "assessment";
  subject: string;
  gradeLevel: string;
  author: string;
  rating: number;
  downloads: number;
  isFavorite: boolean;
  isShared: boolean;
  dateAdded: string;
}

interface Category {
  id: string;
  name: string;
  icon: typeof BookOpen;
  count: number;
  color: string;
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Quadratic Equations - Complete Unit Plan",
    description:
      "5-day lesson plan covering quadratic formula, factoring, and graphing",
    type: "lesson_plan",
    subject: "math",
    gradeLevel: "9-10",
    author: "EduAI Curriculum",
    rating: 4.9,
    downloads: 234,
    isFavorite: true,
    isShared: false,
    dateAdded: "May 20",
  },
  {
    id: "2",
    title: "Cell Division Interactive Worksheet",
    description: "Student worksheet with diagrams for mitosis and meiosis",
    type: "worksheet",
    subject: "science",
    gradeLevel: "9-12",
    author: "Ms. Chen",
    rating: 4.7,
    downloads: 156,
    isFavorite: false,
    isShared: true,
    dateAdded: "May 18",
  },
  {
    id: "3",
    title: "WWII Timeline Presentation",
    description: "Comprehensive slideshow covering major events 1939-1945",
    type: "presentation",
    subject: "history",
    gradeLevel: "10-11",
    author: "Mr. Garcia",
    rating: 4.8,
    downloads: 189,
    isFavorite: true,
    isShared: true,
    dateAdded: "May 15",
  },
  {
    id: "4",
    title: "Essay Writing Assessment Rubric",
    description: "Detailed rubric for evaluating argumentative essays",
    type: "assessment",
    subject: "english",
    gradeLevel: "9-12",
    author: "EduAI Curriculum",
    rating: 4.6,
    downloads: 312,
    isFavorite: false,
    isShared: false,
    dateAdded: "May 10",
  },
  {
    id: "5",
    title: "Polynomial Operations Video Series",
    description: "4-part video series explaining polynomial arithmetic",
    type: "video",
    subject: "math",
    gradeLevel: "8-9",
    author: "EduAI Curriculum",
    rating: 4.9,
    downloads: 445,
    isFavorite: true,
    isShared: false,
    dateAdded: "May 8",
  },
];

const categories: Category[] = [
  {
    id: "1",
    name: "Lesson Plans",
    icon: BookOpen,
    count: 45,
    color: "oklch(0.7 0.18 270)",
  },
  {
    id: "2",
    name: "Worksheets",
    icon: FileText,
    count: 78,
    color: "oklch(0.85 0.15 85)",
  },
  {
    id: "3",
    name: "Presentations",
    icon: FolderOpen,
    count: 32,
    color: "oklch(0.72 0.17 155)",
  },
  {
    id: "4",
    name: "Assessments",
    icon: Star,
    count: 28,
    color: "oklch(0.68 0.20 40)",
  },
];

const VIOLET = "oklch(0.7 0.18 270)";
const GOLD = "oklch(0.85 0.15 85)";
const EMERALD = "oklch(0.72 0.17 155)";
const AMBER = "oklch(0.68 0.20 40)";

const typeColors: Record<string, string> = {
  lesson_plan: VIOLET,
  worksheet: GOLD,
  presentation: EMERALD,
  video: "oklch(0.65 0.22 30)",
  assessment: AMBER,
};

const subjectColors: Record<string, string> = {
  math: GOLD,
  science: EMERALD,
  english: VIOLET,
  history: AMBER,
};

const typeIcons: Record<string, typeof BookOpen> = {
  lesson_plan: BookOpen,
  worksheet: FileText,
  presentation: FolderOpen,
  video: ExternalLink,
  assessment: Star,
};

export default function ResourceLibrary() {
  const [activeTab, setActiveTab] = useState<
    "browse" | "my_resources" | "favorites"
  >("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showAiSuggest, setShowAiSuggest] = useState(false);

  const filteredResources = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || r.subject === selectedSubject;
    const matchesTab =
      activeTab === "browse" ||
      (activeTab === "favorites" && r.isFavorite) ||
      (activeTab === "my_resources" && r.isShared);
    return matchesSearch && matchesSubject && matchesTab;
  });

  return (
    <div
      data-ocid="teacher.resources.page"
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
              Resource Library
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              Lesson Plans · Worksheets · Materials
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => setShowAiSuggest(true)}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            AI Suggest
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => setShowUpload(true)}
            className="bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30"
          >
            <Upload className="w-4 h-4 mr-1" />
            Upload
          </Button>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {categories.map((category, i) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/8 transition-all"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${category.color}20` }}
            >
              <category.icon
                className="w-5 h-5"
                style={{ color: category.color }}
              />
            </div>
            <p className="text-[oklch(0.9_0.05_265)] font-medium text-sm">
              {category.name}
            </p>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              {category.count} resources
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "browse", label: "Browse All" },
          { key: "my_resources", label: "My Resources" },
          { key: "favorites", label: "Favorites" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                : "bg-white/5 text-[oklch(0.6_0.06_265)] border border-white/10 hover:bg-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.5_0.06_265)]" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-violet-500/40"
          />
        </div>
        <div className="flex gap-2">
          {["math", "science", "english", "history"].map((subject) => (
            <button
              key={subject}
              type="button"
              onClick={() =>
                setSelectedSubject(selectedSubject === subject ? null : subject)
              }
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                selectedSubject === subject
                  ? ""
                  : "bg-white/5 text-[oklch(0.6_0.06_265)] border border-white/10"
              }`}
              style={
                selectedSubject === subject
                  ? {
                      background: `${subjectColors[subject]}20`,
                      color: subjectColors[subject],
                      borderWidth: 1,
                      borderColor: `${subjectColors[subject]}40`,
                    }
                  : {}
              }
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Resource List */}
      <div className="space-y-3">
        {filteredResources.map((resource, i) => {
          const TypeIcon = typeIcons[resource.type];
          return (
            <motion.div
              key={resource.id}
              data-ocid={`teacher.resources.item.${i + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${typeColors[resource.type]}20` }}
                >
                  <TypeIcon
                    className="w-6 h-6"
                    style={{ color: typeColors[resource.type] }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-[oklch(0.9_0.05_265)] font-medium">
                        {resource.title}
                      </p>
                      <p className="text-[oklch(0.5_0.06_265)] text-sm line-clamp-1">
                        {resource.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 ml-2"
                      onClick={() => {}}
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          resource.isFavorite
                            ? "fill-rose-400 text-rose-400"
                            : "text-[oklch(0.5_0.06_265)] hover:text-rose-400"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <Badge
                      className="text-[10px] capitalize"
                      style={{
                        background: `${subjectColors[resource.subject]}20`,
                        color: subjectColors[resource.subject],
                        borderColor: `${subjectColors[resource.subject]}40`,
                      }}
                    >
                      {resource.subject}
                    </Badge>
                    <Badge className="text-[10px] bg-white/5 text-[oklch(0.6_0.06_265)] border-white/10">
                      Grades {resource.gradeLevel}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-[oklch(0.5_0.06_265)]">
                      <Star className="w-3 h-3 fill-[oklch(0.85_0.15_85)] text-[oklch(0.85_0.15_85)]" />
                      {resource.rating}
                    </span>
                    <span className="text-xs text-[oklch(0.5_0.06_265)]">
                      {resource.downloads} downloads
                    </span>
                    <span className="text-xs text-[oklch(0.4_0.06_265)]">
                      by {resource.author}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      type="button"
                      size="sm"
                      className="bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowUpload(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[oklch(0.1_0.02_265)] border border-white/10 rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-bold text-[oklch(0.95_0.02_265)] mb-4">
              Upload Resource
            </h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                <Upload className="w-10 h-10 text-[oklch(0.5_0.06_265)] mx-auto mb-3" />
                <p className="text-[oklch(0.7_0.05_265)] text-sm">
                  Drag and drop or click to upload
                </p>
                <p className="text-[oklch(0.5_0.06_265)] text-xs mt-1">
                  PDF, DOCX, PPTX, or video files
                </p>
              </div>
              <input
                type="text"
                placeholder="Resource title"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-violet-500/40"
              />
              <div className="grid grid-cols-2 gap-3">
                <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-[oklch(0.8_0.05_265)] text-sm focus:outline-none focus:border-violet-500/40">
                  <option value="">Subject</option>
                  <option value="math">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                  <option value="history">History</option>
                </select>
                <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-[oklch(0.8_0.05_265)] text-sm focus:outline-none focus:border-violet-500/40">
                  <option value="">Resource Type</option>
                  <option value="lesson_plan">Lesson Plan</option>
                  <option value="worksheet">Worksheet</option>
                  <option value="presentation">Presentation</option>
                  <option value="assessment">Assessment</option>
                </select>
              </div>
              <textarea
                placeholder="Description..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-violet-500/40 resize-none"
              />
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUpload(false)}
                  className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Upload
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* AI Suggest Modal */}
      {showAiSuggest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAiSuggest(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[oklch(0.1_0.02_265)] border border-emerald-500/30 rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-[oklch(0.95_0.02_265)]">
                AI Resource Suggestions
              </h2>
            </div>
            <p className="text-[oklch(0.6_0.06_265)] text-sm mb-4">
              EDDI will analyze your upcoming lessons and student needs to
              suggest relevant resources.
            </p>
            <div className="space-y-4">
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-emerald-500/40">
                <option value="">Select upcoming topic...</option>
                <option value="quadratic">Quadratic Equations</option>
                <option value="cell">Cell Division</option>
                <option value="essay">Essay Writing</option>
                <option value="wwii">World War II</option>
              </select>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAiSuggest(false)}
                  className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Get Suggestions
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
