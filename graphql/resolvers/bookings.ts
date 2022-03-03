import Event, { IEvent } from '../../models/events';
import User from '../../models/users';
import Booking, { IBookings } from '../../models/bookings';

const event_booking=async (eventId:any):Promise<any>=>{
    console.log(eventId);
    const event= await Event.findById(eventId);
    console.log(event)
    return {
        ...event,
        _id:event.id,
        creator:user_util.bind(this,event.creator)
    } 
}

const event_util =(eventIds:any):any=> {
    return Event.find({ _id: { $in: eventIds } })
        .then((result:any):any => {
            return result.map((res:any):any => {

                return {
                    ...res._doc,
                    id: res.id,
                    creator: user_util.bind(this, res.creator)
                }
            })
        })
        .catch((err:Error):any => {
            throw new Error("not found")
        })
}

//adding user_util
const user_util = (userId:any):any => {
    return User.findById(userId).then((res:any) => {
        return {
            ...res._doc,
            id: res.id,
            createdEvents: event_util.bind(this, res._doc.createdEvents)
        }
    }).catch((err:Error):any => {
        throw err
    })
}


export default {
    
    bookings:async (args:any,req:any):Promise<any>=>{
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
        try{
            const bookings=await Booking.find();

            return bookings.map((booking:any):any=>{
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
   
    createBooking: async (args:any,req:any):Promise<any> => {
        // if(!req.isAuth){
        //     throw new Error('Unauthenticated')
        // }
        try {
            const fetchedEvent:IEvent=await Event.findOne({_id:args.eventId});
            console.log(fetchedEvent); 
            
            const booking:IBookings = new Booking({
                user: req.userId,
                events: fetchedEvent,
                // createdAt: new Date().toISOString(),
                // UpdatedAt: new Date().toISOString()
            })
            const result:IBookings=await booking.save();
            return result
        }
        catch (err) {
            throw err;
        }
    },
    cancelBooking:async (args:any,req:any):Promise<any>=>{
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


}