import { Document, Model, model, Schema } from "mongoose";;
import { IUser} from './users';



export interface IEvent extends Document{
    title:String,
    description:String,
    price:Number,
    date:Date,
    creator:IUser["_id"]
}

const EventSchema:Schema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});



const Event:Model<IEvent>=model("Event",EventSchema);
export default Event;
