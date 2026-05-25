import { Helmet } from "react-helmet-async";

import Hero from "../components/Hero";
import Courses from "../components/Courses";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          BuniyaadEC | Civil Engineering & Infrastructure Solutions
        </title>

        <meta
          name="description"
          content="BuniyaadEC provides modern civil engineering, infrastructure, construction consultancy, and educational solutions."
        />

        <meta
          name="keywords"
          content="civil engineering, infrastructure, construction, consultancy, engineering education"
        />

        <meta property="og:title" content="BuniyaadEC" />

        <meta
          property="og:description"
          content="Modern civil engineering and infrastructure solutions."
        />

        <meta property="og:url" content="https://buniyaadec.com" />

        <meta property="og:type" content="website" />
      </Helmet>

      <Hero />
      <Courses />
      <About />
      <Contact />
    </>
  );
}