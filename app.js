const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const {MONGOURI}  = require('./config/keys')
var cors = require('cors')
// app.use(customMiddleware)


// app.get('/about', customMiddleware,(req,res)=>{
//     console.log('About Page')
//     res.send('This is the About page')
// } )

app.use(cors())

//Conencting to mongo
mongoose.connect(MONGOURI,{ useUnifiedTopology: true,useNewUrlParser: true } );

mongoose.connection.on('connected',()=>{
    console.log('connected')
})
mongoose.connection.on('error',(err)=>{
    console.log('error', err )
})



require('./models/User') //User here is the file name
require('./models/Post')
//Middlewares

// parse  as JSON
app.use(bodyParser.json())
app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV =="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT,()=>{
    console.log('Server running on port 5000')
})