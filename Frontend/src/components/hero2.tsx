import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import{explor}from '../pages/Explore';

const Hero = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);

  const fullTitle = "Welcome to Buniyaad.com";

  // Show title after 8 sec
  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect
  useEffect(() => {
    if (showTitle && typedText.length < fullTitle.length) {
      const timer = setInterval(() => {
        setTypedText((prev) => fullTitle.slice(0, prev.length + 1));
      }, 100);
      return () => clearInterval(timer);
    } else if (typedText.length === fullTitle.length) {
      setTimeout(() => setShowSubtitle(true), 1000);
    }
  }, [showTitle, typedText]);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-black">
     {/* Background Video */}
     {/*<video
        src="/clips/test.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover brightness-95"
      />*/}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        {showTitle && (
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide drop-shadow-lg">
            {typedText}
            <span className="border-r-2 border-yellow-400 animate-pulse ml-1"></span>
          </h1>
        )}

        {showSubtitle && (
          <>
            <p className="mt-6 text-lg md:text-2xl text-gray-200 opacity-90 animate-fade-in">
              Building the Future of Civil Engineering — One Block at a Time
            </p>

            {/* ✅ Button is here - visible and below the text */}
            <Link
              to="/explor"
              className="inline-block mt-8 px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-all shadow-lg"
            >
              Explore →
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;


     {/* Features Grid with Enhanced Animations */}
      {/*<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16 px-6">
        {features.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link 
              to={item.path} 
              key={index}
              className={`group relative bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isInView ? 'animate-slideUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
              
              {/* Content Container */}
              <div className="relative z-10">
                {/* Icon with Enhanced Hover Effects */}
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <IconComponent 
                    size={48} 
                    className="text-gray-700 group-hover:text-white transition-colors duration-300"
                  />
                </div>
                
                {/* Content */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {item.desc}
                </p>
                
                {/* Arrow Indicator */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <span className="text-gray-400 group-hover:text-white">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>