import React,{useCallback, useEffect, useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
const SignUp = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [url,setUrl]=useState(undefined)
    const [profileImage,setProfileImage]=useState("")
    const history=useHistory();
    
   const clickHandler=(e)=>{
            
    setName(e.target.value)
}

const uploadImage=()=>{
    const data=new FormData();
    data.append("file",profileImage);
    data.append("upload_preset","instagram-clone");
    data.append("cloud_name","mycld");
    fetch("https://api.cloudinary.com/v1_1/mycld/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json())
    .then(result=>{
        setUrl(result.url)
    }).catch(err=>console.log(err));
}
const btnHandler=()=>{
    if(profileImage){
        uploadImage();
    }
    else{
        uploadFields();
    }
}

const uploadFields=useCallback(()=>{

    if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html:"invalid Email",classes:"#f44336 red"})
        return;
    }
    fetch('/signup',{
        method:'post',
        body:
           JSON.stringify ({
            name,
            email,
            password,
            url
            
        })
        ,
        headers:{
            "Content-Type":"application/json",
            
        }
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html:data.error,classes:"#f44336 red"})
    }else{
        M.toast({html:data.message,classes:"#f44336 green"})
        history.push("/signin")
    }
    
})
    .then(()=>{
       setName("")
       setPassword("")
       setEmail("")
    }).catch(err=>console.log(err))
},[])
useEffect(()=>{
    if(url){
       uploadFields();
    }
   
},[url,uploadFields])
    return (
        <div className="myCard">
            <div className=" card auth-card input-field">
                <h3>mediaShare</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={name}
                    onChange={clickHandler}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
                <input
                    type="text"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
                 <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input type="file"  onChange={e=>setProfileImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1" type="submit" name="action" onClick={btnHandler}>SignUp</button>

                <h5><Link to="/signin"> goto SignIn</Link></h5>
            </div>
        </div>
    )

}
export default SignUp;