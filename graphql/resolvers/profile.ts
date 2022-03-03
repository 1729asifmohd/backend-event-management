import { IProfile } from "models/profile";
import Profile from "models/profile";

export default {
    profile: async (args: any): Promise<any> => {

        const profile: IProfile = await Profile.findOne({ _id: args.userId });
        return profile
    },
    createProfile: async (args: any): Promise<any> => {
        const profile: IProfile = new Profile({
            name: args.profileInput.name,
            occupation: args.profileInput.occupation,
            createdEvents: '622090a9607875ab6feb3b34'
        })
        const result: IProfile = await profile.save();
        return result
    }
}