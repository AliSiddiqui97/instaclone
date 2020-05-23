import React,{useEffect,createContext,useReducer,useContext} from 'react'; 
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Navbar from './components/Navbar'
import NavBar from './components/Navbar';
import Home from './components/Screens/home'
import Signin from './components/Screens/signin'
import Signup from './components/Screens/signup'
import Profile from './components/Screens/profile'
import CreatePost from './components/Screens/createPost'
import UserProfile from './components/Screens/userProfile'
import SubPosts from './components/Screens/subscribedUserPosts'

import {reducer,initialState} from './components/reducers/userReducers'

import './App.css'

export const UserContext = createContext()

// To access routing we created this function

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({
        type:"USER",payload:user
      })
      // history.push('/')

    }else{
      history.push('/signin')
    }
  },[])
  return (
    <Switch>
      <Route exact path='/' >
        <Home/>
      </Route>
      <Route path='/signin'>
        <Signin/>
      </Route>
      <Route path='/signup'>
        <Signup/>
      </Route>
      <Route exact path='/profile'>
        <Profile/>
      </Route>
      <Route path='/createpost'>
        <CreatePost/>
      </Route>
      <Route path='/profile/:userid'>
        <UserProfile/>
      </Route>
      <Route path='/subposts'>
        <SubPosts/>
      </Route>
    </Switch>
  )

}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar/>
      <Routing/>    
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
