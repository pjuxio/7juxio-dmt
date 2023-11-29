import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import VideoPlayer from './VideoPlayer';
import NameModal from './NameModal';
import About from './About';
import './App.css';
import videoButtons from './VideoButtons'; // Import the videoButtons array

// Initialize Google Analytics
ReactGA.initialize('G-XH29HZ0KCL');

const AppContent = () => {
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAboutPage, setShowAboutPage] = useState(false);
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed

  useEffect(() => {
    // Track page view when the component mounts
    ReactGA.pageview(location.pathname + location.search);

    // Existing code for getting and setting user name
    const storedName = localStorage.getItem('userName');
    if (!storedName) {
      const name = prompt('Please enter your name:');
      if (name) {
        setUserName(name);
        localStorage.setItem('userName', name);
      }
    } else {
      setUserName(storedName);
    }

    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  const handleVideoSelect = (video) => {
    // Track video play event
    ReactGA.event({
      category: 'Video',
      action: 'Play',
      label: video,
    });

    setSelectedVideo(video);
    setShowAboutPage(false); // Close the About page if a video is selected
  };

  const handleModalSubmit = (name) => {
    setUserName(name);
    localStorage.setItem('userName', name);
    setIsModalOpen(false);
  };

  const handleAboutClick = () => {
    setShowAboutPage(true);
    setSelectedVideo(null); // Clear the selected video when About is clicked
  };

  return (
    <div className="hypermedia-container">
      <div className="nav-column2">
        {userName && <p>Welcome, {userName}!</p>}  
        <img src="dmt-cover.jpg" alt="DMT Cover" className="album-cover2" />
        <h1 className="album-title">Dream Manifestation Toolkit</h1>
        <p className="album-blurb">A hypermedia mixtape created with the 7juxio platform.</p>
        <span><button className="about-button" onClick={handleAboutClick}>
            Release Notes
        </button></span>
        <div className="contents-box"><h2>Contents</h2>
          {videoButtons.map((video, index) => (
          <button key={index} onClick={() => handleVideoSelect(video.file)} className="album-button">
           {video.label}
          </button>
          ))}
        </div>
      </div>
      <div className="video-column2"> 
      {showAboutPage ? <About /> : selectedVideo && <VideoPlayer key={selectedVideo} video={selectedVideo} />}
      </div>      

      <div className="footer">
        <img src="7juxio.png" alt="Logo" className="footer-logo" />
        <span className="footer-statement">a 7juxio hypermedia app</span>
      </div>

    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;