import { Document, Model, model, Schema } from "mongoose";;
import { IUser} from './users';
import { IEvent } from './events';

export interface IBookings extends Document {
    events: IEvent["_id"];
    user:IUser["_id"];
    createdAt:string;
    updatedAt:string;
  }

const BookingsSchema:Schema= new Schema({
    events:{
        type:Schema.Types.ObjectId,
        ref:"Event"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

},{timestamps:true});


const Booking:Model<IBookings>=model("Booking",BookingsSchema);
export default Booking;
