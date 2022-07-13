import React from "react";
import { useEffect, useState,} from "react";
import axios from "axios";

const AllPost = () => {
   const [posts, setPosts] = useState([]);
    
     
   useEffect(()=>{
     const getPost = async () =>{
     const {data} = await axios.get(`/api/posts/fetchallposts`);
      console.log(data);
       setPosts(data);
       console.log(posts);
     }
     getPost();
 },[])
   return(
       <>
       {
            posts.map(post=>{
                return(
                    <div>
                        <h5>{post.title}</h5>
                        <p>{post.user.name}</p>
                        <div className="col-6 my-3">
                          <p>{post.article}</p>
                        </div>
                    </div>
                )
            })
       }
       </>
   )

}

export default AllPost;