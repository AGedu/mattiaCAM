import {useState, useRef, useReducer} from 'react';
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from 'react-webcam';


const labelMap = {
    1:{class:'Person', color:'red'},
    2:{class:'Thank You', color:'yellow'},
    3:{class:'I Love You', color:'lime'},
    4:{class:'Yes', color:'blue'},
    5:{class:'No', color:'purple'},
}

function RealTimeDetection(){

  const [model, setModel] = useState(null);

  const loadModel = async () => {
    next();
    const net = await cocossd.load();
    setModel(net);
    next();
  };

  const start = async () => {
    next();
    setStateWebcam(true);
    setInterval(() => {
      detect(model);
    }, 10);
  }

  const stop = () => {
    next();
    setStateWebcam(false);
  }

  const machine = {
    initial: "initial",
    states: {
      initial: { on: { next: 'loadingModel'} },
      loadingModel: { on: { next: 'startDetection'} },
      startDetection: { on: { next: 'stopDetection'} },
      stopDetection: { on: { next: 'startDetection'} },
    }
  }

  const actionButton = {
    initial: {action: loadModel, text: 'Load model'},
    loadingModel: {text: 'Loading'},
    startDetection: {action: start,text: 'Start'},
    stopDetection: {action: stop,text: 'Stop'},
  }

  const reducer = (state, event) =>
    machine.states[state].on[event] || machine.initial;

  const [appState, dispatch] = useReducer(reducer, machine.initial);
  const next = () => dispatch("next");

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [stateWebcam, setStateWebcam] = useState(false);

  //funzione che si occupa di disegnare i rettangoli intorno agli oggetti rilevati
  function drawRect (detections, ctx){
    // Loop through each prediction
    detections.forEach(prediction => {

      // Extract boxes and classes
      const [x, y, width, height] = prediction['bbox'];
      const text = prediction['class'] + " " + Math.round(prediction['score']*100) + "%" ;

      // Set styling
      const color = Math.floor(Math.random()*16777215).toString(16);
      ctx.strokeStyle = '#' + color
      ctx.lineWidth = 3
      ctx.font = '18px Bungee';

      // Draw rectangles and text
      ctx.beginPath();
      ctx.fillStyle = '#' + color

      ctx.fillText(text, x, y-10);
      ctx.rect(x, y, width, height);
      ctx.stroke();
    });
  }

  //funzione che prende in ingresso l'immagine ottenuta dalla webcam e la passa al modello
  //per avviare il rilevamento
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;

      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);
      console.log(obj);


      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };



  return(
    <div className="real-time-detection d-flex flex-column align-items-center">
      {stateWebcam && (
        <div>
          <Webcam
            ref={webcamRef}
            muted={true}
            screenshotFormat="image/jpeg"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              width: 640,
              height: 480,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              width: 640,
              height: 480,
            }}
          />

        </div>
        )
      }

      <button className="btn btn-outline-warning rounded-0 mt-4 mb-5" style={{width:150,}} onClick={actionButton[appState].action || (() => {})}>
        <strong>{actionButton[appState].text}</strong>
      </button>

    </div>
  )
}

export default RealTimeDetection;
