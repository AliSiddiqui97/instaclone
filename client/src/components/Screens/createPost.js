import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const CreatePost =()=>{
    const history = useHistory()
    const [title,setTitle] =useState('')
    const [body,setBody] =useState('')
    const [image,setImage] =useState('')
    const [url,setUrl] =useState('')
    useEffect(()=>{
        if(url){
            fetch('http://localhost:5000/createpost',{
            method:'post',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title,
                body,
                pic:url

            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:'red darken-2'})
            }
            else{
                M.toast({html: "Post submitted Successfully", classes:'green darken-2'})
                history.push('/')
            }
            
        }).catch(err=>{
            console.log(err)
        })
        }
    },[url])
    const postDetails = ()=>{
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
    return(
        <div className='card input-field' style={{
            margin: '100px auto',
            maxWidth:'600px',
            padding:'20px',
            textAlign:'center',
            }}>
            <input type='text'
             placeholder='title'
             value={title}
             onChange={(e)=>{
                 setTitle(e.target.value)
             }}
             />
            <input type='text' 
             placeholder='body'
             value={body}
             onChange={(e)=>{
                setBody(e.target.value)
            }}
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
            onClick={()=>postDetails()}
            >
                Sign up
                <i className="material-icons right">send</i>
            </button>
        </div>
    )
}

export default CreatePost
