import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"; // Add this import

const Footer = () => {
  const navigate = useNavigate(); // Add this hook
  
  // Function to handle hash link clicks
  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const sectionId = hash.substring(1); // Remove the '#'
    
    if (window.location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/');
      // Wait for navigation, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    } else {
      // Already on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <footer className="bg-black text-white py-12 px-6">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">BuniyaadEC</h2>
          <p className="text-sm text-gray-400 mt-3">
            Building Strong Foundations..
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/explor" className="hover:text-white transition">Explore</a></li>
            <li><a href="/construpedia" className="hover:text-white transition">Construpedia</a></li>
            <li>
              <a 
                href="#about" 
                onClick={(e) => handleHashLinkClick(e, '#about')}
                className="hover:text-white transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => handleHashLinkClick(e, '#contact')}
                className="hover:text-white transition"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a 
              href="https://www.facebook.com/share/17gSqpJXHX/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition"
            >
              <FaFacebookF size={16} />
            </a>
            <a 
              href="https://www.instagram.com/buniyaadec?igsh=N2NlNXVoam5zZGQw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition"
            >
              <FaInstagram size={16} />
            </a>
            <a 
              href="https://x.com/Buniyaadec" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition"
            >
              <FaXTwitter size={16} />
            </a>
            <a 
              href="#" 
              className="p-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a 
              href="https://youtube.com/@buniyaadec?si=PaTcoOhHBtMhkEJ5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition"
            >
              <FaYoutube size={16} />
            </a>
          </div>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm text-gray-300">Email: support@buniyaad.com</p>
          <p className="text-sm text-gray-300 mt-1">Phone: +91 98765 43210</p>
          <p className="text-sm text-gray-300 mt-1">Hyderabad, India</p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Buniyaad.com. All Rights Reserved.
        <br />
        Designed & Developed by{" "}
        <a
          href="https://abdulrafi.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline hover:text-gray-300"
        >
          Abdul Rafi
        </a>.
      </div>
    </footer>
  );
};

export default Footer;