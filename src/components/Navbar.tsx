import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import buniyaadlogo from '../assets/buniyaadlogo2.png';

interface NavbarProps {
  activeSection: string;
}

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });

      setIsMenuOpen(false);
    }
  };

  const handleNavigation = (item: any) => {
    setIsMenuOpen(false);

    const hasHash = item.path.includes('#');

    if (hasHash) {
      const [basePath, sectionId] = item.path.split('#');

      if (location.pathname !== basePath && basePath !== '') {
        navigate(basePath);

        setTimeout(() => {
          const element = document.getElementById(sectionId);

          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
            });
          }
        }, 300);
      } else {
        const element = document.getElementById(sectionId);

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
          });
        }
      }
    } else if (item.path === '/') {
      if (location.pathname !== '/') {
        navigate('/');

        setTimeout(() => scrollToSection(item.id), 300);
      } else {
        scrollToSection(item.id);
      }
    } else {
      navigate(item.path);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'explore', label: 'Explore', path: '/explore' },
    { id: 'construpedia', label: 'Construpedia', path: '/construpedia' },
    { id: 'aboutus', label: 'About Us', path: '/aboutus' },
    { id: 'contact', label: 'Contact Us', path: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-20">

          {/* Left Section */}
          <div className="flex items-center gap-4">

            {/* Brand Section */}
  <div className="flex items-center">

    {/* Logo */}
    <div className="flex items-center pr-4">
      <img
        src={buniyaadlogo}
        alt="BuniyaadEC Logo"
        className="h-14 sm:h-16 md:h-18 w-auto object-contain"
      />
    </div>

    {/* Divider + Tagline */}
   <div className="flex flex-col justify-center border-l-2 border-cyan-500 pl-4 leading-tight">

  <span
    className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
  >
    BuniyaadEC
  </span>



      <span className="text-xs sm:text-sm text-black font-medium tracking-wide">
        We Make Strong Foundations...
      </span>

    </div>

  </div>
          </div>

          {/* Right Section - Menu */}
          <div className="relative">

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 active:scale-95"
            >
              {isMenuOpen ? (
                <X size={26} className="text-gray-900" />
              ) : (
                <Menu size={26} className="text-gray-900" />
              )}
            </button>

            {/* Dropdown */}
            {isMenuOpen && (
              <div className="absolute right-0 top-14 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                <div className="py-2">

                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item)}
                      className={`w-full text-left px-5 py-3 text-sm font-medium transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;