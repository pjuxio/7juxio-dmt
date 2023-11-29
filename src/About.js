import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css'; // Create a new CSS file for About component styles
import ReactGA from 'react-ga';

const About = () => {
  // Track page view when the component mounts
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);

    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    // Set a unique title for the About page
    document.title = "7juxio | DMT - Release Notes";
  }, []);

  return (
    <div className="container-about">      
      <h1>Dream Manifestation Toolkit</h1>
      <p>This project explores the concept of the mashup (or remix) and extends it into the visual realm through hypermedia.</p>
      <p>The remix is a core element of the hip hop arts experience and central to the cultures of turntablism and beatmaking. In this project, 7juxio reimagines itself conjuring magical mix that include some of the greatest artists of all time. What if the 7juxio platform could actualize this alternate reality and bring these artists together for a collaboration?</p>
      <p>This hypermedia release from <strong>7juxio</strong> is delivered via a React app coded using ChatGPT.</p>
    </div>
  );
};

export default About;