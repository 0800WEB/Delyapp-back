import User from '../../models/User.js';
async function createUser(req, res, next) {
    const {
        email,
        password,
        photo,
        role
    } = req.body

    try {
        const newUser = await User.create({
            email,
            password,
            photo,
            role
        })
        res.json({
            response: newUser
        });
    } catch (error) {
        console.log(error)
    }
}



export { createUser }