import { buildSchema } from 'graphql';

export default buildSchema(`

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

type Profile{
    _id:ID!
    name:String!
    occupation:String!
    createdEvents:[Event!]
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

input ProfileInput{
    name:String!
    occupation:String!
    createdEvents:ID!
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
        getprofile(userId:ID!):Profile!
    }

    type RootMutation{
        createEvent(eventInput:EventInput):Event
        createUser(userInput:UserInput):User
        createBooking(eventId:ID!):Booking!
        cancelBooking(bookingId:ID!):Event!
        createProfile(profileInput:ProfileInput):Profile!
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }

`)