import { BookOpen, Wrench, Users, Briefcase, FileText, HardHat } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Explore = () => {
  const [ref, isInView] = useInView();

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
    <section id="explore" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16">
          Explore Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group border border-black/20 p-8 hover:bg-black hover:text-white transition-all duration-500 transform hover:scale-105 ${
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
    </section>
  );
};

export default Explore;
