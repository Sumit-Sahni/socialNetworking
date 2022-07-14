import React from "react";
import { useEffect, useState,} from "react";
import axios from "axios";
import moment from "moment";


const AllPost = () => {
  const auth = localStorage.getItem("userInfo");
  console.log();
    const [posts, setPosts] = useState([]);


    

  //  Get all posts from the database
   useEffect(()=>{
     const getPost = async () =>{
     const {data} = await axios.get(`/api/posts/fetchallposts`);
      console.log(data);
       setPosts(data);
       console.log(posts);
      
     }
     getPost();
 },[])

  // Get all likes from the database

      

      

   return(
       <>
       {
            posts.map(post=>{
                return( 
                    <div>
                      
                      <div className="container"> 
                    
                        <div className="row">
                                <div className="col-lg-12 col-12">
                                <div class="card w-100 mt-2" style={{"width":"45rem", "height":"25rem" }}>
                                 <div class="card-body ">
                                    <div className="row w-50">
                                    <div class="col-md-12 d-flex  align-items-center">
                                        <div>
                                         <img src={`${post.user.pic}`} alt={"img"} style={{width:"50px", height:"50px", borderRadius:"50%", objectFit:"cover"}}></img>
                                        </div >
                                        <div className="mx-3">
                                        <p>by. {post.user.name.toUpperCase()}</p>
                                        </div>
                                       </div>
                                    </div>
                                   <h6 class="card-subtitle mb-2 my-2 text-muted">About : {post.title}</h6>
                                   <p class="card-text">{post.article}</p>
                                   <div className="row ">
                                    <div className="col-lg-12 d-flex justify-content-between ">
                                      <div className="d-flex flex-row align-items-center ">
                                            <div>
                                             <i class="bi bi-heart-fill" style={{"color":"red"}}></i>
                                            </div>
                                            <div className="mx-2 mt-2">
                                               <p>{post.likes.length}</p>
                                            </div>
                                        </div>
                                        <div>
                                           <p className=" text-end ">{moment(post.created_at).format("MMM Do YYYY,")}</p>
                                        </div>
                                    </div>
                                        
                                   </div>
                                 </div>
                               </div>
                                </div>
                              </div>
                      </div>
                    </div>
                )
            })
       }
       </>
   )

}

export default AllPost;