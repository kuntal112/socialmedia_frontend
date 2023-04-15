import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../App'
const Profile = () => {
    const [display,setDisplay]=useState(false)
    const { state,dispatch } = useContext(userContext)
    const [updatedImage,setUpdatedImage]=useState("")
    const [url,setUrl]=useState(undefined)


    // console.log(state)
    const style = {
        display: "flex",
        flexWrap:"wrap",
        justifyContent: "space-around",
        margin: "18px auto",
        borderBottom: "1px solid grey",

    }
    const [data, setData] = useState(null)
    useEffect(() => {
        fetch("/myposts", {
            method: "get",
            headers: {
                "authorization": "bearer " + localStorage.getItem("jwt"),

            }
        }).then(res => res.json())
            .then(data => {
                // console.log("test", data)
                setData(data)
            })
    }, [])
    useEffect(()=>{
        if(url){
            fetch("/updateprofileImage",{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":localStorage.getItem("jwt")
                },
                body:JSON.stringify({url})
                
            }).then(res=>res.json())
            .then(data=>{
                // console.log("final",data)
                // setData(data)
            setUpdatedImage("")
                setDisplay(false)

            })
        }
        
    },[url])
    const updateButton=()=>{
        // console.log("bttnclckd")
        const data=new FormData();
        data.append("file",updatedImage);
        data.append("upload_preset","Instagram-clone");
        data.append("cloud_name","mycld");
        
        fetch("https://api.cloudinary.com/v1_1/mycld/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(result=>{
            // console.log("posted cloud",result)
            setUrl(result.url)
            localStorage.setItem("user",JSON.stringify({...state,profileImage:result.url}))
            dispatch({type:"UPDATEIMAGE",payload:result.url})

        })
            
        .catch(err=>console.log(err));
    }
    const updateImageOption=()=>{
        setDisplay(true)
    }
    return (
        <>{data && <div style={{ maxWidth: "550px", margin: "0 auto" }}>

            <div style={style}>
                <div id="profileImg" >
                    <img src={state.profileImage} style={{ maxWidth: "160px",minWidth:"", maxHeight: "160px", borderRadius: "80px" }} alt="NO " onClick={updateImageOption} />
                       {display&&<div className="file-field input-field">
                            <div className="btn">
                                <span>File</span>
                                <input type="file" onChange={e => {setUpdatedImage(e.target.files[0])}} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>}
                       
                        {updatedImage&&<button onClick={()=>updateButton()}>update</button>}
                    
                </div>
                <div>
                    <h2>{state.name}</h2>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "114%" }}>
                        <div>{data.user.followers.length} Follower</div>
                        <div>{data.user.following.length} Following</div>
                        <div>{data.myposts.length} Posts</div>
                    </div>
                </div>

            </div>
            <div className="gallery">
                {data.myposts.map(item => {

                    return (
                        <div className=" card profile-card" key={item._id}>
                            <div className="card-image">
                                <img className="items" src={item.photo} alt="" />
                            </div>
                        </div>
                    )
                })}


            </div>
        </div>}

        </>


    )
}
export default Profile;