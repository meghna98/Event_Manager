const mongoose = require('mongoose');
const schema = mongoose.Schema;

const eventSchema = new schema (
    {
        userId:{type:mongoose.Schema.Types.ObjectId,required:true},
        eventDetails:[{title:{type:String,required:true},desc:{type:String,required:true},date:{type:String}}]
    }
) 

const Event = mongoose.model('Event',eventSchema);

module.exports = Event;