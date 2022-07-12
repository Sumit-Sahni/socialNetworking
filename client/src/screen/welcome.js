
import { NavLink} from "react-router-dom";
import {React} from "react";
import {Fragment} from "react";
import HomeAndUsers from "./HomeAndUsers";



const Welcome = () => {
 
 const auth = localStorage.getItem("userInfo");
    return (
     <Fragment>
      <nav className="navbar navbar-expand-lg bg-body p-5">
  <div className="container-fluid">
  <NavLink to={`myprofile/${JSON.parse(auth)._id}`} className="nav-link">{(JSON.parse(auth).name)}</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul  className="navbar-nav me-auto  mb-lg-0">
        <li className='nav-item'>
        <button className="nav-link   bg-body" style={{border:"none"}} onClick={()=>{
           localStorage.removeItem("userInfo");
               window.location.href = "/";
           }}>Sign out</button> 
        </li>
      </ul>
    </div>
  </div>
      </nav>  

       <HomeAndUsers/>
      </Fragment>
   
    )
}

export default Welcome;