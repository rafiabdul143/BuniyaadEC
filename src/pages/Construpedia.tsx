// Construpedia.tsx
import React, { useRef, useState, useMemo } from "react";
import { Search } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import Navbar from "../components/Navbar";
import FilterDropdown, { FilterState } from "../components/FilterDropDown";

/**
 * Construpedia page
 * - Hero: compact, blueprint-style background
 * - Section below: search bar + results (search shows results immediately below)
 * - CTA scrolls from hero to search area
 */

const courses = [
  {
    title: "Civil Engineering Fundamentals",
    description: "Master the core principles of structural analysis, materials, and design basics.",
    hashtags: ["#CivilBasics", "#Structures", "#Foundation"],
    repo: "civil-engineering-fundamentals",
    category: "civil engineering",
    viewRepoUrl: "https://github.com/civil-university/civil-engineering-fundamentals",
    downloadUrl: "/courses/c.pdf",
  },
  {
    title: "AutoCAD for Civil Engineers",
    description: "Complete AutoCAD training from 2D drafting to 3D modeling for construction projects.",
    hashtags: ["#AutoCAD", "#Drafting", "#BIM"],
    repo: "autocad-civil-engineering",
    category: "autocad drafting",
    viewRepoUrl: "https://github.com/civil-university/autocad-civil-engineering",
    downloadUrl: "/courses/autocad-civil-engineering.pdf",
  },
  {
    title: "Advanced Revit & BIM",
    description: "Building Information Modeling with Revit for modern construction workflows.",
    hashtags: ["#Revit", "#BIM", "#3DModeling"],
    repo: "revit-bim-advanced",
    category: "architecture bim",
    viewRepoUrl: "https://github.com/civil-university/revit-bim-advanced",
    downloadUrl: "/courses/revit-bim-advanced.pdf",
  },
  {
    title: "STAAD Pro Structural Analysis",
    description: "Comprehensive structural analysis and design using industry-standard software.",
    hashtags: ["#STAADPro", "#StructuralDesign", "#Analysis"],
    repo: "staad-pro-structural",
    category: "structural engineering",
    viewRepoUrl: "https://github.com/civil-university/staad-pro-structural",
    downloadUrl: "/courses/staad-pro-structural.pdf",
  },
  {
    title: "Site Engineering & Management",
    description: "Complete guide to site engineering, project management, and construction supervision.",
    hashtags: ["#SiteEngineering", "#Construction", "#ProjectManagement"],
    repo: "site-engineering-management",
    category: "site engineering",
    viewRepoUrl: "https://github.com/civil-university/site-engineering-management",
    downloadUrl: "/courses/site-engineering-management.pdf",
  },
  {
    title: "AutoCAD Draftsman Professional",
    description: "Professional drafting techniques and standards for civil engineering projects.",
    hashtags: ["#AutoCAD", "#Draftsman", "#TechnicalDrawing"],
    repo: "autocad-draftsman-pro",
    category: "autocad drafting",
    viewRepoUrl: "https://github.com/civil-university/autocad-draftsman-pro",
    downloadUrl: "/courses/autocad-draftsman-pro.pdf",
  },
  {
    title: "Architecture Design Principles",
    description: "Fundamental architecture design principles and building planning techniques.",
    hashtags: ["#Architecture", "#Design", "#BuildingPlanning"],
    repo: "architecture-design-principles",
    category: "architecture",
    viewRepoUrl: "https://github.com/civil-university/architecture-design-principles",
    downloadUrl: "/courses/architecture-design-principles.pdf",
  },
  {
    title: "Construction Safety Officer",
    description: "Complete safety protocols, regulations, and site safety management for construction.",
    hashtags: ["#SafetyOfficer", "#ConstructionSafety", "#OSHA"],
    repo: "construction-safety-officer",
    category: "safety officer",
    viewRepoUrl: "https://github.com/civil-university/construction-safety-officer",
    downloadUrl: "/courses/construction-safety-officer.pdf",
  },
  {
    title: "Job-Ready Professional Program",
    description: "Complete package with technical skills, soft skills, and placement preparation.",
    hashtags: ["#JobReady", "#CareerGrowth", "#PlacementPrep"],
    repo: "job-ready-program",
    category: "professional development",
    viewRepoUrl: "https://github.com/civil-university/job-ready-program",
    downloadUrl: "/courses/job-ready-program.pdf",
  },
];

const Construpedia: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    technologies: [],
    domains: [],
  });

  // ref for scrolling from hero CTA to search area
  const searchRef = useRef<HTMLDivElement | null>(null);

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    const s = searchQuery.toLowerCase();
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(s) ||
        c.description.toLowerCase().includes(s) ||
        c.category.toLowerCase().includes(s) ||
        c.hashtags.some((h) => h.toLowerCase().includes(s.replace("#", "")))
    );
  }, [searchQuery]);

  const scrollToSearch = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      // focus input after scroll (slight delay)
      const input = searchRef.current.querySelector("input");
      if (input) (input as HTMLInputElement).focus();
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar activeSection="construpedia" />

      {/* HERO - compact, blueprint style */}
     <header
  className="relative bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920')", // skyscraper background
  }}
>
  {/* Dark Overlay for Readability */}
  <div className="absolute inset-0 bg-black/50" />

  <div className="relative z-10 container mx-auto px-6 mt-10 py-16 md:py-20 text-center text-white">
    <h1 className="text-4xl md:text-5xl font-bold">Construpedia</h1>
    <p className="mt-4 text-lg max-w-3xl mx-auto">
      Your construction knowledge hub Learn Civil Engineering, AutoCAD, Revit, and more.
    </p>

    <button
      onClick={scrollToSearch}
      className="mt-8 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition"
    >
      Explore Courses
    </button>
  </div>
</header>


      {/* SEARCH + COURSES - in a single section (search at top, results below) */}
     {/* SEARCH + COURSES - in a single section (search at top, results below) */}
<main ref={searchRef} className="container mx-auto px-4 sm:px-6 py-10">
  <div className="max-w-4xl mx-auto">

    {/* Search + Filters Section */}
    <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6">

      {/* ✅ Search Input */}
      <div className="relative w-full">
        <input
          aria-label="Search courses"
          type="text"
          placeholder="Search courses, e.g. 'AutoCAD', 'BIM', 'Site Engineering'..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 sm:h-14 rounded-lg border border-gray-300 px-4 pr-12 text-sm sm:text-base
                     placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 
                     focus:border-transparent transition"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
      </div>

      {/* ✅ Filter Dropdown - full width on mobile, fixed on desktop */}
    
    </div>

    {/* ✅ Results Meta Information */}
    <div className="mt-3 text-sm text-gray-600 text-center md:text-left">
      {searchQuery ? (
        <span>
          Showing <strong>{filteredCourses.length}</strong> result
          {filteredCourses.length !== 1 ? "s" : ""} for "<span className="font-medium">{searchQuery}</span>"
        </span>
      ) : (
        <span>
          Showing <strong>{courses.length}</strong> courses — search or filter to refine.
        </span>
      )}
    </div>
  </div>



        {/* courses grid */}
        <section className="mt-6">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, idx) => (
                <div
                  key={course.repo}
                  className="bg-white border rounded-lg p-5 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition"
                  style={{ animation: `fadeInUp 300ms ease ${idx * 50}ms both` }}
                >
                  <ProjectCard project={course} layout="horizontal" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 max-w-xl mx-auto text-center">
              <p className="text-gray-700 text-lg font-medium">No courses found</p>
              <p className="text-gray-500 mt-2">Try a different keyword or clear the search.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition"
              >
                Clear search
              </button>
            </div>
          )}
        </section>
      </main>

      {/* small footer CTA or link to full Construpedia listing */}
      <div className="container mx-auto px-6 py-8 text-center">
        <a
          href="/construpedia"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          View full Construpedia catalog
        </a>
      </div>

      {/* animations keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Construpedia;
