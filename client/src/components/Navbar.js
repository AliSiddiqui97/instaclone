import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
const NavBar = ()=>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const renderList = () =>{
        if(state){
            return [
                <li><Link to="/">All</Link></li>,
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createpost">Create Post</Link></li>,
                <li><Link to="/subposts">Home</Link></li>,
                
                <li>
                    <button className="btn-flat" 
                    onClick={()=>{
                        localStorage.clear()
                        dispatch({type:'CLEAR'})
                        history.push('/signin')
                    }} >
                        <a>Sign out</a>
                    
                    </button>
                </li>
            ] 
        }else{
            return [
                <li><Link to="/signin">Sign in</Link></li>,
                <li><Link to="/signup">Sign up</Link></li>
               
            ]
        }
    }
    return(

        <nav>
        <div className="nav-wrapper deep-purple lighten-3">
            <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
            </ul>
        </div>
        </nav>
      
    )
}

export default NavBar