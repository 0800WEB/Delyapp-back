import User from '../../models/User.js'
const getMyData = async(req,res)=>{
    console.log(req.user.id)
    try {
        const{id} = req.user
       const me = await User.findOne({_id:id})
       
       return res.json(201, me)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
}
export default getMyData