import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Summary from "./components/Summary.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import FlowDivider from "./components/FlowDivider.jsx";
import useResumeData from "./hooks/useResumeData.js";

export default function App() {
  const { data } = useResumeData();

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main>
        <Hero data={data} />
        <Summary data={data} />
        <FlowDivider />
        <Skills data={data} />
        <FlowDivider />
        <Experience data={data} />
        <FlowDivider />
        <Projects data={data} />
        <FlowDivider />
        <Education data={data} />
        <FlowDivider />
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </div>
  );
}
