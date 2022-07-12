import React from "react";
import FetchAllUsers from "./FetchAllUsers";
import FetchAllBlogs from "./FetchAllBlogs";
import ViewProfile from "./ViewProfile";
import styled from "styled-components";

const ProfileScroll = styled.div`
 ::-webkit-scrollbar {
  width: 10px;
 },
  ::-webkit-scrollbar-track {
  // background: #f1f1f1;
  },
  ::-webkit-scrollbar-thumb {
  background-color: rgba(179, 179, 179, 0.1);
  }
  overflow-y: scroll;
  height: 80vh;
  bordr: none;
`

const HomeAndUsers = () => {
    return (
       <>
          
         <div className="container">
          <div className="row">
           
            <div  className="col-md-4 col-12" >
            <ProfileScroll>
                 <FetchAllUsers/>
                 </ProfileScroll>
            </div>
            
           
            <div className="col-md-8">
              
            </div>
          </div>
         </div>
       </>
    );
}

export default HomeAndUsers;