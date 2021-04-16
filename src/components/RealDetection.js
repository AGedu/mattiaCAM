import HeaderDetection from './HeaderDetection.js';
import RealTimeDetection from './RealTimeDetection.js';

function RealDetection(){

  return(
    <div className="real-detection mt-5">
      <HeaderDetection type="REAL DETECTION" info="USE YOUR CAMERA TO REVEAL OBJECTS" />
      <RealTimeDetection />
    </div>
  )
}

export default RealDetection;
