const route = require('express').Router()
const joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

route.post('/',async (req,res)=>{
    // console.log(req.body)
    const schema = joi.object({
        email:joi.string().email().required(),
        password:joi.string().max(20).required()
    })
    const {error} = schema.validate({email:req.body.email,password:req.body.password})
    if(error){
        res.send(error.details[0].message)
    }
    // console.log(error)
    
    const result = await User.findOne({email:req.body.email})
    if(!result)
        res.send('This email does not exist')
    
    const validate = await bcrypt.compare(req.body.password,result.password)
    if(!validate)
        res.send('Password or Email is incorrect')
    // console.log(result)
    const token = await jwt.sign({_id:result._id},process.env.SECRET_TOKEN)
    // console.log('server side jwt = ',token)
    res.header('auth_token',token).send('1') 
})

module.exports = route