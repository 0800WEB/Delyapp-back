import Product from "../../models/Product.js";

async function getOne(req, res, next) {
    try {
        let product = await Product.findById(req.params.id).select('-_id  -__v').populate("category", "name -_id")
        if (product) {
            return res.status("200").json({
                success: true,
                product
            });
        }
        return res.status(404).json({
            success: false,
            message: "The product doesn't exists"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal error"
        })
    }
    
}

export default getOne