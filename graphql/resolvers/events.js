const Event = require('../../models/events');
const User = require('../../models/users')
const date_util=require('../../helper/date')


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
    events: () => {
        return Event.find()
            .then((result) => {
                return result.map((res) => {

                    return {
                        ...res._doc,
                        id: res.id,
                        creator: user_util.bind(this, res._doc.creator)
                    }
                })
            })
            .catch((err) => {
                throw new Error("not found")
            })
    },
   
    createEvent: (args,req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }
    
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: new Date(args.eventInput.date).toISOString(),
            creator: req.userId
        })
        let createdEvent;
        return event.save()
            .then((result) => {
                console.log("data has been saved");
                createdEvent = { ...result._doc, id: result.id }
                return User.findById(req.userId)
            }).then(result => {
                if (!result) {
                    throw new Error('User Does not Exist')
                }
                result.createdEvents.push(event);
                return result.save()
            }).then(result => {
                return createdEvent
            })
            .catch((err) => {
                throw err
            })
    },
})