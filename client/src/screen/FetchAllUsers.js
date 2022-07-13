import {React} from "react";
import { useState, useEffect, Fragment} from "react";
import axios from "axios";
import moment from "moment"; 
import { HomeContainer } from "./styled/Home.styled";
import styled from "styled-components";
import { NavLink } from "react-router-dom";



const StyledProfile = styled.div`
     
`

const FetchAllUsers = () => {

    const [AllsUsers, setAllUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);


    useEffect(()=>{
      const getAllUsers = async () =>{
        const {data} = await axios.get("/allusers")
        setAllUsers(data.data)
        console.log(data.data)
       
     }
      getAllUsers();
    },[])
  

    // ***********************************Search Funtionality**********************************************************************



    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        console.log(searchValue)
        if (searchInput !== '') {
            const filteredData = AllsUsers.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(AllsUsers)
        }
    }



    return(

        <>
            <form class="d-flex position-fixed" role="search">
                <input class="form-control me-2" type="search" placeholder="Search Name" aria-label="Search"   onChange={(e) => searchItems(e.target.value)}/>
                <button class="btn btn-outline-primary" type="submit">Search</button>
              </form>


          {searchInput.length > 1 ? (

         filteredResults.map((users, index) => {
            return(
                <StyledProfile className="container mt-5 " key={index}>
                        
                <div className="col-md-12  p-2 d-flex flex-column" >
                    <div>
                    <img src={`${users.pic}`} alt={"img"} style={{width:"80px", height:"80px", borderRadius:"50%", objectFit:"cover"}}></img>
                    </div>
                <div className="d-flex flex-column  justify-content-center  my-2">
                    <h5>Name: {users.name}</h5>
                    <p>Gender: {users.gender}</p>
                    <p style={{marginTop:"-1rem"}}>D.O.B: {moment(users.date).format("MMM Do YYYY")}</p>
                    <p style={{marginTop:"-1rem"}}>About: {users.about}</p>
                    <p style={{marginTop:"-1rem"}}>College: {users.college}.</p>
                </div>
                </div>
                <NavLink to={`/viewprofile/${users._id}`}>
                <button type="button" class="btn btn-secondary p-2 mx-1">View Profile</button>
                </NavLink>
        </StyledProfile>
               
            )
        })
      ) : (
            
         
            AllsUsers.map((users, index) =>{
                return(
                    <StyledProfile className="container mt-5 " key={index}>
                        
                            <div className="col-md-12  p-2 d-flex flex-column" >
                                <div>
                                <img src={`${users.pic}`} alt={"img"} style={{width:"80px", height:"80px", borderRadius:"50%", objectFit:"cover"}}></img>
                                </div>
                            <div className="d-flex flex-column  justify-content-center  my-2">
                                <h5>Name: {users.name}</h5>
                                <p>Gender: {users.gender}</p>
                                <p style={{marginTop:"-1rem"}}>D.O.B: {moment(users.date).format("MMM Do YYYY")}</p>
                                <p style={{marginTop:"-1rem"}}>About: {users.about}</p>
                                <p style={{marginTop:"-1rem"}}>College: {users.college}.</p>
                            </div>
                            </div>
                           
                            <NavLink to={`/viewprofile/${users._id}`}>
                            <button type="button" class="btn btn-secondary p-2 mx-1">View Profile</button>
                            </NavLink>
                            <NavLink to={`/viewprofile/${users._id}`}>
                            <button type="button" class="btn btn-secondary p-2 mx-1">Follow</button>
                            </NavLink>
                    </StyledProfile>
                )
            }) 
      )}
          
       </>
    )
}

export default  FetchAllUsers;