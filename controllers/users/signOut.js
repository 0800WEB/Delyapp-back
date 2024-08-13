import User from '../../models/User.js'
const signOut =  async (req, res, next) => {
    const {email} = req.user
    try{
        await User.findOneAndUpdate(
            {email},
            {is_online: false},
            {new: true}
        )
        return res.status(200).send('offline user!')
    }catch(error){
        next(error);
    }
}

export default signOut;