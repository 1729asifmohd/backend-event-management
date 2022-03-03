import User from '../../models/users';
import * as bcrypt from 'bcrypt';
import  * as jwt  from 'jsonwebtoken';


export default {
    createUser: async (args:any):Promise<any> => {
        const user = await User.findOne({ email: args.userInput.email });
        console.log(user);
        if (user) {
            throw new Error("User Exist")
        }
        return bcrypt.hash(args.userInput.password, 12).then((hashedpassword:any):any => {
            const user = new User({
                email: args.userInput.email,
                password: hashedpassword
            })
            return user.save()
        }).then((result:any):any => {
            console.log(result)
            return { ...result._doc, password: null, id: result.id }
        }).catch((err:Error):any => {
            throw err;
        })
    },
    login: async ({ email, password }:{email:string,password:string}):Promise<any> => {

        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("User does not exist")
        }
        const cmp = await bcrypt.compare(password,user.password);
        if (!cmp) {
            throw new Error('Incorrect Username or password');
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, 'supersecretkey', {
            expiresIn: '1d'
        })
        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        }
    }
}