import HeaderDetection from './HeaderDetection.js';
import RealTimeDetection from './RealTimeDetection.js';

function RealDetection(){

  return(
    <div className="real-detection mt-5">
      <HeaderDetection type="REAL TIME OBJECT DETECTION" info="FIND OBJECTS INTO YOUR CAMERA" />
      <RealTimeDetection />
    </div>
  )
}

export default RealDetection;
