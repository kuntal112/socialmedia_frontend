import React ,{useState,useContext}from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
import {userContext} from '../App'
const SignIn = () => {
    const {dispatch}=useContext(userContext)
    const history=useHistory();
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const btnHandler=()=>{
    fetch("/signin",{
        method:"post",
        body:JSON.stringify({
            email,
            password
        }),
        headers:{
            "Content-Type":"application/json",
            
        }
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html: data.error,classes:"#f44336 red"})
        }else{
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify (data.user))
            dispatch({type:"USER",payload:data.user})
            M.toast({html: "succesfully signed in ",classes:"#f44336 green"})
            history.push("/")
           
        }
        
        // setEmail("")
        //     setPassword("")

    })
}
    return (
        <div className="myCard">
            <div className=" card auth-card input-field">
                <h3>mediaShare</h3>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1" type="submit" name="action" onClick={btnHandler}>LogIn</button>
                <h5><Link to="/signup">SignUp</Link></h5>
            </div>
        </div>
    )

}
export default SignIn;