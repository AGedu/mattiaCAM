import './App.css';
import ImageDetection from './components/ImageDetection.js';
import RealDetection from './components/RealDetection.js';


function App() {
  return (
    <div className="App vh-100 d-flex flex-column align-items-center text-white">

      <div className="header-app text-center mt-5">
        <h1><strong>
          <span className="text-danger">S</span>
          <span className="yellow">M</span>
          <span className="text-primary">A</span>
          <span className="text-light">R</span>
          <span className="text-success">T</span>
          <span className="text-danger"> D</span>
          <span className="yellow">E</span>
          <span className="text-primary">T</span>
          <span className="text-light">E</span>
          <span className="text-success">C</span>
          <span className="text-danger">T</span>
          <span className="yellow">I</span>
          <span className="text-primary">O</span>
          <span className="text-light">N</span>
          </strong></h1>
        <h6><i>REAL-TIME OBJECT DETECTION OR IMAGE ANALYSIS, WHAT IS YOUR CHOICE?</i></h6>
        <hr/>
      </div>

      <RealDetection />
      <ImageDetection />

    </div>
  );
}

export default App;
