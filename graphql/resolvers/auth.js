const User = require('../../models/users')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

module.exports=({
   
    createUser: async (args) => {
        const user = await User.findOne({ email: args.userInput.email });
        console.log(user);
        if (user) {
            throw new Error("User Exist")
        }
        return bcrypt.hash(args.userInput.password, 12).then(hashedpassword => {
            const user = new User({
                email: args.userInput.email,
                password: hashedpassword
            })
            return user.save()
        }).then(result => {
            console.log(result)
            return { ...result._doc, password: null, id: result.id }
        }).catch(err => {
            throw err;
        })
    },
    login:async ({email,password})=>{
        
        const user=await User.findOne({email:email});
        if(!user){
            throw new Error("User does not exist")
        }
        const cmp=await bcrypt.compare(password,user.password);
        if(!cmp){
            throw new Error('Incorrect Username or password');
        }
        const token= jwt.sign({userId:user.id,email:user.email},'supersecretkey',{
            expiresIn:'1d'
        })
        return{
            userId:user.id,
            token:token,
            tokenExpiration:1
        }
    }
})