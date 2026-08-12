import React from "react";
import buniyaadlogo from "../../assets/buniyaadlogo2.png";
import {
  GraduationCap,
  FolderKanban,
  Users,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

interface FeaturePoint {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: FeaturePoint[] = [
  {
    title: "Structured Learning Paths",
    description: "Industry-focused roadmaps designed to help learners master in-demand skills.",
    icon: GraduationCap,
  },
  {
    title: "Practical Projects",
    description: "Build real-world projects to strengthen your portfolio and practical experience.",
    icon: FolderKanban,
  },
  {
    title: "Community & Mentorship",
    description: "Collaborate with peers, educators, and mentors throughout your learning journey.",
    icon: Users,
  },
];

export const AuthHero: React.FC = () => {
  return (
    <div className="relative hidden h-full w-full flex-col justify-between overflow-hidden bg-slate-200 px-10 py-10 text-slate-900 border-r border-slate-200/80 lg:flex">
  
  {/* ================= Top Subtle Dark Gradient for Logo Contrast ================= */}
  <div className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-900/15 via-slate-900/5 to-transparent z-0" />

  {/* ================= Minimal Blueprint CAD Grid Pattern ================= */}
  <div 
    className="pointer-events-none absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)`,
      backgroundSize: "28px 28px",
    }}
  />

  {/* Subtle Brand Ambient Lighting */}
  <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl opacity-60" />
  <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl opacity-50" />

  {/* ================= Brand Header ================= */}
  <div className="relative z-10 flex items-center gap-3.5">
    <img
      src={buniyaadlogo}
      alt="BuniyaadEC Logo"
      className="h-12 w-auto object-contain drop-shadow-sm"
    />

    <div>
      <h1 className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-xl font-bold tracking-tight text-transparent">
        BuniyaadEC
      </h1>

      <p className="text-xs font-medium tracking-wide text-slate-600">
        We Make Strong Foundations...
      </p>
    </div>
  </div>

  {/* ================= Hero Content ================= */}
  <div className="relative z-10 mt-10 mb-auto">
    <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 xl:text-4xl">
      Learn. Build.{" "}
      <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
        Grow.
      </span>
    </h2>

    <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 xl:text-base">
      A structured learning platform built for students, educators, and
      professionals to develop practical engineering skills and advance
      their careers.
    </p>

    {/* ================= Simple Feature Rows ================= */}
    <div className="mt-8 space-y-5 border-t border-slate-300/80 pt-6">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div key={feature.title} className="flex items-start gap-3.5">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100/80 text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-0.5 text-xs leading-5 text-slate-600">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>

  {/* ================= Trust Statement Footer ================= */}
  <div className="relative z-10 border-t border-slate-300/80 pt-5">
    <p className="text-xs font-medium leading-5 text-slate-600">
      Built for Students &bull; Educators &bull; Professionals
    </p>
  </div>
</div>
  );
};

export default AuthHero;