import React, { useState, useRef, useReducer } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import './ImageDetection.css';

function ImageDetection() {

  const machine = {
    initial: "initial",
    states: {
      initial: { on: { next: "loadingModel" } },
      loadingModel: { on: { next: "modelReady" } },
      modelReady: { on: { next: "imageReady" } },
      imageReady: { on: { next: "identifying" }, showImage: true },
      identifying: { on: { next: "complete" } },
      complete: { on: { next: "modelReady" }, showImage: true, showResults: true }
    }
  };

  const [results, setResults] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [model, setModel] = useState(null);
  const imageRef = useRef();
  const inputRef = useRef();

  const reducer = (state, event) =>
    machine.states[state].on[event] || machine.initial;

  const [appState, dispatch] = useReducer(reducer, machine.initial);
  const next = () => dispatch("next");

  const loadModel = async () => {
    next();
    const model = await mobilenet.load();
    setModel(model);
    next();
  };

  const identify = async () => {
    next();
    console.log(imageRef.current);
    const results = await model.classify(imageRef.current);
    setResults(results);
    next();
  };

  const reset = async () => {
    setResults([]);
    next();
  };

  const upload = () => inputRef.current.click();

  const handleUpload = event => {
    const { files } = event.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(event.target.files[0]);
      setImageURL(url);
      next();
    }
  };

  const actionButton = {
    initial: { action: loadModel, text: "Load" },
    loadingModel: { text: "Loading" },
    modelReady: { action: upload, text: "Upload" },
    imageReady: { action: identify, text: "Identify" },
    identifying: { text: "Wait" },
    complete: { action: reset, text: "Reset" }
  };

  const { showImage, showResults } = machine.states[appState];

  return (
    <div className="Componente2 d-flex flex-column align-items-center mt-5">
      <h1 className="yellow">IMAGE DETECTION</h1>
      <h6 className="">UPLOAD A PHOTO AND LET ME ANALYZE IT</h6>
      {showImage && <img className="mt-3 mb-3" src={imageURL} alt="upload-preview" ref={imageRef} />}
      <input
        type="file"
        accept="image/*"
        capture="camera"
        onChange={handleUpload}
        ref={inputRef}
      />
      {showResults && (
        <ul>
          {results.map(({ className, probability }) => (
            <li key={className}>{`${className}: %${(probability * 100).toFixed(
              2
            )}`}</li>
          ))}
        </ul>
      )}
      <button className="btn btn-outline-primary mt-4 mb-5" style={{width:150,}} onClick={actionButton[appState].action || (() => {})}>
        <strong>{actionButton[appState].text}</strong>
      </button>

    </div>
  );
}

export default ImageDetection;
