import React,{useState,useContext,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Signin = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    


    
    
    const postData =()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Email invalid", classes:'red darken-2'})
            return
        }
        fetch('/signin',{
            method:'post',
            headers:{
                'Content-Type':'application/json',
                
            },
            body: JSON.stringify({
                password,
                email

            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:'red darken-2'})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem('user',JSON.stringify(data.user))
                dispatch({
                    type:"USER",
                    payload: data.user
                })
                M.toast({html: "Signed in Successfully", classes:'green darken-2'})
                history.push('/')
            }
            
        }).catch(err=>{
            console.log(err)
        })

    }

 
    return (
        <div className="mycard">
        <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input 
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value) }
            />
           
            <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value) }
            />

          


            <button className="btn waves-effect waves-light deep-purple accent-1" 
            onClick={()=>postData()} >
                Submit
                <i className="material-icons right">send</i>
            </button>
            <h5 >
                <Link to='/signup' >Don't have an account</Link>
            </h5>
      </div>
      </div>
    )
}
export default Signin