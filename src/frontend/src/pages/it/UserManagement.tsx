import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  Filter,
  Key,
  Mail,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  Upload,
  User,
  UserCheck,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type UserRole =
  | "student"
  | "teacher"
  | "principal"
  | "it_admin"
  | "counselor"
  | "parent";
type UserStatus = "active" | "inactive" | "pending" | "suspended";

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string | null;
  createdAt: string;
  classes?: number;
  grade?: string;
}

const users: SystemUser[] = [
  {
    id: "1",
    name: "Maria Santos",
    email: "maria.santos@school.edu",
    role: "student",
    status: "active",
    lastLogin: "May 24, 2026 3:42 PM",
    createdAt: "Aug 15, 2025",
    grade: "10",
  },
  {
    id: "2",
    name: "Ms. Rivera",
    email: "rivera@school.edu",
    role: "teacher",
    status: "active",
    lastLogin: "May 24, 2026 8:15 AM",
    createdAt: "Jun 10, 2023",
    classes: 5,
  },
  {
    id: "3",
    name: "James Kim",
    email: "james.kim@school.edu",
    role: "student",
    status: "active",
    lastLogin: "May 23, 2026 4:30 PM",
    createdAt: "Aug 15, 2025",
    grade: "10",
  },
  {
    id: "4",
    name: "Dr. Martinez",
    email: "martinez@school.edu",
    role: "principal",
    status: "active",
    lastLogin: "May 24, 2026 7:00 AM",
    createdAt: "Jan 5, 2022",
  },
  {
    id: "5",
    name: "Carlos Mendoza",
    email: "carlos.m@school.edu",
    role: "student",
    status: "suspended",
    lastLogin: "May 20, 2026 2:15 PM",
    createdAt: "Aug 15, 2025",
    grade: "10",
  },
  {
    id: "6",
    name: "New Teacher",
    email: "newteacher@school.edu",
    role: "teacher",
    status: "pending",
    lastLogin: null,
    createdAt: "May 22, 2026",
    classes: 0,
  },
];

const EMERALD = "oklch(0.72 0.17 155)";
const TEAL = "oklch(0.72 0.16 185)";
const GOLD = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.68 0.18 280)";
const RED = "oklch(0.65 0.22 30)";
const AMBER = "oklch(0.68 0.20 40)";

const roleColors: Record<UserRole, string> = {
  student: TEAL,
  teacher: PURPLE,
  principal: GOLD,
  it_admin: EMERALD,
  counselor: "oklch(0.7 0.18 320)",
  parent: AMBER,
};

const statusColors: Record<UserStatus, string> = {
  active: EMERALD,
  inactive: "oklch(0.5 0.06 265)",
  pending: GOLD,
  suspended: RED,
};

export default function ITUserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    pending: users.filter((u) => u.status === "pending").length,
    suspended: users.filter((u) => u.status === "suspended").length,
  };

  return (
    <div
      data-ocid="it.users.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] p-4 md:p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/it/portal"
            className="text-[oklch(0.6_0.08_265)] hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
              User Management
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              Accounts · Roles · Permissions
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => setShowBulkImport(true)}
            className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
          >
            <Upload className="w-4 h-4 mr-1" />
            Bulk Import
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => setShowAddUser(true)}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-violet-400">{stats.total}</p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Total Users</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: EMERALD }}>
            {stats.active}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Active</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: GOLD }}>
            {stats.pending}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Pending</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: RED }}>
            {stats.suspended}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Suspended</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.5_0.06_265)]" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-emerald-500/40"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[oklch(0.8_0.05_265)] text-sm focus:outline-none focus:border-emerald-500/40"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="principal">Principals</option>
            <option value="it_admin">IT Admins</option>
            <option value="counselor">Counselors</option>
            <option value="parent">Parents</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as UserStatus | "all")
            }
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[oklch(0.8_0.05_265)] text-sm focus:outline-none focus:border-emerald-500/40"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* User List */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: EMERALD }}
          >
            <Users className="inline w-4 h-4 mr-2" />
            Users ({filteredUsers.length})
          </h2>
          <Button
            type="button"
            size="sm"
            className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
          >
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>

        <div className="space-y-2">
          {filteredUsers.map((user, i) => (
            <motion.div
              key={user.id}
              data-ocid={`it.users.user.${i + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                    style={{
                      background: `${roleColors[user.role]}20`,
                      color: roleColors[user.role],
                    }}
                  >
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[oklch(0.9_0.05_265)] font-medium">
                        {user.name}
                      </p>
                      <Badge
                        className="text-[10px] capitalize"
                        style={{
                          background: `${roleColors[user.role]}20`,
                          color: roleColors[user.role],
                          borderColor: `${roleColors[user.role]}40`,
                        }}
                      >
                        {user.role.replace("_", " ")}
                      </Badge>
                      <Badge
                        className="text-[10px] capitalize"
                        style={{
                          background: `${statusColors[user.status]}20`,
                          color: statusColors[user.status],
                          borderColor: `${statusColors[user.status]}40`,
                        }}
                      >
                        {user.status === "active" && (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        )}
                        {user.status === "suspended" && (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {user.status}
                      </Badge>
                    </div>
                    <p className="text-[oklch(0.5_0.06_265)] text-sm">
                      {user.email}
                    </p>
                    <p className="text-[oklch(0.4_0.06_265)] text-xs">
                      {user.lastLogin
                        ? `Last login: ${user.lastLogin}`
                        : "Never logged in"}
                      {user.grade && ` · Grade ${user.grade}`}
                      {user.classes !== undefined &&
                        ` · ${user.classes} classes`}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setSelectedUser(user)}
                    className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                    title="Reset Password"
                  >
                    <Key className="w-4 h-4" />
                  </Button>
                  {user.status === "pending" && (
                    <Button
                      type="button"
                      size="sm"
                      className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
                    >
                      <UserCheck className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Add User Modal */}
      {showAddUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddUser(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[oklch(0.1_0.02_265)] border border-white/10 rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-bold text-[oklch(0.95_0.02_265)] mb-4">
              Add New User
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-emerald-500/40"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-emerald-500/40"
                />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-emerald-500/40"
              />
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-emerald-500/40">
                <option value="">Select role...</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="principal">Principal</option>
                <option value="it_admin">IT Admin</option>
                <option value="counselor">Counselor</option>
                <option value="parent">Parent</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sendInvite"
                  className="rounded border-white/20"
                />
                <label
                  htmlFor="sendInvite"
                  className="text-[oklch(0.7_0.05_265)] text-sm"
                >
                  Send invitation email
                </label>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
                >
                  <UserPlus className="w-4 h-4 mr-1" />
                  Create User
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Bulk Import Modal */}
      {showBulkImport && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowBulkImport(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[oklch(0.1_0.02_265)] border border-white/10 rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-bold text-[oklch(0.95_0.02_265)] mb-4">
              Bulk Import Users
            </h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                <Upload className="w-10 h-10 text-[oklch(0.5_0.06_265)] mx-auto mb-3" />
                <p className="text-[oklch(0.7_0.05_265)] text-sm">
                  Drag and drop CSV file
                </p>
                <p className="text-[oklch(0.5_0.06_265)] text-xs mt-1">
                  or click to browse
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full border-white/20 text-[oklch(0.6_0.08_265)]"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Template CSV
              </Button>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowBulkImport(false)}
                  className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Import
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Edit User Modal */}
      {selectedUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedUser(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[oklch(0.1_0.02_265)] border border-white/10 rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-bold text-[oklch(0.95_0.02_265)] mb-4">
              Edit User: {selectedUser.name}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                defaultValue={selectedUser.name}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-emerald-500/40"
              />
              <input
                type="email"
                defaultValue={selectedUser.email}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-emerald-500/40"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  defaultValue={selectedUser.role}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-emerald-500/40"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="principal">Principal</option>
                  <option value="it_admin">IT Admin</option>
                </select>
                <select
                  defaultValue={selectedUser.status}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-emerald-500/40"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
