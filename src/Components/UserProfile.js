import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { userContext } from '../App'
const UserProfile = () => {
    const { state } = useContext(userContext)
    const [userProfile, setProfile] = useState(null)
    // const [follower, setFollowers] = useState("")

    const { id } = useParams();
    useEffect(() => {
        fetch(`/userprofile/${id}`, {
            method: "get",
            headers: {
                "authorization": "bearer " + localStorage.getItem("jwt"),

            }
        }).then(res => res.json())
            .then(results => {
                setProfile(results)
            }).catch(err => console.log(err))
    }, [id])
    const followBtn=(userId)=>{
        fetch(`/follow/${userId}`,{
            method:"put",
           headers:{
               "authorization":"bearer "+localStorage.getItem("jwt")
           } 
        }).then(res=>res.json())
        .then(results=>{
                    setProfile(results);
            
                // console.log(userProfile)
            
        })
    }
    const unfollowBtn=(userId)=>{
        fetch(`/unfollow/${userId}`,{
            method:"put",
           headers:{
               "authorization":"bearer "+localStorage.getItem("jwt")
           } 
        }).then(res=>res.json())
        .then(results=>{
                    setProfile(results);
            
                // console.log(userProfile)
            
        })
    }
    const style = {
        display: "flex",
        justifyContent: "space-around",
        margin: "18px auto",
        borderBottom: "1px solid grey",

    }
    return (
        userProfile && <div>

            <div style={{ maxWidth: "550px", margin: "0 auto" }}>

                <div style={style}>
                    <div id="profileImg" >
                        <img src={userProfile.user.profileImage} style={{ width: "160px",height:"160px", borderRadius: "80px" }} alt="NO " />
                    </div>
                    <div>
                        <div><h2>{userProfile.user.name}</h2>{userProfile.user.email} </div>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "114%" }}>
                            <div><h6 style={{display:"block"}}>{userProfile.user.followers.length} Followers</h6>{userProfile.user.followers.includes(state._id)?<button className="#2196f3 blue
" onClick={()=>unfollowBtn(userProfile.user._id)}>Unfollow</button>:<button className="#2196f3 blue
" onClick={()=>followBtn(userProfile.user._id)}>Follow</button> } </div>
                            <div><h6>{userProfile.user.following.length} Following</h6></div>
                            <div><h6>{userProfile.posts.length} Posts</h6></div>
                        </div>
                    </div>

                </div>
                <div className="gallery">

            {userProfile.posts.map((item,index)=>{

                return(
                <div key={index} className=" card profile-card" >
                    <div className="card-image">
                        <img className="items" src={item.photo} alt="" />
                    </div>
                </div>
                )
            })

            }



            </div>
            </div>

        </div>


    )
}
export default UserProfile;