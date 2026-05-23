import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

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
    title: "Welcome To Buniyaad",
    text: "Empowering Future Engineers with Knowledge, Innovation & Purpose.",
    button: "Explore Buniyaad",
    img: "/photos/Main.jpg",
  },
  {
    id: 2,
    title: "Construpedia",
    text: "Your Ultimate Civil Engineering Hub for Concepts, Designs & Practical Learning.",
    button: "Explore Construpedia",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    title: "About Us",
    text: "Meet the minds behind Buniyaad—building a strong foundation for future innovators.",
    button: "Know More",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 4,
    title: "Join Our Journey",
    text: "Stay connected with our mission to uplift and inspire young engineers.",
    button: "Contact Us",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

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

    container.addEventListener("scroll", handleScroll);
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
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, scrollToSection]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        scrollToSection((currentIndex - 1 + sections.length) % sections.length);
      if (e.key === "ArrowRight" || e.key === " ")
        scrollToSection((currentIndex + 1) % sections.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, scrollToSection]);

  // Swipe Handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;

    const start = (e: TouchEvent) => (startX = e.touches[0].clientX);
    const end = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0)
          scrollToSection((currentIndex + 1) % sections.length);
        else
          scrollToSection((currentIndex - 1 + sections.length) % sections.length);
      }
    };

    container.addEventListener("touchstart", start);
    container.addEventListener("touchend", end);

    return () => {
      container.removeEventListener("touchstart", start);
      container.removeEventListener("touchend", end);
    };
  }, [currentIndex, scrollToSection]);

  // Navigation Logic
  const handleNavigation = (id: number) => {
  const routes: Record<number, {type: 'route' | 'anchor', target: string}> = {
    1: { type: 'route', target: '/explore' },
    2: { type: 'route', target: '/construpedia' },
    3: { type: 'route', target: '/aboutus' },
    4: { type: 'anchor', target: 'contact' }, // This is an anchor, not a route
  };

  const route = routes[id] || { type: 'route', target: '/' };

  if (route.type === 'anchor') {
    // Handle anchor/scrolling navigation
    if (location.pathname !== '/') {
      // Navigate to home page first
      navigate('/');
      // Wait for page to load, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(route.target);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(route.target);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  } else {
    // Handle regular route navigation
    navigate(route.target);
  }
};

  return (
    <div className="relative w-full h-screen">

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

      {/* DOTS */}
      {isHeroVisible && (
        <div className="fixed bottom-6 w-full flex justify-center gap-3 z-50">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === i ? "bg-white scale-125" : "bg-white/40"
              }`}
            ></button>
          ))}
        </div>
      )}

      {/* ARROWS (Desktop Only) */}
      {!isMobile && isHeroVisible && (
        <>
          <button
            onClick={() =>
              scrollToSection((currentIndex - 1 + sections.length) % sections.length)
            }
            className="fixed left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
                       bg-white/20 hover:bg-white/40 flex items-center justify-center
                       backdrop-blur-sm z-50 transition"
          >
            ❮
          </button>

          <button
            onClick={() =>
              scrollToSection((currentIndex + 1) % sections.length)
            }
            className="fixed right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
                       bg-white/20 hover:bg-white/40 flex items-center justify-center
                       backdrop-blur-sm z-50 transition"
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

      {/* Hide Scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
