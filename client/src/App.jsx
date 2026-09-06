import React, { useState, useMemo } from "react";
import {
  Briefcase, User, Search, Bell, LogOut, LayoutDashboard, FileText,
  CheckCircle2, XCircle, Clock, Users, ShieldCheck, PlusCircle,
  MapPin, Calendar, Filter, ChevronRight, GraduationCap, Building2,
  ClipboardList, AlertTriangle, X
} from "lucide-react";

// ---------- Mock Data ----------
const initialJobs = [
  { id: 1, title: "Frontend Developer Intern", company: "PixelForge Ltd.", type: "Internship", location: "Dhaka", hours: "20 hrs/week", skills: ["React", "CSS", "Git"], match: 92, status: "Approved" },
  { id: 2, title: "Content Writer (Part-time)", company: "WordNest BD", type: "Part-time", location: "Remote", hours: "15 hrs/week", skills: ["Writing", "SEO"], match: 78, status: "Approved" },
  { id: 3, title: "Data Entry Assistant", company: "Bindu Analytics", type: "Part-time", location: "Chattogram", hours: "18 hrs/week", skills: ["Excel", "Typing"], match: 61, status: "Approved" },
  { id: 4, title: "UI/UX Design Intern", company: "Studio Nabo", type: "Internship", location: "Dhaka", hours: "25 hrs/week", skills: ["Figma", "Design"], match: 85, status: "Pending" },
];

const initialApplications = [
  { id: 1, jobTitle: "Frontend Developer Intern", company: "PixelForge Ltd.", appliedOn: "2 Sep 2026", status: "Interview" },
  { id: 2, jobTitle: "Content Writer (Part-time)", company: "WordNest BD", appliedOn: "28 Aug 2026", status: "Shortlisted" },
  { id: 3, jobTitle: "Data Entry Assistant", company: "Bindu Analytics", appliedOn: "20 Aug 2026", status: "Rejected" },
];

const initialApplicants = [
  { id: 1, name: "Nabila Haque", university: "AIUB", skills: ["React", "Node"], match: 92, status: "Applied" },
  { id: 2, name: "Tanvir Ahmed", university: "NSU", skills: ["React", "CSS"], match: 88, status: "Shortlisted" },
  { id: 3, name: "Farhana Islam", university: "BRACU", skills: ["JavaScript"], match: 74, status: "Applied" },
];

const initialUsers = [
  { id: 1, name: "Nabila Haque", role: "Student", email: "nabila@aiub.edu", verified: true },
  { id: 2, name: "PixelForge Ltd.", role: "Employer", email: "hr@pixelforge.bd", verified: true },
  { id: 3, name: "Studio Nabo", role: "Employer", email: "contact@studionabo.bd", verified: false },
];

const initialPendingJobs = [
  { id: 4, title: "UI/UX Design Intern", company: "Studio Nabo", type: "Internship", location: "Dhaka" },
];

// ---------- Small UI atoms ----------
const statusStyles = {
  Applied: "bg-[#EFEAE0] text-[#5A5148]",
  Shortlisted: "bg-[#E8A33D]/20 text-[#8A5A12]",
  Interview: "bg-[#12352A]/10 text-[#12352A]",
  Selected: "bg-[#3F6B4F]/15 text-[#2C4C38]",
  Rejected: "bg-[#C1493A]/10 text-[#C1493A]",
  Approved: "bg-[#3F6B4F]/15 text-[#2C4C38]",
  Pending: "bg-[#E8A33D]/20 text-[#8A5A12]",
};

function StatusPill({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

function MatchBadge({ score }) {
  const color = score >= 85 ? "#2C4C38" : score >= 70 ? "#8A5A12" : "#6B7280";
  const bg = score >= 85 ? "#3F6B4F1F" : score >= 70 ? "#E8A33D26" : "#6B72801A";
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ color, backgroundColor: bg }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {score}% match
    </div>
  );
}

// ---------- Landing ----------
function Landing({ onEnter }) {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1B231F]">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#12352A] flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-[#E8A33D]" />
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="font-bold text-lg">CampusCareer BD</span>
        </div>
        <button
          onClick={() => onEnter("student")}
          className="text-sm font-medium px-4 py-2 rounded-md border border-[#12352A]/20 hover:bg-[#12352A]/5 transition-colors"
        >
          Sign in
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12 pb-20 grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3">
          <p className="text-sm font-medium text-[#8A5A12] mb-4">For Bangladeshi university students</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-5xl leading-[1.1] font-bold mb-6">
            Find internships that fit your timetable, not just your resume.
          </h1>
          <p className="text-[#4B5049] text-lg leading-relaxed mb-8 max-w-md">
            CampusCareer BD matches your skills, class schedule and location against real
            student-friendly openings — so you stop scrolling through Facebook groups.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => onEnter("student")}
              className="px-5 py-3 rounded-md bg-[#12352A] text-[#FAF7F0] font-medium hover:bg-[#0E2A21] transition-colors flex items-center gap-2"
            >
              I'm a student <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEnter("employer")}
              className="px-5 py-3 rounded-md border border-[#12352A]/25 font-medium hover:bg-[#12352A]/5 transition-colors"
            >
              I'm hiring
            </button>
          </div>
        </div>

        <div className="md:col-span-2 border border-[#12352A]/15 rounded-lg p-6 bg-white/50">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8A5A12] mb-4">Live match example</p>
          <div className="space-y-3">
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="font-semibold">Frontend Developer Intern</p>
              <p className="text-sm text-[#6B7280]">PixelForge Ltd. · Dhaka</p>
            </div>
            <MatchBadge score={92} />
            <div className="text-sm text-[#4B5049] space-y-1 pt-2 border-t border-[#12352A]/10">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3F6B4F]" /> Skills match</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3F6B4F]" /> Schedule compatible</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#3F6B4F]" /> Location match</div>
            </div>
          </div>
        </div>
      </main>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid sm:grid-cols-3 gap-8 border-t border-[#12352A]/10 pt-12">
        {[
          { icon: Search, title: "Search & filter", body: "Filter by title, location and job type to skip the noise." },
          { icon: Calendar, title: "Schedule-aware", body: "Your class hours are factored into every recommendation." },
          { icon: Bell, title: "Status updates", body: "SMS alerts the moment an employer shortlists or selects you." },
        ].map((f, i) => (
          <div key={i}>
            <f.icon className="w-5 h-5 text-[#8A5A12] mb-3" />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="font-semibold mb-1">{f.title}</p>
            <p className="text-sm text-[#6B7280] leading-relaxed">{f.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

// ---------- Shared Dashboard Shell ----------
function Sidebar({ role, active, setActive, onExit }) {
  const items = {
    student: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "jobs", label: "Find Jobs", icon: Search },
      { id: "applications", label: "My Applications", icon: FileText },
      { id: "profile", label: "Profile", icon: User },
    ],
    employer: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "postings", label: "Job Postings", icon: Briefcase },
      { id: "applicants", label: "Applicants", icon: Users },
    ],
    admin: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "users", label: "Users", icon: ShieldCheck },
      { id: "moderation", label: "Job Moderation", icon: ClipboardList },
    ],
  };
  const roleLabel = { student: "Student", employer: "Employer", admin: "Admin" };

  return (
    <aside className="w-60 shrink-0 bg-[#12352A] text-[#FAF7F0] min-h-screen flex flex-col">
      <div className="px-5 py-6 flex items-center gap-2 border-b border-white/10">
        <div className="w-7 h-7 rounded-md bg-[#E8A33D] flex items-center justify-center">
          <GraduationCap className="w-4 h-4 text-[#12352A]" />
        </div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="font-bold text-sm">CampusCareer BD</span>
      </div>
      <p className="px-5 pt-4 text-[11px] uppercase tracking-wide text-[#9FBFAE]">{roleLabel[role]} panel</p>
      <nav className="px-3 py-3 flex-1 space-y-1">
        {items[role].map((it) => (
          <button
            key={it.id}
            onClick={() => setActive(it.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              active === it.id ? "bg-[#E8A33D] text-[#12352A]" : "text-[#D9E6DE] hover:bg-white/5"
            }`}
          >
            <it.icon className="w-4 h-4" />
            {it.label}
          </button>
        ))}
      </nav>
      <button
        onClick={onExit}
        className="mx-3 mb-5 flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-[#D9E6DE] hover:bg-white/5"
      >
        <LogOut className="w-4 h-4" /> Switch role
      </button>
    </aside>
  );
}

function TopBar({ title, subtitle }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-2xl font-bold text-[#1B231F]">{title}</h1>
        {subtitle && <p className="text-sm text-[#6B7280] mt-1">{subtitle}</p>}
      </div>
      <button className="w-9 h-9 rounded-full border border-[#12352A]/15 flex items-center justify-center hover:bg-[#12352A]/5">
        <Bell className="w-4 h-4 text-[#4B5049]" />
      </button>
    </div>
  );
}

// ---------- Student Views ----------
function StudentOverview({ applications }) {
  const counts = useMemo(() => {
    const c = { Applied: 0, Shortlisted: 0, Interview: 0, Selected: 0, Rejected: 0 };
    applications.forEach((a) => { c[a.status] = (c[a.status] || 0) + 1; });
    return c;
  }, [applications]);

  return (
    <div>
      <TopBar title="Welcome back, Nabila" subtitle="Here's how your job search is going." />
      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Applications", value: applications.length, icon: FileText },
          { label: "Shortlisted", value: counts.Shortlisted, icon: Clock },
          { label: "Interviews", value: counts.Interview, icon: Calendar },
          { label: "Top match", value: "92%", icon: CheckCircle2 },
        ].map((s, i) => (
          <div key={i} className="border border-[#12352A]/10 rounded-lg p-4 bg-white">
            <s.icon className="w-4 h-4 text-[#8A5A12] mb-3" />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-[#6B7280] mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="border border-[#12352A]/10 rounded-lg bg-white p-5">
        <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="font-semibold mb-4">Recent applications</p>
        <div className="space-y-3">
          {applications.slice(0, 3).map((a) => (
            <div key={a.id} className="flex items-center justify-between py-2 border-b border-[#12352A]/5 last:border-0">
              <div>
                <p className="text-sm font-medium">{a.jobTitle}</p>
                <p className="text-xs text-[#6B7280]">{a.company}</p>
              </div>
              <StatusPill status={a.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentJobs({ jobs, onApply, applications }) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const appliedIds = new Set(applications.map((a) => a.jobTitle));

  const filtered = jobs.filter((j) =>
    j.status === "Approved" &&
    j.title.toLowerCase().includes(query.toLowerCase()) &&
    (typeFilter === "All" || j.type === typeFilter)
  );

  return (
    <div>
      <TopBar title="Find jobs" subtitle="Filtered and ranked against your skills and schedule." />
      <div className="flex gap-3 mb-6">
        <div className="flex-1 flex items-center gap-2 border border-[#12352A]/15 rounded-md px-3 py-2 bg-white">
          <Search className="w-4 h-4 text-[#6B7280]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by job title..."
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-2 border border-[#12352A]/15 rounded-md px-3 py-2 bg-white">
          <Filter className="w-4 h-4 text-[#6B7280]" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-sm outline-none bg-transparent"
          >
            <option>All</option>
            <option>Internship</option>
            <option>Part-time</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-[#6B7280] py-8 text-center border border-dashed border-[#12352A]/15 rounded-lg">
          No jobs match your search. Try a different title or clear the filter.
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.sort((a, b) => b.match - a.match).map((j) => {
            const applied = appliedIds.has(j.title);
            return (
              <div key={j.id} className="border border-[#12352A]/10 rounded-lg p-5 bg-white flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="font-semibold">{j.title}</p>
                    <MatchBadge score={j.match} />
                  </div>
                  <p className="text-sm text-[#6B7280] mb-3">{j.company}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{j.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{j.hours}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{j.type}</span>
                  </div>
                  <div className="flex gap-1.5 mt-3">
                    {j.skills.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-[#9FBFAE]/25 text-[#2C4C38]">{s}</span>
                    ))}
                  </div>
                </div>
                <button
                  disabled={applied}
                  onClick={() => onApply(j)}
                  className={`shrink-0 text-sm font-medium px-4 py-2 rounded-md transition-colors ${
                    applied
                      ? "bg-[#12352A]/5 text-[#6B7280] cursor-not-allowed"
                      : "bg-[#12352A] text-white hover:bg-[#0E2A21]"
                  }`}
                >
                  {applied ? "Applied" : "Apply"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StudentApplications({ applications }) {
  return (
    <div>
      <TopBar title="My applications" subtitle="Track where each application stands." />
      <div className="border border-[#12352A]/10 rounded-lg bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-[#6B7280] border-b border-[#12352A]/10">
              <th className="px-5 py-3 font-medium">Job</th>
              <th className="px-5 py-3 font-medium">Company</th>
              <th className="px-5 py-3 font-medium">Applied on</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr key={a.id} className="border-b border-[#12352A]/5 last:border-0">
                <td className="px-5 py-4 font-medium">{a.jobTitle}</td>
                <td className="px-5 py-4 text-[#6B7280]">{a.company}</td>
                <td className="px-5 py-4 text-[#6B7280]">{a.appliedOn}</td>
                <td className="px-5 py-4"><StatusPill status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StudentProfile() {
  const [skills, setSkills] = useState(["React", "JavaScript", "Figma"]);
  const [skillInput, setSkillInput] = useState("");

  return (
    <div>
      <TopBar title="Your profile" subtitle="Keep this updated — it drives your match scores." />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-[#12352A]/10 rounded-lg bg-white p-5 space-y-4">
          <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="font-semibold">Basic info</p>
          <div>
            <label className="text-xs text-[#6B7280]">Full name</label>
            <input defaultValue="Nabila Haque" className="w-full mt-1 border border-[#12352A]/15 rounded-md px-3 py-2 text-sm outline-none focus:border-[#12352A]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#6B7280]">University</label>
              <input defaultValue="AIUB" className="w-full mt-1 border border-[#12352A]/15 rounded-md px-3 py-2 text-sm outline-none focus:border-[#12352A]" />
            </div>
            <div>
              <label className="text-xs text-[#6B7280]">Department</label>
              <input defaultValue="CSE" className="w-full mt-1 border border-[#12352A]/15 rounded-md px-3 py-2 text-sm outline-none focus:border-[#12352A]" />
            </div>
          </div>
          <div>
            <label className="text-xs text-[#6B7280]">Preferred location</label>
            <input defaultValue="Dhaka" className="w-full mt-1 border border-[#12352A]/15 rounded-md px-3 py-2 text-sm outline-none focus:border-[#12352A]" />
          </div>
        </div>

        <div className="border border-[#12352A]/10 rounded-lg bg-white p-5 space-y-4">
          <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="font-semibold">Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-[#9FBFAE]/25 text-[#2C4C38] flex items-center gap-1.5">
                {s}
                <button onClick={() => setSkills(skills.filter((x) => x !== s))}><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add a skill..."
              className="flex-1 border border-[#12352A]/15 rounded-md px-3 py-2 text-sm outline-none focus:border-[#12352A]"
            />
            <button
              onClick={() => { if (skillInput.trim()) { setSkills([...skills, skillInput.trim()]); setSkillInput(""); } }}
              className="px-3 py-2 rounded-md bg-[#12352A] text-white text-sm"
            >Add</button>
          </div>

          <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="font-semibold pt-2">Weekly availability</p>
          <div className="grid grid-cols-3 gap-2">
            {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"].map((d) => (
              <label key={d} className="flex items-center gap-2 text-xs border border-[#12352A]/10 rounded-md px-2 py-2">
                <input type="checkbox" defaultChecked={["Sat", "Wed", "Thu"].includes(d)} className="accent-[#12352A]" />
                {d}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Employer Views ----------
function EmployerOverview({ jobs, applicants }) {
  return (
    <div>
      <TopBar title="PixelForge Ltd." subtitle="Overview of your postings and applicants." />
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Active postings", value: jobs.filter(j => j.status === "Approved").length, icon: Briefcase },
          { label: "Total applicants", value: applicants.length, icon: Users },
          { label: "Shortlisted", value: applicants.filter(a => a.status === "Shortlisted").length, icon: Clock },
        ].map((s, i) => (
          <div key={i} className="border border-[#12352A]/10 rounded-lg p-4 bg-white">
            <s.icon className="w-4 h-4 text-[#8A5A12] mb-3" />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-[#6B7280] mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmployerPostings({ jobs, onCreate }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", type: "Internship", location: "", hours: "" });

  return (
    <div>
      <TopBar title="Job postings" subtitle="Create and manage your listings." />
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-[#12352A] text-white hover:bg-[#0E2A21]"
      >
        <PlusCircle className="w-4 h-4" /> {showForm ? "Cancel" : "Post a new job"}
      </button>

      {showForm && (
        <div className="border border-[#12352A]/10 rounded-lg bg-white p-5 mb-6 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#6B7280]">Job title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full mt-1 border border-[#12352A]/15 rounded-md px-3 py-2 text-sm outline-none focus:border-[#12352A]" />
            </div>
            <div>
              <label className="text-xs text-[#6B7280]">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full mt-1 border border-[#12352A]/15 rounded-md px-3 py-2 text-sm outline-none">
                <option>Internship</option>
                <option>Part-time</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#6B7280]">Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full mt-1 border border-[#12352A]/15 rounded-md px-3 py-2 text-sm outline-none focus:border-[#12352A]" />
            </div>
            <div>
              <label className="text-xs text-[#6B7280]">Working hours</label>
              <input value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} placeholder="e.g. 20 hrs/week" className="w-full mt-1 border border-[#12352A]/15 rounded-md px-3 py-2 text-sm outline-none focus:border-[#12352A]" />
            </div>
          </div>
          <button
            onClick={() => {
              if (!form.title || !form.location) return;
              onCreate(form);
              setForm({ title: "", type: "Internship", location: "", hours: "" });
              setShowForm(false);
            }}
            className="text-sm font-medium px-4 py-2 rounded-md bg-[#E8A33D] text-[#12352A] hover:bg-[#DB9631]"
          >
            Submit for admin review
          </button>
        </div>
      )}

      <div className="space-y-3">
        {jobs.map((j) => (
          <div key={j.id} className="border border-[#12352A]/10 rounded-lg p-4 bg-white flex items-center justify-between">
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="font-semibold">{j.title}</p>
              <p className="text-xs text-[#6B7280] mt-0.5">{j.location} · {j.type}</p>
            </div>
            <StatusPill status={j.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmployerApplicants({ applicants, onUpdateStatus }) {
  const nextStatus = { Applied: "Shortlisted", Shortlisted: "Interview", Interview: "Selected" };

  return (
    <div>
      <TopBar title="Applicants" subtitle="Frontend Developer Intern — 3 applicants" />
      <div className="space-y-3">
        {applicants.map((a) => (
          <div key={a.id} className="border border-[#12352A]/10 rounded-lg p-5 bg-white flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="font-semibold">{a.name}</p>
                <MatchBadge score={a.match} />
              </div>
              <p className="text-xs text-[#6B7280] mb-2">{a.university}</p>
              <div className="flex gap-1.5">
                {a.skills.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-[#9FBFAE]/25 text-[#2C4C38]">{s}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <StatusPill status={a.status} />
              {nextStatus[a.status] && (
                <button
                  onClick={() => onUpdateStatus(a.id, nextStatus[a.status])}
                  className="text-xs font-medium px-3 py-1.5 rounded-md border border-[#12352A]/20 hover:bg-[#12352A]/5"
                >
                  Move to {nextStatus[a.status]}
                </button>
              )}
              {a.status !== "Rejected" && a.status !== "Selected" && (
                <button
                  onClick={() => onUpdateStatus(a.id, "Rejected")}
                  className="text-xs font-medium px-3 py-1.5 rounded-md text-[#C1493A] hover:bg-[#C1493A]/5"
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Admin Views ----------
function AdminOverview({ users, pendingJobs }) {
  return (
    <div>
      <TopBar title="Platform overview" subtitle="System-wide activity at a glance." />
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Total users", value: users.length, icon: Users },
          { label: "Pending job posts", value: pendingJobs.length, icon: AlertTriangle },
          { label: "Unverified employers", value: users.filter(u => u.role === "Employer" && !u.verified).length, icon: ShieldCheck },
        ].map((s, i) => (
          <div key={i} className="border border-[#12352A]/10 rounded-lg p-4 bg-white">
            <s.icon className="w-4 h-4 text-[#8A5A12] mb-3" />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-[#6B7280] mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminUsers({ users, onToggleVerify }) {
  return (
    <div>
      <TopBar title="Users" subtitle="Verify accounts and monitor activity." />
      <div className="border border-[#12352A]/10 rounded-lg bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-[#6B7280] border-b border-[#12352A]/10">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-[#12352A]/5 last:border-0">
                <td className="px-5 py-4 font-medium flex items-center gap-2">
                  {u.role === "Student" ? <GraduationCap className="w-4 h-4 text-[#6B7280]" /> : <Building2 className="w-4 h-4 text-[#6B7280]" />}
                  {u.name}
                </td>
                <td className="px-5 py-4 text-[#6B7280]">{u.role}</td>
                <td className="px-5 py-4 text-[#6B7280]">{u.email}</td>
                <td className="px-5 py-4">
                  <StatusPill status={u.verified ? "Approved" : "Pending"} />
                </td>
                <td className="px-5 py-4">
                  {!u.verified && (
                    <button onClick={() => onToggleVerify(u.id)} className="text-xs font-medium text-[#12352A] underline">
                      Verify
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminModeration({ pendingJobs, onDecide }) {
  return (
    <div>
      <TopBar title="Job post moderation" subtitle="Review new listings before they go live." />
      {pendingJobs.length === 0 ? (
        <p className="text-sm text-[#6B7280] py-8 text-center border border-dashed border-[#12352A]/15 rounded-lg">
          Nothing pending review right now.
        </p>
      ) : (
        <div className="space-y-3">
          {pendingJobs.map((j) => (
            <div key={j.id} className="border border-[#12352A]/10 rounded-lg p-5 bg-white flex items-center justify-between">
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="font-semibold">{j.title}</p>
                <p className="text-xs text-[#6B7280] mt-1">{j.company} · {j.location} · {j.type}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onDecide(j.id, "approve")} className="text-xs font-medium px-3 py-1.5 rounded-md bg-[#12352A] text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                </button>
                <button onClick={() => onDecide(j.id, "reject")} className="text-xs font-medium px-3 py-1.5 rounded-md border border-[#C1493A]/30 text-[#C1493A] flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Root App ----------
export default function App() {
  const [view, setView] = useState("landing"); // landing | student | employer | admin
  const [active, setActive] = useState("overview");
  const [jobs, setJobs] = useState(initialJobs);
  const [applications, setApplications] = useState(initialApplications);
  const [applicants, setApplicants] = useState(initialApplicants);
  const [users, setUsers] = useState(initialUsers);
  const [pendingJobs, setPendingJobs] = useState(initialPendingJobs);

  const enterRole = (role) => { setView(role); setActive("overview"); };
  const exitRole = () => { setView("landing"); };

  const handleApply = (job) => {
    setApplications([
      { id: applications.length + 1, jobTitle: job.title, company: job.company, appliedOn: "5 Sep 2026", status: "Applied" },
      ...applications,
    ]);
  };

  const handleCreateJob = (form) => {
    const newJob = { id: Date.now(), title: form.title, company: "PixelForge Ltd.", type: form.type, location: form.location, status: "Pending" };
    setJobs([...jobs, { ...newJob, hours: form.hours, skills: [] , match: 0}]);
    setPendingJobs([...pendingJobs, newJob]);
  };

  const handleUpdateApplicantStatus = (id, status) => {
    setApplicants(applicants.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const handleToggleVerify = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, verified: true } : u)));
  };

  const handleModerationDecide = (id, decision) => {
    setPendingJobs(pendingJobs.filter((j) => j.id !== id));
    setJobs(jobs.map((j) => (j.id === id ? { ...j, status: decision === "approve" ? "Approved" : "Rejected" } : j)));
  };

  if (view === "landing") return <Landing onEnter={enterRole} />;

  const content = () => {
    if (view === "student") {
      if (active === "overview") return <StudentOverview applications={applications} />;
      if (active === "jobs") return <StudentJobs jobs={jobs} applications={applications} onApply={handleApply} />;
      if (active === "applications") return <StudentApplications applications={applications} />;
      if (active === "profile") return <StudentProfile />;
    }
    if (view === "employer") {
      if (active === "overview") return <EmployerOverview jobs={jobs} applicants={applicants} />;
      if (active === "postings") return <EmployerPostings jobs={jobs} onCreate={handleCreateJob} />;
      if (active === "applicants") return <EmployerApplicants applicants={applicants} onUpdateStatus={handleUpdateApplicantStatus} />;
    }
    if (view === "admin") {
      if (active === "overview") return <AdminOverview users={users} pendingJobs={pendingJobs} />;
      if (active === "users") return <AdminUsers users={users} onToggleVerify={handleToggleVerify} />;
      if (active === "moderation") return <AdminModeration pendingJobs={pendingJobs} onDecide={handleModerationDecide} />;
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-[#FAF7F0]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Sidebar role={view} active={active} setActive={setActive} onExit={exitRole} />
      <main className="flex-1 px-8 py-8 max-w-5xl">{content()}</main>
    </div>
  );
}
