import Product from '../../models/Product.js';

const read = async (req, res) => {
    try {
        const { sort, name, priceOrder, category, page = 4, limit = 8 } = req.query;

        let queries = {};
        let sortOptions = {};
        let pagination = {
            limit: parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 8,
        };

        if (sort) sortOptions[sort] = 1; // Sort by the specified field in ascending order
        if (name) queries.name = new RegExp(name, 'i');
        if (priceOrder) {
            sortOptions.price = priceOrder === 'asc' ? 1 : -1; // Sort by price in ascending or descending order
        }
        if (category) queries.category = { $in: category.split(',') };

        // Pagination using page and limit
        
        const products = await Product.find(queries)
            .sort(sortOptions)
            .limit(pagination.limit)

        // Total count of products matching the query (optional)
        const totalProducts = await Product.countDocuments(queries);

        res.status(200).json({
            success: true,
            products,
            totalProducts,
            limit: pagination.limit,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

export default read;
