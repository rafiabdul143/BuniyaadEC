import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Users, 
  GraduationCap, 
  Building2, 
  ArrowRight,
  Award,
  HeartHandshake,
  TrendingUp,
  Globe,
  Lightbulb,
  Shield,
  Clock,
  Briefcase,
  Rocket
} from 'lucide-react';
import { useInView } from '../hooks/useInView';

const AboutUs = () => {
  const [ref, isInView] = useInView();

  const stats = [
    { param: 'Connect'},
    { param: 'Educate' },
    { param: 'Empower' },
    { param: 'Transform' }
  ];

  const milestones = [
    { year: '2020', event: 'Buniyaad Founded', description: 'Started with a vision to transform civil engineering education' },
    { year: '2024', event: 'Global Expansion', description: 'Expanding to serve international students and companies' }
  ];

  const team = [
    { name: 'Alex Thompson', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
    { name: 'Sarah Chen', role: 'Head of Education', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
    { name: 'Michael Rodriguez', role: 'Industry Liaison', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <div className="min-h-screen bg-white pt-24" ref={ref}>
      
      {/* 1. REDESIGNED HERO SECTION */}
{/* REDUCED HEIGHT HERO SECTION */}
<section 
  className="relative py-16 bg-cover bg-center bg-no-repeat" 
  style={{ 
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80')` 
  }}
>
  {/* Texture Overlay */}
  <div className="absolute inset-0 bg-black opacity-10 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>

  <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
    {/* Heading: text-5xl mobile, text-6xl desktop */}
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
      We Build the <span className="text-blue-400">Engineers</span> <br className="hidden md:block"/>
      Who Build the <span className="text-green-400">World</span>
    </h1>

    {/* Description: text-lg (reduced from xl to save space) */}
    <p className="mt-4 text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
      Buniyaadec is more than a platform; it's a movement to redefine the DNA of civil engineering education through real-world mastery.
    </p>

 
    {/* Stats bar: Tightened margins (mt-8 instead of mt-12) */}
    <div className="mt-8 flex flex-wrap justify-center gap-8 text-white border-t border-white/10 pt-6">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-xl font-bold">{stat.param}</div>

        </div>
      ))}
    </div>
  </div>
</section>

      {/* 2. THE PROBLEM STATEMENT */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`${isInView ? 'animate-slideUp' : 'opacity-0'}`}>
              <span className="text-red-500 font-bold tracking-wider uppercase text-sm">The Reality Check</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6 leading-tight">The massive gap between <br/>Degree and Delivery.</h2>
              <div className="space-y-6 text-gray-600 text-lg">
                <p>Every year, thousands of civil engineers graduate with high honors but struggle on a real construction site. Why?</p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="bg-red-100 p-1 rounded-full h-fit"><ArrowRight className="text-red-600" size={16}/></div>
                    <span>Traditional curriculums are often a decade behind modern industry tech.</span>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-red-100 p-1 rounded-full h-fit"><ArrowRight className="text-red-600" size={16}/></div>
                    <span>Freshers lack the "Site-Sense" that only comes from practical execution.</span>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-red-100 p-1 rounded-full h-fit"><ArrowRight className="text-red-600" size={16}/></div>
                    <span>Companies waste 6-12 months "re-training" new hires from scratch.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-4 rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1503387762-592df58ef4e0?auto=format&fit=crop&w=800&q=80" alt="Problem" className="rounded-xl" />
                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl max-w-xs">
                  <p className="font-bold text-2xl italic">"Theory isn't enough when lives are at stake."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW BUNIYAAD SOLVES THIS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Buniyaad Solution</h2>
            <p className="text-xl text-gray-600">We don't just teach; we integrate students into the industry ecosystem.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Briefcase, 
                title: 'Project-Based Learning', 
                desc: 'Replace textbooks with blueprints. Students work on actual industry site data and scenarios.',
                color: 'bg-blue-50 text-blue-600' 
              },
              { 
                icon: Users, 
                title: 'Expert Mentorship', 
                desc: 'Learn directly from Senior Project Managers and Structural Consultants with 15+ years experience.',
                color: 'bg-green-50 text-green-600' 
              },
              { 
                icon: Rocket, 
                title: 'Direct Integration', 
                desc: 'Our partners hire directly from our pool of pre-trained, job-ready engineering talent.',
                color: 'bg-purple-50 text-purple-600' 
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all group">
                <div className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* 5. MILESTONES (TIMELINE) */}
      {/* Redesigned Our Journey Section */}
<section className="py-24 bg-white overflow-hidden">
  <div className="max-w-6xl mx-auto px-6">
    <div className="text-center mb-20">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Evolution</h2>
      <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-green-500 mx-auto rounded-full"></div>
      <p className="text-gray-600 mt-6 text-lg">From a bold idea to a global engineering community.</p>
    </div>

    <div className="relative">
      {/* Background Connecting Path (Desktop Only) */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

      <div className="grid md:grid-cols-2 gap-12 relative z-10">
        {milestones.map((milestone, index) => (
          <div 
            key={index} 
            className={`group relative ${isInView ? 'animate-slideUp' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Year Badge */}
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-xl shadow-lg shadow-blue-200">
                {milestone.year}
              </div>
              <div className="h-px flex-grow bg-gray-200 group-hover:bg-blue-400 transition-colors"></div>
            </div>

            {/* Content Card */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {index === 0 ? <Lightbulb size={24} /> : <Globe size={24} />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.event}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Dot for the center line */}
            <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 bg-white border-4 border-blue-600 rounded-full z-20 translate-y-[-50%] translate-x-[50%] group-last:hidden"></div>
          </div>
        ))}
      </div>

      {/* Current Status Indicator */}
      <div className="mt-20 flex flex-col items-center">
        <div className="flex items-center gap-3 px-6 py-3 bg-green-50 border border-green-100 rounded-full animate-pulse">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          <span className="text-green-700 font-bold uppercase tracking-widest text-sm">Right Now</span>
        </div>
        <h3 className="mt-4 text-2xl font-bold text-gray-900">Scaling the Future</h3>
        <p className="text-gray-500 mt-2">Integrating AI-driven site monitoring into our curriculum.</p>
      </div>
    </div>
  </div>
</section>

     {/* 6. REDESIGNED CALL TO ACTION */}
<section className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <div className="bg-black rounded-2xl p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
      {/* Optional Texture Overlay to maintain the engineering feel */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          Ready to Build Your Future?
        </h2>
        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto font-light">
          Join thousands of civil engineering students and professionals who are already advancing their careers with Buniyaad.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/#contact" 
            className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
          >
            Get In Touch <ArrowRight size={20} />
          </Link>
          
               <a
  href="https://chat.whatsapp.com/JCjPcwWbkRy78H4YBWHxHc"
  target="_blank"
  rel="noopener noreferrer"
  className="px-8 py-4 border border-white/30 text-white rounded-xl font-bold hover:bg-white hover:text-gray-900 hover:scale-105 transform transition-all duration-300 flex items-center justify-center"
>
  Join the Community
</a>
        </div>

        <p className="mt-8 text-gray-500 text-sm tracking-wide">
          Free forever for students • Premium features for professionals
        </p>
      </div>
    </div>
  </div>
</section>
      
    </div>
  );
};

export default AboutUs;