import React from 'react';
import {useState} from 'react';
import Header from './components/Header.js';
import RealDetection from './components/RealDetection.js';
import ImageDetection from './components/ImageDetection.js';
import Footer from './components/Footer.js';
import './App.css';

function App() {

  const [stateRealDetection, setStateRealDetection] = useState(true);
  const [stateImageClassification, setStateImageClassification] = useState(false);

  function set_image_classification(){
    setStateRealDetection(false);
    setStateImageClassification(true);
  }

  function set_real_detection(){
    setStateImageClassification(false);
    setStateRealDetection(true);
  }

  return (
    <div id="container">
        <div className="header">
          <Header />
        </div>
        <div className="d-flex flex-column align-items-center mt-5">
          <h6 className="text-light">choose the working mode</h6>
          <div className="console-button d-flex flex-column flex-sm-row">
            <button className="btn btn-outline-light rounded-0 p-2" disabled={stateRealDetection} style={{width:200,}} onClick={set_real_detection}>Real Time</button>
            <button className="btn btn-outline-light rounded-0 p-2" disabled={stateImageClassification} style={{width:200,}} onClick={set_image_classification}>Offline</button>
          </div>
        </div>
        <div className="mt-5">
          {stateRealDetection && (
            <RealDetection />
          )}
          {stateImageClassification && (
            <ImageDetection />
          )}
        </div>
        <div id="push">

        </div>
        <div id="footer">
          <Footer />
        </div>
    </div>


  );
}

export default App;
