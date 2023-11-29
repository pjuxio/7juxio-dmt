import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import VideoPlayer from './VideoPlayer';
import NameModal from './NameModal';
import About from './About';
import './App.css';

// Initialize Google Analytics
ReactGA.initialize('G-XH29HZ0KCL');

const AppContent = () => {
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAboutPage, setShowAboutPage] = useState(false);
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed
  // Set a unique title for the About page
  document.title = "7juxio Dream Manifestation Tooklit";

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

  const videoButtons = [
    { label: 'Grateful Juxio', file: 'Grateful Juxio - Fire on the Mountain (dub mix).mp4' },
    { label: 'Cyde of Gypsys', file: 'Cyde of Gypsys - Passing Me By (Fillmore mix).mp4' },
    { label: 'Ms. Lauryn Hill', file: 'Ms. Lauryn Hill - Lost Ones (Shottas mix).mp4' },
    { label: 'Notorious Burke', file: 'Notorious Burke - Juicy (To the Top mix).mp4' },
    { label: 'Flying Fugees', file: 'Flying Fugees - Fu-gee-la Her Story (Solo Lauryn mix).mp4' },
    { label: 'MOS CT3P30', file: 'MOS CT3P30 - Ms. Fat Booty (Funky Russian mix).mp4' },
    { label: 'Gift of Gab RIP', file: 'Gift of Gab RIP - Feel that Way (Kenyatta Remix).mp4' },
    { label: 'Grateful Wu', file: 'Grateful Wu - Da Mystery of Chessboxing (Connecticut mix).mp4' },
    { label: 'Fast Car', file: 'Luke Chapman - Fast Car (Nothing to Prove mix).mp4' },
    { label: 'How High', file: 'Meth, Red & Hammond - How High (Trees for Breakfast mix).mp4' },
    { label: 'Wild for the Night', file: 'Rampage the Last Boyscout ft. Busta Rhymes & the Upset the Set Stepuppers - Wild for the night (Tapscott Remix).mp4' },
  ];

  return (
    <div className="hypermedia-container">
      <div className="nav-column2">
        {userName && <p>Welcome, {userName}!</p>}  
        <img src="dmt-cover.jpg" alt="DMT Cover" className="album-cover2" />
        <h1 className="album-title">Dream Manifestation Toolkit</h1>
        <p className="album-blurb">A hypermedia mixtape of remixes and visuals by 7juxio</p>
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