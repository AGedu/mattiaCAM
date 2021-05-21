
import PersonalNavbar from './PersonalNavbar';
function Header(){

  return(
      <div className="header">
        <PersonalNavbar />
        <div className="title d-flex flex-column align-items-center mt-5">
          <h6 className="text-light"><i>COMPUTER VISION EXPERIMENTS, WHAT DOES AI SEE?</i></h6>
          <hr/>
        </div>
      </div>

  )
}

export default Header;
