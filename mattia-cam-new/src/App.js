import React from 'react';
import Header from './components/Header.js';
import RealDetection from './components/RealDetection.js';
import ImageDetection from './components/ImageDetection.js';
import './App.css';

function App() {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center mt-5">
      <Header />
      <RealDetection  />
      <ImageDetection />
    </div>
  );
}

export default App;
