// src/VideoPlayer.js
import React from 'react';
import './VideoPlayer.css'; // Create a new CSS file for VideoPlayer component styles

const VideoPlayer = ({ video }) => {
  // Extract title from the video file name
  const title = video.replace(/\.[^/.]+$/, '');

  return (
    <div className="video-container">
      <h2>{title}</h2>
      <video className="video-player" controls width="90%" autoPlay loop>
        <source src={process.env.PUBLIC_URL + '/videos/' + video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
