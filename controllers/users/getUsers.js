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
async function getCustomer(req, res) {
    try {
    let user = await User.findById(req.params.id);        
    res.json(200,{
        response:user
    })
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

async function getTotalCustomers(req, res, next) {
    try {
        // Usamos countDocuments para contar el número de documentos donde "role" es igual a 0
        const totalCustomers = await User.countDocuments({ role: 0 });
        res.json(totalCustomers);
    } catch (error) {
        // Manejo de errores
        next(error); // Pasamos el error al middleware de manejo de errores
    }
}


export { getUsers, getOneUser, getTotalCustomers, getCustomer}