
import User from '../../models/User.js';

async function getOneUser(req, res, next) {
    const { email } = req.query
    console.log(req.query)
    let queries = {}
    if (!!email) {

        queries.email = email
    }

    try {
        const allUsers = await User.find(queries)
        res.json({
            response: allUsers
        });
    } catch (error) {

    }
}
async function getUsers(req, res, next) {
    try {
        const allUsers = await User.find()
        res.json({
            response: allUsers
        });
    } catch (error) {

    }
}



export { getUsers, getOneUser }