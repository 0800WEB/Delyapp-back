import User from '../../models/User.js';
async function updateUser(req, res, next) {
    const update = req.body
    const { id } = req.params
    console.log(id);
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: id }, update, { new: true })

        res.json({
            response: updatedUser
        });
    } catch (error) {
        console.log(error);
    }
}



export { updateUser }