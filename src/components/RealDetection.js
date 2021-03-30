import React from 'react';
import Webcam from "react-webcam";
import * as cocossd from "@tensorflow-models/coco-ssd";
import { useRef, useState, useCallback } from "react";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import camera from "../photo-camera.svg";
import download_image from "../download.svg";
import download from 'downloadjs';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

function RealDetection(){

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const imageRef = useRef(null);
  const [reloadState, setStateReload] = useState(0);
  const [stateWebcam, setStateWebcam] = useState(false);
  const [nameButton, setNameButton] = useState('Start');
  const [imgSrc, setImgSrc] = React.useState(null);


  function reload(){
    if(reloadState===0){
      setStateReload(1);
      console.log("reload");
    }
    else{
      setStateReload(0);
      console.log("reload");
    }
  }

  function downloadImage(){
    domtoimage.toBlob(document.getElementById("root"))
    .then(function (blob) {
        window.saveAs(blob, 'my-image.png');
    });
  }

  const detect_img = async () => {
    const net = await cocossd.load();
    const img = imageRef.current;

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;
    canvasRef2.current.width = videoWidth;
    canvasRef2.current.height = videoHeight;

    const obj = await net.detect(img);
    console.log(obj);
    const ctx = canvasRef2.current.getContext("2d");
    drawRect(obj,ctx);
    reload();
  };


  function capture(){
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    detect_img();
  }

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

  const runCoco = async () => {
    const net = await cocossd.load();
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

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


      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  function change_state_webcam(){
    if(stateWebcam === false){
      setStateWebcam(true);

      setNameButton("Stop");
      runCoco();
    }
    else{
      setStateWebcam(false);
      setImgSrc(null);
      setNameButton("Start");
    }
  }


  return(
    <div className="Componente1 d-flex flex-column align-items-center mt-5">
      <h1 className="yellow">REAL DETECTION</h1>
      <h6 className="">USE YOUR CAMERA TO REVEAL OBJECTS</h6>
      <button className="btn btn-outline-primary mt-4 mb-3" style={{width:150,}} onClick={change_state_webcam}><strong>{nameButton}</strong></button>
      {stateWebcam && (
        <div className="d-flex flex-column align-items-center">
            <div className="imageContainer">
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
            </div>

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
            <div className="container-button">
              <button className="mt-3 mb-3"><img src={camera} onClick={capture} style={{width: 35, height: 35}} /></button>
              {imgSrc && (
                <button className="mt-3 mb-3"><img src={download_image} onClick={downloadImage} style={{width: 35, height: 35}} /></button>
              )}
            </div>

            {imgSrc && (

              <div className="imageDownload">

                <img
                  ref={imageRef}
                  src={imgSrc}
                  style={{
                    width: 640,
                    height: 480
                  }}
                />

                <canvas
                  ref={canvasRef2}
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

            )}
        </div>
      )}

    </div>
  );
}

export default RealDetection;
