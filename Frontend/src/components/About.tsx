import { User } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const About = () => {
  const [ref, isInView] = useInView();

  const founder = {
    name: 'Mustafa',
    role: 'Founder & Co-Founder',
    description: 'Over 23+ years of experience in Civil Engineering across the Arab region. Expert in curriculum design that bridges academia with real-world industry requirements.',
    image: '/photos/Founder.jpeg',
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16">
          Meet Our Founder
        </h2>

        <div className="flex justify-center">
          <div
            className={`group text-center ${
              isInView ? 'animate-slideUp' : 'opacity-0'
            }`}
            style={{ animationDelay: '0ms' }}
          >
            <div className="relative mb-6 inline-block">
              <div className="w-48 h-48 mx-auto overflow-hidden rounded-full border-4 border-black/20 group-hover:border-black transition-all duration-500">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-2">{founder.name}</h3>
            <p className="text-black/60 font-medium mb-4">{founder.role}</p>
            <p className="text-black/70 leading-relaxed max-w-sm mx-auto">
              {founder.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;