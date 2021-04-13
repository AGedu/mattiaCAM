import HeaderDetection from './HeaderDetection.js';
import ImageClassificator from './ImageClassificator.js';

function ImageDetection(){

  return(
    <div className="image-detection mt-5">
      <HeaderDetection type="IMAGE DETECTION" info="UPLOAD A PHOTO AND LET ME ANALYZE IT"/>
      <ImageClassificator />
    </div>
  )
}

export default ImageDetection;
