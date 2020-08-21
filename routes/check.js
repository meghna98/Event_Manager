const router = require('express').Router();
const {verify} = require('../verify');
const User = require('../models/user.model');
const Event = require('../models/Event.model');

router.get('/',verify,(req,res)=>{
    // console.log('checking...')
    res.send(req.user)
})

router.get('/events',verify,(req,res)=>{
    Event.findOne({userId:req.user._id})
    .then(result=>{
        if(!result)
            res.send('0')
        res.send(result.eventDetails)
    })
    .catch(err=>res.send('0'))
})

router.post('/events/add',verify,(req,res)=>{
    Event.findOne({userId:req.user._id})
    .then(result=>{
        if(!result){
            // console.log('came to if')
            const {title,desc,date} = req.body
            const eventDetails = [
                {title,desc,date}
            ]
            const userId = req.user._id
            const newEvent = new Event({userId,eventDetails})
            newEvent.save()
            .then(()=>res.send('1'))
            .catch((err)=>{
                // console.log(err)
                res.send('0')})
        }
        else{
            // console.log('came to else',result.eventDetails)
            result.eventDetails.push({title:req.body.title,desc:req.body.desc,date:req.body.date})
            result.save()
            .then(()=>res.send('1'))
            .catch((err)=>{
                // console.log(err)
                res.send('0')
            })
        }
    })
    .catch(err=>{
        // console.log(err)
        res.send('0')
    })
})

router.post('/events/delete',verify,(req,res)=>{
    Event.findOne({userId:req.user._id})
    .then(result=>{
        if(!result)
            res.send('0')
        else{
            let updatedList = result.eventDetails.filter(item=>
                // console.log('item = ',item)
                item._id==req.body.id
                // return item
            
                )
            result.eventDetails = updatedList
            result.save()
            .then(resp=>{
                // console.log('delete result = ',resp)
                res.send('1')
            })
            .catch(err=>{
                // console.log(err)
                res.send('0')
            })
        }
    })
    .catch(err=>{
        // console.log(err)
        res.send('0')
    })
})

module.exports = router;