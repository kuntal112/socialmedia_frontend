import React, { useContext } from 'react'
import { Link, useHistory } from "react-router-dom"
import { userContext } from '../App'
const NavBar = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(userContext)
  const signOutButton = () => {
    localStorage.clear();
    history.push("/signin")
    dispatch({ type: "ANONYMOUS" })
  }
  const renderList = () => {
    if (state) {
      return [
        <li key="link3"><Link to="/profile">Profile</Link></li>,
        <li key="link4"><Link to="/createpost">Post</Link></li>,
        <li key="link5"><Link to="/friendspost">only Followings</Link></li>,
        <button key="link6"type="button" className="btn" onClick={signOutButton}>sign out</button>
      ]
    } else {
      return [
        <li key="link1"><Link to="/signin">Sign in</Link></li>,
        <li key="link2"><Link to="/signup">Sign up</Link></li>
      ]
    }
  }
  return (
    <div  className="navDiv" style={{ width: "100%", margin: "0px auto", }}>
      <div className="nav-wrapper   accent-2">
        <Link to={state ? "/" : "/signin"} className="brand-logo left ">mediaShare</Link>
        <ul id="nav-mobile" >
          {renderList()}
        </ul>
      </div>
    </div>
  )
}
export default NavBar