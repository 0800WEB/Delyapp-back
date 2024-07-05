import User from '../../models/User.js';
async function deleteUser(req, res, next) {
    const { id } = req.params
    
    try {
        const deletedUser = await User.findOneAndDelete({
            _id: id
        })
        res.json({
            response: deletedUser
        });
    } catch (error) {

    }
}



export { deleteUser }