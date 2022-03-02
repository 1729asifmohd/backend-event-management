const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Booking{
    _id:ID!
    user:User!
    events:Event
    createdAt:String!
    UpdatedAt:String!
}


type Event{
     id:String!
     title:String!
     price:Float!
     description:String!
     date:String!
     creator:User
   }

type AuthData{
    userId:ID!
    token:String!
    tokenExpiration:Int!
}
type User{
    _id:ID!
    email:String!
    password:String
    createdEvents:[Event!]!
}
input UserInput{
    email:String!
    password:String!
  }

input EventInput{
    title:String!
    description:String!
    price:Float!
    date:String!
}

    type RootQuery{
        events:[Event!]!
        bookings:[Booking!]!
        login(email:String!,password:String!):AuthData!
    }

    type RootMutation{
        createEvent(eventInput:EventInput):Event
        createUser(userInput:UserInput):User
        createBooking(eventId:ID!):Booking!
        cancelBooking(bookingId:ID!):Event!
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`)