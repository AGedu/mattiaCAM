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
  const [modality, setModality] = useState("Image Classification");

  function change_modality(){
    if(stateRealDetection){
      setStateRealDetection(false);
      setStateImageClassification(true);
      setModality("Real Detection");
    }
    else{
      setStateRealDetection(true);
      setStateImageClassification(false);
      setModality("Image Classification");
    }
  }

  return (
    <div id="container">
        <div className="header">
          <Header />
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
          <h6 className="text-light">Switch model</h6>
          <button className="btn btn-outline-light rounded-0 p-2" onClick={change_modality}>{modality}</button>
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
