import { date_util } from "../../helper/date";
import User, { IUser } from "../../models/users";
import Event, { IEvent }  from "../../models/events";

const event_util = (eventIds:any):any => {
    return Event.find({ _id: { $in: eventIds } })
        .then((result:any):any => {
            return result.map((res:any):any => {

                return {
                    ...res,
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
const user_util = (userId:any):any => {
    return User.findById(userId).then((res) => {
        return {
            ...res,
            id: res.id,
            createdEvents: event_util.bind(this, res.createdEvents)
        }
    }).catch(err => {
        throw err
    })
}

export default {
    events: () => {
        return Event.find()
            .then((result) => {
                return result.map((res) => {

                    return {
                        ...res,
                        id: res.id,
                        creator: user_util.bind(this, res.creator)
                    }
                })
            })
            .catch((err) => {
                throw new Error("not found")
            })
    },
   
    createEvent: (args:any,req:any):any => {
        // if(!req.isAuth){
        //     throw new Error('Unauthenticated')
        // }
        console.log(args);
    
        const event:IEvent = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: new Date(args.eventInput.date).toISOString(),
            creator: "6217e8376028005e726650f3"
        })
        let createdEvent:any;
        return event.save()
            .then((result:IEvent):any => {
                console.log("data has been saved");
                createdEvent = { ...result, id: result.id }
                return User.findById("6217e8376028005e726650f3")
            }).then((result:any):any => {
                if (!result) {
                    throw new Error('User Does not Exist')
                }
                result.createdEvents.push(event);
                return result.save()
            }).then((result:any):any => {
                return createdEvent
            })
            .catch((err) => {
                throw err
            })
    },
}