import "../styles/LandingPage.css";
import Home from "../components/Home";
import About from "../components/About";

import Testimonial from "../components/Testimonial";
import Contact from "../components/Contact";

import AutoImageSlider from "../components/TimerSlider";
import Footer from "@/components/Footer";

function LandingPage() {
  return (
    <div className="App">
      <Home />
      <About />
    {/*   <AutoImageSlider /> */}

      <Testimonial />
      <Contact />
      <Footer />
      
    </div>
  );
}

export default LandingPage;
