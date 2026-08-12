import { useState, useMemo } from 'react';
import { Download, ExternalLink, Search, FileText } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import {construpedia} from '../pages/Construpedia';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [ref, isInView] = useInView();
  const [searchTerm, setSearchTerm] = useState('');

  const courses = [
    {
      title: 'Civil Engineering Fundamentals',
      description: 'Master the core principles of structural analysis, materials, and design basics.',
      hashtags: ['#CivilBasics', '#Structures', '#Foundation'],
      repo: 'civil-engineering-fundamentals',
      category: 'civil engineering',
      viewRepoUrl: 'https://github.com/civil-university/civil-engineering-fundamentals',
      downloadUrl: "/courses/c.pdf",
    },
    {
      title: 'AutoCAD for Civil Engineers',
      description: 'Complete AutoCAD training from 2D drafting to 3D modeling for construction projects.',
      hashtags: ['#AutoCAD', '#Drafting', '#BIM'],
      repo: 'autocad-civil-engineering',
      category: 'autocad drafting',
      viewRepoUrl: 'https://github.com/civil-university/autocad-civil-engineering',
      downloadUrl: '/courses/autocad-civil-engineering.pdf',
    },
    {
      title: 'Advanced Revit & BIM',
      description: 'Building Information Modeling with Revit for modern construction workflows.',
      hashtags: ['#Revit', '#BIM', '#3DModeling'],
      repo: 'revit-bim-advanced',
      category: 'architecture bim',
      viewRepoUrl: 'https://github.com/civil-university/revit-bim-advanced',
      downloadUrl: '/courses/revit-bim-advanced.pdf',
    },
    {
      title: 'STAAD Pro Structural Analysis',
      description: 'Comprehensive structural analysis and design using industry-standard software.',
      hashtags: ['#STAADPro', '#StructuralDesign', '#Analysis'],
      repo: 'staad-pro-structural',
      category: 'structural engineering',
      viewRepoUrl: 'https://github.com/civil-university/staad-pro-structural',
      downloadUrl: '/courses/staad-pro-structural.pdf',
    },
    {
      title: 'Site Engineering & Management',
      description: 'Complete guide to site engineering, project management, and construction supervision.',
      hashtags: ['#SiteEngineering', '#Construction', '#ProjectManagement'],
      repo: 'site-engineering-management',
      category: 'site engineering',
      viewRepoUrl: 'https://github.com/civil-university/site-engineering-management',
      downloadUrl: '/courses/site-engineering-management.pdf',
    },
    {
      title: 'AutoCAD Draftsman Professional',
      description: 'Professional drafting techniques and standards for civil engineering projects.',
      hashtags: ['#AutoCAD', '#Draftsman', '#TechnicalDrawing'],
      repo: 'autocad-draftsman-pro',
      category: 'autocad drafting',
      viewRepoUrl: 'https://github.com/civil-university/autocad-draftsman-pro',
      downloadUrl: '/courses/autocad-draftsman-pro.pdf',
    },
    {
      title: 'Architecture Design Principles',
      description: 'Fundamental architecture design principles and building planning techniques.',
      hashtags: ['#Architecture', '#Design', '#BuildingPlanning'],
      repo: 'architecture-design-principles',
      category: 'architecture',
      viewRepoUrl: 'https://github.com/civil-university/architecture-design-principles',
      downloadUrl: '/courses/architecture-design-principles.pdf',
    },
    {
      title: 'Construction Safety Officer',
      description: 'Complete safety protocols, regulations, and site safety management for construction.',
      hashtags: ['#SafetyOfficer', '#ConstructionSafety', '#OSHA'],
      repo: 'construction-safety-officer',
      category: 'safety officer',
      viewRepoUrl: 'https://github.com/civil-university/construction-safety-officer',
      downloadUrl: '/courses/construction-safety-officer.pdf',
    },
    {
      title: 'Job-Ready Professional Program',
      description: 'Complete package with technical skills, soft skills, and placement preparation.',
      hashtags: ['#JobReady', '#CareerGrowth', '#PlacementPrep'],
      repo: 'job-ready-program',
      category: 'professional development',
      viewRepoUrl: 'https://github.com/civil-university/job-ready-program',
      downloadUrl: '/courses/job-ready-program.pdf',
    },
  ];

  // Filter courses based on search term
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return courses;
    
    const searchLower = searchTerm.toLowerCase();
    return courses.filter(course => 
      course.title.toLowerCase().includes(searchLower) ||
      course.description.toLowerCase().includes(searchLower) ||
      course.category.toLowerCase().includes(searchLower) ||
      course.hashtags.some(tag => tag.toLowerCase().includes(searchLower.replace('#', '')))
    );
  }, [searchTerm]);

  const handleDownload = async (downloadUrl, courseTitle) => {
    try {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${courseTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`Download initiated: ${courseTitle}`);
    } catch (error) {
      console.error('Download error:', error);
      alert(`Error downloading "${courseTitle}". Please try again.`);
    }
  };

  return (
    <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 text-black" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16">
          Top Civil Engineering Courses
        </h2>

    

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <div
              key={course.repo}
              className={`group bg-white border border-black/10 text-black p-8 hover:bg-black hover:text-white hover:border-black transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                isInView ? 'animate-slideUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
              <p className="text-black/80 group-hover:text-white/80 mb-6 leading-relaxed">{course.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {course.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 border border-black/30 text-black/70 group-hover:border-white/30 group-hover:text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* File Size Info - Simplified */}
              <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-gray-300 mb-4">
                <FileText size={16} />
                <span>PDF Document</span>
              </div>

              <div className="flex gap-4">
                <a
                  href={course.viewRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                >
                  <ExternalLink size={16} />
                  <span>View Repo</span>
                </a>
                <button 
                  onClick={() => handleDownload(course.downloadUrl, course.title)}
                  className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                >
                  <Download size={16} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No courses found matching your search.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Show All Courses
            </button>
          </div>
          
        )}


<div className="flex justify-center mt-12">
  <Link
    to="/construpedia"
    className="inline-block px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
  >
    Explore All Courses →
  </Link>
</div>


      </div>
    </section>
  );
};

export default Courses;