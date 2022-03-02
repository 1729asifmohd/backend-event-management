const mongoose =require('mongoose');
const Schema=mongoose.Schema
const Event=require('./events');
const USer=require('./users')

const BookingsSchema=Schema({
    events:{
        type:Schema.Types.ObjectId,
        ref:"Event"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

},{timestamps:true});

module.exports=mongoose.model('Bookings',BookingsSchema);