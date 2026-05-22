import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Courses from './components/Courses';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Pages components used for specific routes
import Construpedia from './pages/Construpedia';
import Explore from './pages/Explore'; // Using 'Explor' as per your provided route
import AboutUs from './pages/AboutUs'

// Import the specific Contact page component if it exists, otherwise reuse the component
// Since you import Contact from './components/Contact', we'll use that directly for the route.

function App() {
  return (
    <Router>
      {/* Navbar will display on all pages outside the Routes switch */}
      <Navbar activeSection="" /> 
      
      <Routes>
        {/* Main Home Route: The scrolling hero and the rest of the landing page sections */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              {/* These sections typically follow the Hero on a single-page layout */}
              <Courses /> 
              <About />
              <Contact /> 
            </>
          }
        />
        
        {/* 1. Construpedia Route */}
        <Route path="/construpedia" element={<Construpedia />} />
        
        {/* 2. About Us Route */}
        <Route path="/aboutus" element={<AboutUs />} />
        
        {/* 3. Explore/Buniyaad Route (using 'Explor' from your definition) */}
        <Route path="/explore" element={<Explore />} />

        {/* 4. Contact Route (Linked from the Hero section, ID 4) */}
        <Route path="/" element={<Contact />} />

      </Routes>

      {/* Footer will display on all pages outside the Routes switch */}
      <Footer />
    </Router>
  );
}

export default App;