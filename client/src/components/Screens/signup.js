import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Signup = ()=>{
    const history = useHistory()
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])


    const uploadPic = ()=>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','instaclone')
        data.append('cloud_name','dnngxillp')
        fetch("https://api.cloudinary.com/v1_1/dnngxillp/image/upload",{
            method:'post',
            body:data,

        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
        console.log('url: ',url)
        
    }

    const uploadFields =()=>{
        const objBody= JSON.stringify({
            name,
            password,
            email,
            pic:url

        })
        console.log(objBody)
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Email invalid", classes:'red darken-2'})
            return
        }
        fetch('/signup',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:objBody
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:'red darken-2'})
            }
            else{
                M.toast({html: data.message, classes:'green darken-2'})
                history.push('/signin')
            }
            
        }).catch(err=>{
            console.log('Error signing up')
            console.log(err)
        })

    }
    const postData = ()=>{
        if(image){
            uploadPic()
        }
        else{
            console.log(name)
            uploadFields()
            
        }
        
    }
    return (
        <div className="mycard">
        <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input 
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value) }
            />
           
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
            <div className="file-field input-field">
                <div className="btn deep-purple accent-1">
                    <span>File</span>
                    <input type="file"
                    onChange={(e)=>{
                        setImage(e.target.files[0])
                    }}
                    />
                </div>
                <div className="file-path-wrapper ">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>

            <button className="btn waves-effect waves-light deep-purple accent-1" 
            onClick={()=>postData()}
            >
                Sign up
                <i className="material-icons right">send</i>
            </button>
            <h5>
                <Link to='/signin'>Already have an account</Link>
            </h5>
      </div>
      </div>
    )
}
export default Signup