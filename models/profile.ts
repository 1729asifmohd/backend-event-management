import { Document, Model, model, Schema } from "mongoose";;
import { IEvent } from './events';

export interface IProfile extends Document {
    name: String;
    occupation:String;
    createdEvents:IEvent['_id'];
  }


const ProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true
    },
    creator: [
        {
            type: Schema.Types.ObjectId,
            ref: 'events'
        }
    ]

})


const Profile:Model<IProfile>=model("Profile",ProfileSchema);
export default Profile;
