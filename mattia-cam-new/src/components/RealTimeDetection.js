import {useState, useRef} from 'react';
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from 'react-webcam';

function RealTimeDetection(){

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [stateWebcam, setStateWebcam] = useState(false);

  //funzione che si occupa di disegnare i rettangoli intorno agli oggetti rilevati
  function drawRect (detections, ctx){
    // Loop through each prediction
    detections.forEach(prediction => {

      // Extract boxes and classes
      const [x, y, width, height] = prediction['bbox'];
      const text = prediction['class'] + " " + prediction['score'];

      // Set styling
      const color = Math.floor(Math.random()*16777215).toString(16);
      ctx.strokeStyle = '#' + color
      ctx.font = '18px Arial';

      // Draw rectangles and text
      ctx.beginPath();
      ctx.fillStyle = '#' + color
      ctx.fillText(text, x, y);
      ctx.rect(x, y, width, height);
      ctx.stroke();
    });
  }

  //funzione che carica il modello e richiama a intervalli di 10ms la funzione di rilevamento
  const runCoco = async () => {
    const net = await cocossd.load();
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

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

  //funzione che attiva la webcam e fa partire il rilevamento
  function active_webcam(){
    setStateWebcam(true);
    runCoco();
  }

  //funzione che disattiva la webcam
  function disable_webcam(){
    setStateWebcam(false);
  }


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
      {
        stateWebcam ?
        (<button className="btn btn-outline-primary mt-3" onClick={disable_webcam} style={{width:150,}}><strong>Stop</strong></button>)
        :
        (<button className="btn btn-outline-primary mt-3" onClick={active_webcam} style={{width:150,}}><strong>Start</strong></button>)
      }

    </div>
  )
}

export default RealTimeDetection;
