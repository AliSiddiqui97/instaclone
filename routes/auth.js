const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User') //the one we exported
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../config/keys")
const requireLogin = require("../middleware/requireLogin")



router.post('/signup',(req,res)=>{
        
    console.log(req.body)
    const {
        name,email,password,pic
    } = req.body
    if(!name||!email||!password){
        return res.status(422).json({error:"Please fill all fields"})
    }
    else{
        res.json({
            message:"Successfully posted"
        })

        User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({error:"User already exist"})

            }
            bcrypt.hash(password,12)
            .then(hashedpassword=>{
                const user = new User({
                    email,
                    password:hashedpassword
                    ,name,pic
                })
                user.save()
                .then(user=>{
                    res.json({message:'Saved Success'})
                })
                .catch(err=>{
                    console.log(err)
                })
            })
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
} )



// router.get('/protected', requireLogin,(req,res)=>{
//     res.send('Hello User, this should be only when user is logged in')
// } )

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email,followers,following,pic} = savedUser
               res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router