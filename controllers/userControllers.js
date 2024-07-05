
import User from './../models/User.js';

async function getUsers(req, res, next) {
    try {
        const allUsers = await User.find()
        res.json({
            response: allUsers
        });
    } catch (error) {

    }
}



export { getUsers }