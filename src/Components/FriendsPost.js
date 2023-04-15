import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../App'
import {Link}from 'react-router-dom'
const Home = () => {
    const { state} = useContext(userContext);
    const [comment,setComment]=useState("");
    // console.log(state)
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('/friendspost', {
            method: "get",
            headers: {
                "authorization": "bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then((results) => {
                setData(results.posts)
            })
    }, [])
    const likeBtn = (id) => {
        
        fetch("/like", {
            method: "put",
            body: JSON.stringify({
                postId: id,
            }),
            headers: {
                "authorization": "bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(results => {
                const newData = data.map(item => {
                    if (item._id === results._id) {
                        return results;
                    } else {
                        return item
                    }
                }
                )
                setData(newData);
            })
    }
    const unlikeBtn = (id) => {
        fetch("/unlike", {
            method: "put",
            body: JSON.stringify({
                postId: id,
            }),
            headers: {
                "authorization": "bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(results => {
                const newData = data.map(item => {
                    if (item._id === results._id) {
                        return results;
                    } else {
                        return item
                    }
                }
                )
                setData(newData);
            })
    }
    
    const commentBtn = (id) => {
        fetch('/comment', {
            method: "put",
            body: JSON.stringify({
                postId: id,
                text:comment
                
            }),
            headers: {
                "authorization": "bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(results => {
                const newData = data.map(item => {
                    if (item._id === results._id) {
                        return results;
                    } else {
                        return item;
                    }

                })
                
                setData(newData);
            })
           setComment("")
    }
    const deleteCommentBtn=(pid,cid)=>{
        fetch("/uncomment",{
            method:"put",
            body:JSON.stringify({
                postId:pid,
                commentId:cid
            }),
            headers:{
                "Content-Type":"application/json",
                "authorization":"bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(results=>{
            const newData=data.map(item=>{
                if(item._id===results._id){
                    return results;
                }else{
                    return item;
                }
            })
            setData(newData);
        })
    }
   const deletePostBtn=(postId)=>{
            fetch("/deletepost",{
                method:"delete",
                headers:{
                    "authorization":"bearer "+localStorage.getItem("jwt"),
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                        postId
                })
            }).then(res=>res.json())
            .then(results=>{
                const newData=data.filter(item=>{
                    return item._id!==results._id
                })
                setData(newData)
            })
   }
    
    return (
        <div className="home">
            {data.map(item => {
                const postId=item._id;
// console.log(item._id)
                return (<div className="card home-card" key={item._id}>
                    <div className="cardHead" >
                        <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                        <img alt="profile" src={item.postedBy.profileImage} style={{height:"30px",width:"30px",borderRadius:"15px"}}/>

                    <h5 ><Link to={`/user/${item.postedBy._id}`}> {item.postedBy.name}   </Link></h5>
                    </div>
                    {item.postedBy._id===state._id&&<button onClick={()=>deletePostBtn(postId)} className="btn-small  waves-effect waves-light btn-flat"><i className="material-icons tiny">delete</i></button>}
                    </div>
                    <div className="card-image ">
                        <img src={item.photo} alt="post"/>

                    </div>
                    <div className="card-content" style={{fontSize:".8rem",padding:"7px"}}>
                        {item.likes.includes(state._id) ?
                            <i className="material-icons" type="button" style={{ color: "red" }} onClick={() => unlikeBtn(item._id)}>favorite</i>

                            :
                            <i className="material-icons" type="button" style={{ color: "black" }} onClick={() => likeBtn(item._id)}>favorite_border</i>

                        }
                        <h6>{item.likes.length}</h6>
                        <p>{item.body}</p>
                        <div style={{display:"flex" ,justifyContent:"space-around",fontSize:".8rem",alignItems:"center"}}>

                        <input type="text" style={{fontSize:".7rem",fontWeight:"bold"}} placeholder=" be the first one to comment" value={comment} onChange={(e)=>setComment(e.target.value)}></input>
                        <button type="button" className="btn waves-effect waves-light green btn-small" onClick={()=>commentBtn(item._id)}><i className="material-icons right">send</i></button>
                        </div>
                    {item.comments.map(item=>{
                      return  (<p key={item._id} style={{fontWeight:"bold",backgroundColor:"#8194fdd1",borderRadius:"5px",textAlign:"center",margin:"5px",display:"flex",justifyContent:"space-around",alignItems:"center",fontSize:".65rem"}}>
                          <span style={{width:"15%",}}>
                              {item.postedBy.name}
                         </span>:
                         <h6 style={{width:"45%",fontSize:".65rem"}}>
                         {item.text}
                             </h6>    
                          {item.postedBy._id===state._id &&<div style={{width:"15%"}}> <button type="button" className="btn-flat" onClick={()=>{deleteCommentBtn(postId,item._id)}}><i class="material-icons">delete</i></button></div>}
                         </p>)
                    })}
                    </div>
                    
                </div>)
                
            })}

            

        </div>
    )
}
export default Home