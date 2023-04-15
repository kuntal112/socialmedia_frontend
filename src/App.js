import React, { createContext ,useEffect,useReducer,useContext} from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import CreatePost from './Components/CreatePost'
import { reducer, initialState } from './Reducers/userReducer'

import Profile from './Components/Profile'
import UserProfile from './Components/UserProfile'
import FriendsPost from './Components/FriendsPost'
export const userContext = createContext()
const Routing = () => {
  const{dispatch}=useContext(userContext);
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
     dispatch({type:"USER",payload:user})
    } else {
      history.push("/signin")
    }
  }, [])

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route  path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/createpost" exact  component={CreatePost} />
    <Route path="/user/:id" exact component={UserProfile} />
    <Route path="/friendspost" exact component={FriendsPost} />
    </Switch>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <React.Fragment>
      <userContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <NavBar />

          <Routing></Routing>

        </BrowserRouter>
      </userContext.Provider>
    </React.Fragment>
  )
}
export default App;