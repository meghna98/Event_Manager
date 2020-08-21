const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 5000;

const path = require('path');

app.use(cors())
app.use(express.json())

const corsOptions = {
    exposedHeaders:'auth_token'
}

app.use(cors(corsOptions))


app.use('/register',require('./routes/register'));
app.use('/login',require('./routes/login'));
app.use('/check',require('./routes/check'));

const uri = process.env.ATLAS_URI
mongoose.connect(process.env.MONGODB_URI||uri,
    {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true
    })

const connection = mongoose.connection
connection.once('open',()=>console.log("Connected to MongoDB..."))


//Step-2
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}



app.listen(PORT,()=>console.log(`Listening on port ${PORT}...`));