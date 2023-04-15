import React,{useState,useEffect} from 'react'
import {useHistory}from 'react-router-dom'
import M from 'materialize-css'
const CreatePost = () => {
    
    const history=useHistory()
   const [title,setTitle]=useState("")
   const [body,setBody]=useState("")
   const [image,setImage]=useState("")
   const [url,setUrl]=useState("")
   useEffect(() => {
       if(url){
    fetch('/postdata',{
        method:"post",
        body:JSON.stringify({
            title,
            body,
            pic:url
        }) ,
        headers:{
            "Content-Type":"application/json",
            "Authorization":"bearer "+localStorage.getItem("jwt")
        }
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.error){
         M.toast({html: data.error,classes:"#f44336 red"})
     }else{
         M.toast({html:"posted succesfully",classes:"#f44336 green"})
         history.push("/")
 
     }
    }).catch(err=>console.log(err))
}

   }, [url])
   const postDetails=()=>{
       if(!title||!body){
           return M.toast({html:"fill the details",classes:"#f44336 red"})
       }else{
        const data =new FormData();
        data.append("file",image);
        data.append("upload_preset","instagram-clone");
        data.append("cloud_name","mycld")
        fetch("https://api.cloudinary.com/v1_1/mycld/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>setUrl(data.url))
        .catch(err=>console.log(err))
       
       }
       
 
   }
   
    const style = {
        maxWidth: "550px",
        margin: "30px auto",
        padding: "20px",
        textAlign:"center"

    }
    return (
        <div className="card input-field" style={style}>
            <input type="text" placeholder="title" value={title} onChange={e=>setTitle(e.target.value)} />
            <input type="text" placeholder="body" value={body} onChange={e=>setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input type="file"  onChange={e=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #42a5f5 blue darken-1" type="submit" name="action" onClick={postDetails}>Post</button>

        </div>
    )
}
export default CreatePost;