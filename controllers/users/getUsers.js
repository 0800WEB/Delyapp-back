import User from '../../models/User.js';

async function getOneUser(req, res, next) {
    const { email } = req.query

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
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
}
async function getUsers(req, res, next) {
    try {
        const allUsers = await User.find()
        res.json({
            response: allUsers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
}



export { getUsers, getOneUser }