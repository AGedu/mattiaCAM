function HeaderDetection(props){

  return(
    <div className="header-detection d-flex flex-column align-items-center">
      <h1 className="yellow">{props.type}</h1>
      <h6 className="text-light">{props.info}</h6>
    </div>
  )
}

export default HeaderDetection;
