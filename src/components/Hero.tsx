import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Section {
  id: number;
  title: string;
  text: string;
  button: string;
  img: string;
}

interface TypedTextState {
  text: string;
  isTyping: boolean;
}

const sections: Section[] = [
  {
    id: 1,
    title: "Welcome To BuniyaadEC",
    text: "Empowering Future Engineers with Knowledge, Innovation & Purpose.",
    button: "Explore Buniyaad",
    img: "/photos/Main.jpg",
  },
  {
    id: 2,
    title: "Construpedia",
    text: "Your Ultimate Civil Engineering Hub for Concepts, Designs & Practical Learning.",
    button: "Explore Construpedia",
    img: "/photos/homepagepic2.jpg",
  },
  {
    id: 3,
    title: "About Us",
    text: "Meet the minds behind BuniyaadEC building a strong foundation for future innovators.",
    button: "Know More",
    img: "/photos/homepagepic3.png",
  },
  {
    id: 4,
    title: "Join Our Journey",
    text: "Stay connected with our mission to uplift and inspire young engineers.",
    button: "Contact Us",
    img: "/photos/homepagepic5.jpg",
  },
];

const AUTO_SCROLL_INTERVAL = 8000;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [typedTexts, setTypedTexts] = useState<TypedTextState[]>(
    sections.map(() => ({ text: "", isTyping: false }))
  );

  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Detect Mobile
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Show/hide hero for scroll
  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      setIsHeroVisible(window.scrollY < heroHeight - 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const updateTypedText = (index: number) => {
      const section = sections[index];
      if (typedTexts[index].text === section.text || typedTexts[index].isTyping)
        return;

      setTypedTexts((prev) => {
        const c = [...prev];
        c[index] = { text: "", isTyping: true };
        return c;
      });

      let charIndex = 0;
      const interval = setInterval(() => {
        if (charIndex < section.text.length) {
          setTypedTexts((prev) => {
            const c = [...prev];
            c[index] = {
              ...c[index],
              text: section.text.substring(0, charIndex + 1),
            };
            return c;
          });
          charIndex++;
        } else {
          clearInterval(interval);
          setTypedTexts((prev) => {
            const c = [...prev];
            c[index] = { text: section.text, isTyping: false };
            return c;
          });
        }
      }, 40);
    };

    updateTypedText(currentIndex);
  }, [currentIndex]);

  // Scroll Listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      if (index !== currentIndex) setCurrentIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentIndex]);

  // Scroll to section
  const scrollToSection = useCallback((index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: index * containerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, []);

  // Auto scroll
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % sections.length;
      scrollToSection(nextIndex);
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(timer);
  }, [currentIndex, scrollToSection]);

  // Navigation Logic
  const handleNavigation = (id: number) => {
    const routes: Record<number, { type: 'route' | 'anchor', target: string }> = {
      1: { type: 'route', target: '/explore' },
      2: { type: 'route', target: '/construpedia' },
      3: { type: 'route', target: '/aboutus' },
      4: { type: 'anchor', target: 'contact' },
    };

    const route = routes[id] || { type: 'route', target: '/' };

    if (route.type === 'anchor') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(route.target);
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      } else {
        const element = document.getElementById(route.target);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(route.target);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* GRADIENT TIMER BAR */}
      <div className="absolute top-0 left-0 w-full h-1.5 z-[60] bg-white/10">
        <div 
          key={currentIndex} 
          className="h-full tracking-tight bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
          style={{ 
            animation: `timerProgress ${AUTO_SCROLL_INTERVAL}ms linear forwards` 
          }}
        />
      </div>

      {/* SLIDER */}
      <div
        ref={containerRef}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
      >
        {sections.map((sec, i) => (
          <section
            key={sec.id}
            className="w-full h-full flex-shrink-0 snap-center relative"
            style={{
              backgroundImage: `url(${sec.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 h-full flex flex-col justify-center px-10 lg:px-24 max-w-2xl text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                {sec.title}
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl mb-6">
                {typedTexts[i].text}
              </p>

              <button
                onClick={() => handleNavigation(sec.id)}
                className="px-6 py-3 bg-white text-black text-lg rounded-full shadow-md hover:bg-gray-200 transition"
              >
                {sec.button}
              </button>
            </div>
          </section>
        ))}
      </div>

      {/* DOTS NAVIGATION */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`transition-all duration-300 rounded-full h-2 ${
              currentIndex === index 
                ? "w-8 bg-teal-400" 
                : "w-2 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* ARROWS (Desktop Only) */}
      {!isMobile && isHeroVisible && (
        <>
          <button
            onClick={() => scrollToSection((currentIndex - 1 + sections.length) % sections.length)}
            className="fixed left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center backdrop-blur-sm z-50 transition"
          >
            ❮
          </button>

          <button
            onClick={() => scrollToSection((currentIndex + 1) % sections.length)}
            className="fixed right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center backdrop-blur-sm z-50 transition"
          >
            ❯
          </button>
        </>
      )}

      {/* MOBILE SWIPE HINT */}
      {isMobile && isHeroVisible && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 text-white/70 text-xs flex gap-2 animate-pulse z-50">
          ← Swipe →
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes timerProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}