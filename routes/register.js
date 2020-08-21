const route = require('express').Router()
const joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

route.post('/',async(req,res)=>{
    // console.log(req.body)
    const schema = joi.object({
        name: joi.string().max(20).required(),
        email:joi.string().email().max(60).required(),
        password:joi.string().max(20).min(6).required()
    })

    const {error} = schema.validate({name:req.body.name,email:req.body.email,password:req.body.password})
    if(error){
        // console.log('ERror IN JOI VAL = ',error)
       res.send(error.details[0].message)
    }
    else{
        const result = await User.findOne({email:req.body.email})

        if(result)
            res.send('This email already exists')
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        const {name,email} = req.body
        const password = hashPassword
        const newUser = new User({name,email,password})
        newUser.save()
        .then(()=>res.send('1'))
        .catch(err=>{res.send(err.message)})

    } 
})

module.exports = route