import { Helmet } from "react-helmet-async";

import Hero from "../components/Hero";
import Courses from "../components/Courses";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Helmet>
        {/* Primary SEO */}
        <title>
          BuniyaadEC | Civil Engineering & Infrastructure Solutions
        </title>

        <meta
          name="description"
          content="BuniyaadEC provides modern civil engineering, infrastructure, construction consultancy, and educational solutions."
        />

        <meta
          name="keywords"
          content="BuniyaadEC, civil engineering, infrastructure, construction consultancy, engineering education, structural design"
        />

        <meta name="author" content="BuniyaadEC" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://buniyaadec.com" />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="website" />

        <meta
          property="og:title"
          content="BuniyaadEC | Civil Engineering & Infrastructure Solutions"
        />

        <meta
          property="og:description"
          content="Modern civil engineering and infrastructure solutions."
        />

        <meta
          property="og:image"
          content="https://buniyaadec.com/logo.png"
        />

        <meta property="og:url" content="https://buniyaadec.com" />

        <meta property="og:site_name" content="BuniyaadEC" />

        {/* Twitter/X SEO */}
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="BuniyaadEC | Civil Engineering & Infrastructure Solutions"
        />

        <meta
          name="twitter:description"
          content="Modern civil engineering and infrastructure solutions."
        />

        <meta
          name="twitter:image"
          content="https://buniyaadec.com/logo.png"
        />
      </Helmet>

      <Hero />
      <Courses />
      <About />
      <Contact />
    </>
  );
}