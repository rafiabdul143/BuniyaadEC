// Explore.tsx component
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Wrench, Users, Briefcase, FileText, HardHat, Calculator, Newspaper, Library, FolderOpen } from 'lucide-react';
import { useInView } from '../hooks/useInView';


const Explore = () => {
  const [ref, isInView] = useInView();

  const features = [
    { 
      title: 'Construpedia', 
      desc: 'Civil Engineering digital library – Courses, PDFs, drawings, codes', 
      path: '/construpedia',
      icon: Library,
      color: 'from-blue-500 to-blue-700'
    },
    { 
      title: 'Projects Hub', 
      desc: 'Real-time civil engineering projects, case studies, student projects', 
      path: '/projects',
      icon: FolderOpen,
      color: 'from-green-500 to-green-700'
    },
    { 
      title: 'Courses & Certifications', 
      desc: 'Top civil engineering courses and training', 
      path: '/construpedia#courses',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-700'
    },
    { 
      title: 'Tools & Software', 
      desc: 'AutoCAD, Revit, STAAD Pro, Primavera, Excel sheets', 
      path: '/tools',
      icon: Wrench,
      color: 'from-orange-500 to-orange-700'
    },
    { 
      title: 'Civil Calculators', 
      desc: 'Concrete quantity, bar bending schedule, cost estimators', 
      path: '/calculators',
      icon: Calculator,
      color: 'from-red-500 to-red-700'
    },
    { 
      title: 'Industry Updates', 
      desc: 'Latest news, construction technology & policies', 
      path: '/news',
      icon: Newspaper,
      color: 'from-indigo-500 to-indigo-700'
    },
    { 
      title: 'Community & Forums', 
      desc: 'Ask questions and discuss with engineers & students', 
      path: '/community',
      icon: Users,
      color: 'from-teal-500 to-teal-700'
    },
    { 
      title: 'Internships & Jobs', 
      desc: 'Jobs, internships & resume tips for civil students', 
      path: '/careers',
      icon: Briefcase,
      color: 'from-amber-500 to-amber-700'
    }
  ];

  const benefits = [
    'Free resource library for civil engineering students',
    'Industry-standard PDF notes, drawings, and design sheets',
    'Practical & Real project-based learning',
    'Built by civil engineers, for civil engineers',
    'Regularly updated content and resources',
    'Expert-curated learning paths'
  ];

  const services = [
    {
      icon: BookOpen,
      title: 'Industry-Oriented Courses',
      description: 'Comprehensive courses designed to meet current industry standards and requirements.',
    },
    {
      icon: Wrench,
      title: 'Software Workshops',
      description: 'Hands-on training in AutoCAD, Revit, STAAD Pro, and other essential civil engineering tools.',
    },
    {
      icon: Users,
      title: 'Project Mentorship',
      description: 'One-on-one guidance from experienced professionals on real-world projects.',
    },
    {
      icon: Briefcase,
      title: 'Internship & Job Assistance',
      description: 'Direct connections to top companies and personalized job placement support.',
    },
    {
      icon: FileText,
      title: 'Resume & Interview Guidance',
      description: 'Professional resume building and mock interview sessions to boost your confidence.',
    },
    {
      icon: HardHat,
      title: 'On-site Training Programs',
      description: 'Practical experience at construction sites with industry veterans.',
    },
  ];

  return (
    <section className="bg-white text-black min-h-screen pt-24" ref={ref}>
      {/* Introduction Section with Civil Engineering Background */}
      <div className="relative py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')` }}>
        <div className="absolute inset-0 bg-black opacity-10 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Explore <span className="text-blue-400">Buniyaadec</span>
          </h1>
          <p className="mt-6 text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            A comprehensive platform for Civil Engineering Education, Innovation, and Professional Growth.
          </p>
          <p className="mt-4 text-gray-300 italic font-medium text-lg">Learn • Build • Innovate • Excel</p>
          
          {/* Stats bar for credibility */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold">5000+</div>
              <div className="text-sm text-gray-300">Resources</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm text-gray-300">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-gray-300">Tools</div>
            </div>
             {/*<div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-gray-300">Users</div>
            </div>*/}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

     

      {/* Professional Services Section */}
      <div className="max-w-7xl mx-auto mt-20 px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6">
            Our Professional Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive support for your civil engineering career journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group border border-black/20 p-8 rounded-xl hover:bg-black hover:text-white transition-all duration-500 transform hover:scale-105 ${
                isInView ? 'animate-slideUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <service.icon
                size={48}
                className="mb-6 group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-black/70 group-hover:text-white/70 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto px-6 mt-20">
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Buniyaad?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're committed to building the most comprehensive civil engineering learning platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`flex items-start space-x-3 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 ${
                  isInView ? 'animate-slideUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-6xl mx-auto px-6 mt-20 text-center pb-20">
        <div className="bg-black rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Future?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of civil engineering students and professionals who are already advancing their careers with Buniyaad.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/construpedia" 
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Construpedia →
            </Link>
            <Link 
              to="/community" 
              className="px-8 py-4 border border-white text-white rounded-xl font-semibold hover:bg-white hover:text-gray-900 hover:scale-105 transform transition-all duration-300"
            >
              Join the Community
            </Link>
          </div>
          <p className="mt-6 text-gray-400 text-sm">
            Free forever for students • Premium features for professionals
          </p>
        </div>
      </div>
  
    </section>
  );
};

export default Explore;
