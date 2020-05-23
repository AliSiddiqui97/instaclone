import React,{useEffect,useState,useContext, useCallback} from 'react'

import {UserContext} from '../../App'

const Profile = ()=>{
    const {state,dispatch}= useContext(UserContext)
    const [mypics, setPics] =useState([])
    const [image,setImage]=useState("")
    // const [url,setUrl]=useState()
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
            console.log(result)
        })
    },[])
    useEffect(()=>{
        if(image){
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
                
                // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
                // dispatch({type:"UPDATEPIC",payload:data.url})
                fetch('/updatepic',{
                    method:'put',
                    headers:{
                        'Content-Type':'application/json',
                        "Authorization":"Bearer "+localStorage.getItem("jwt")

                    },body: JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{console.log()
                            localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                            dispatch({type:"UPDATEPIC",payload:result.url})
                            window.location.reload()
                        })
                    
            }).catch(err=>{
                console.log(err)
            })
            
        }


    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
       
        
    }
    return (
        <div style={{maxWidth:'900px',margin:'0px auto'}}>
            
            <div style={{
                display:'flex',
                justifyContent:"space-around",
                margin: '18px 0px',
                paddingBottom:'5px',
                borderBottom:'2px solid #80808078',
            }}>
                <div>
                   
                    <img style={{ 
                        width:'160px',
                        height:'160px',
                        borderRadius:'60px'
                    }} 
                    src= {state?state.pic:"Loading.."}/>
                     <div>
                    
                    <div className="file-field input-field">
                <div className="btn deep-purple accent-1">
                    <span>Update Pic</span>
                    <input type="file"
                    onChange={(e)=>{
                        updatePhoto(e.target.files[0])
                    }}
                    />
                </div>
                <div className="file-path-wrapper ">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
                    </div>
                </div>

                <div>
                    <h4>{state?state.name:'loading ...'}</h4>
                    <h5>{state?state.email:'loading ...'}</h5>
                    
                    <div style={{
                        display:'flex',
                        width:'100%',
                        justifyContent:'space-between',
                    }}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state?state.followers.length:'Loading...'} followers</h6>
                        <h6>{state?state.following.length:'Loading...'} following</h6>

                    </div>
                </div>
            </div>
        
            <div className='gallery'>
                {
                    mypics.map(item=>{
                        return(
                            <img
                            key={item._id}
                            className='item-image'
                            src={item.photo}
                            alt={item.title}
                            />
                    
                        )
                    })
                }
                   
                   
            </div>
        </div>
    )
}
export default Profile