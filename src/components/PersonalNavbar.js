import { Navbar, } from 'react-bootstrap';

function PersonalNavbar(){

  return(
    <div className="personal-navbar">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home" className="m-2">
        MATTIA-CAM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
    </div>
  )
}

export default PersonalNavbar;
