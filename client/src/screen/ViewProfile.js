import React from "react";
import { useEffect, useState, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { useParams } from "react-router";
import moment from "moment"; 
import styled from "styled-components";


const StyledProfile = styled.div`
`


const ViewProfile = ({p}) => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
  

   useEffect(()=>{
    const getPosts = async () =>{
    const {data} = await axios.get(`/api/posts/getbypostid/${p}`);
     console.log(data);
    }
    getPosts();
   },[])

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(`/api/users/userbyid/${id}`);
            console.log(data);
            console.log(data.posts);
            setPosts(data.posts);
            setUser([data]);
        }
        getUser();
    },[]) 

    return(
        <>
             <Fragment>
            <nav className="navbar navbar-expand-lg bg-body p-2 my-2">
  <div className="container-fluid">
  <NavLink to="/welcome" className="navbar-brand">Back</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li className="nav-item">
          <NavLink to="/" className="nav-link active" aria-current="page">About</NavLink>
        </li> */}
      </ul>
      <ul  className="navbar-nav me-auto mb-2 mb-lg-0">
        
      </ul>
    </div>
  </div>
            </nav>
             
         </Fragment>
        {
            user.map((users, index) =>{
                return(
                    <StyledProfile className="container mt-5 p-5" key={index}>
                        <div className="row justify-content-start ">
                            <div className="col-md-3  p-2 d-flex flex-column  ">
                                <div>
                                <img src={`${users.pic}`} alt={"img"} style={{width:"180px", height:"180px", borderRadius:"50%", objectFit:"cover"}}></img>
                                </div>
                            <div className="d-flex flex-column  justify-content-center  my-2">
                                <h5>Name: {users.name}</h5>
                                <p>Email: {users.email}</p>
                                <div className="row " >
                                    <div className="col-md-10 d-flex flex-row   ">
                                      <div>
                                      <p >Gender: {users.gender}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}>
                                                                               </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 d-flex flex-row  ">
                                      <div>
                                      <p >D.O.B: {moment(users.date).format("MMM Do YYYY")}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}>
                                                                             </div>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-md-12 d-flex flex-row  ">
                                      <div >
                                        <p>About: {users.about}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}>
                                                                              </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 d-flex flex-row   ">
                                      <div>
                                        <p>College: {users.college}</p>
                                      </div>
                                        <div  style={{cursor:'pointer'}}>
                                         
                                       </div>
                                    </div>
                                </div> 
                            </div>
                            </div>
                            <div className="col-md-9 p-5 " style={{"overflow-y": "auto", height: "60vh", border: "none"}}>
                                <div>
                               {
                                    posts.map((post, index) =>{
                                        return(
                                            <div className="row justify-content-start " key={index}>
                                                <div className="col-md-12 p-2 d-flex flex-column  ">
                                                    <div className="d-flex flex-row  justify-content-between  my-2">
                                                        <h5>{post.title}</h5>
                                                        <p>{moment(post.date).format("MMM Do YYYY")}</p>
                                                    </div>
                                                    <div className="d-flex flex-column  justify-content-center  my-2">
                                                        <p>{post.article}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                               }
                                </div>
                            </div>
                        </div>
                    </StyledProfile>
                )
            }) 
         }
       </>
    )



}

 export default ViewProfile;