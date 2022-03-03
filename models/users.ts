import { Document, Model, model, Schema } from "mongoose";;
import { IEvent } from './events';

export interface IUser extends Document {
    email: string;
    password:string;
    createdEvents:[IEvent['_id']]
  }


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'event'
        }
    ]

})


const User:Model<IUser>=model("User",UserSchema);
export default User
