import Product from '../../models/Product.js';

const read = async (req, res) => {
    try {
        const { sort, name, priceOrder, category, page = 1, limit } = req.query;

        // Validar y establecer el límite (limit) de resultados por página
        const paginationLimit = limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 8;

        let queries = {};
        let sortOptions = {};

        // Validar y convertir page a entero    
        const currentPage = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;

        if (sort) sortOptions[sort] = 1; // Ordenar por el campo especificado en orden ascendente
        if (name) queries.name = new RegExp(name, 'i'); // Búsqueda case-insensitive por nombre
        if (priceOrder) {
            sortOptions.price = priceOrder === 'asc' ? 1 : -1; // Ordenar por precio ascendente o descendente
        }
        if (category) queries.category = { $in: category.split(',') }; // Filtrar por categorías

        // Calcular el número de documentos a omitir para la paginación
        const skip = (currentPage - 1) * paginationLimit;

        // Obtener productos con paginación, filtro y ordenación
        const products = await Product.find(queries)
            .sort(sortOptions)
            /* .skip(skip)
            .limit(paginationLimit); */

        // Contar el total de productos que coinciden con la consulta (opcional)
        const totalProducts = await Product.countDocuments(queries);

        res.status(200).json({
            success: true,
            products,
            totalProducts,
            currentPage,
            totalPages: Math.ceil(totalProducts / paginationLimit),
            limit: paginationLimit,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message, // Incluyendo el mensaje de error para mayor detalle
        });
    }
};

export default read;
