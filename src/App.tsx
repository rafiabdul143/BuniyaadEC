import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Construpedia from "./pages/Construpedia";
import Explore from "./pages/Explore";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      {/* Global Navbar */}
      <Navbar activeSection="" />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Construpedia */}
        <Route path="/construpedia" element={<Construpedia />} />

        {/* Explore */}
        <Route path="/explore" element={<Explore />} />

        {/* About Us */}
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>

      {/* Global Footer */}
      <Footer />
    </Router>
  );
}

export default App;