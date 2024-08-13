import Category from "../../models/Category";

const create = async(req, res) => {
    let {} = req.body;
    const category = await Category.create({})
}