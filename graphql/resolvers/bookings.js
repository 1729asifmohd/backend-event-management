const Event = require('../../models/events');
const User = require('../../models/users')
const Booking= require('../../models/bookings');


const event_booking=async (eventId)=>{
    console.log(eventId);
    const event= await Event.findById(eventId);
    console.log(event)
    return {
        ...event._doc,
        _id:event.id,
        creator:user_util.bind(this,event.creator)
    } 
}

const event_util = eventIds => {
    return Event.find({ _id: { $in: eventIds } })
        .then((result) => {
            return result.map((res) => {

                return {
                    ...res._doc,
                    id: res.id,
                    creator: user_util.bind(this, res.creator)
                }
            })
        })
        .catch((err) => {
            throw new Error("not found")
        })
}

//adding user_util
const user_util = userId => {
    return User.findById(userId).then((res) => {
        return {
            ...res._doc,
            id: res.id,
            createdEvents: event_util.bind(this, res._doc.createdEvents)
        }
    }).catch(err => {
        throw err
    })
}


module.exports=({
    
    bookings:async (args,req)=>{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        try{
            const bookings=await Booking.find();

            return bookings.map(booking=>{
                return {
                    ...booking._doc,
                    id:booking.id,
                    user:user_util.bind(this,booking._doc.user),
                    events:event_booking.bind(this,booking._doc.events),
                    createdAt:new Date(booking._doc.createdAt).toISOString(),
                    updatedAt:new Date(booking._doc.createdAt).toISOString()
                }
            })
        }catch(err){
            throw err
        }
    },
   
    createBooking: async (args,req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        try {
            const fetchedEvent=await Event.findOne({_id:args.eventId});
            console.log(fetchedEvent); 
            
            const booking = new Booking({
                user: req.userId,
                events: fetchedEvent,
                // createdAt: new Date().toISOString(),
                // UpdatedAt: new Date().toISOString()
            })
            const result=await booking.save();
            return {
                ...result._doc,
                id:result.id,
                user:user_util.bind(this,result._doc.user),
                events:event_booking.bind(this,result._doc.events),
                createdAt:new Date(result._doc.createdAt).toISOString(),
                updatedAt:new Date(result._doc.createdAt).toISOString()

            };
        }
        catch (err) {
            throw err;
        }
    },
    cancelBooking:async (args,req)=>{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        try{
            const booking_event=await Booking.findById({_id:args.bookingId}).populate('events')
            const event=booking_event.events
            console.log(event)
            await Booking.deleteOne({_id:args.bookingId})
            return {
                ...event._doc,
                _id:event.id,
                creator:user_util.bind(this,event._doc.creator)
            }
        }catch(err){
            throw err
        }
    }


})