import Order from "../../models/Order.js";

const getAllOrders = async (req, res) => {
    const { status, month, year, page = 1, limit } = req.query;

    try {
        let query = {};

        if (status) {
            query.status = status;
        }

        if (month && year) {
            const monthNum = parseInt(month, 10);
            const yearNum = parseInt(year, 10);

            if (!isNaN(monthNum) && !isNaN(yearNum) && monthNum >= 1 && monthNum <= 12) {
                const startOfMonth = new Date(yearNum, monthNum - 1, 1);
                const endOfMonth = new Date(yearNum, monthNum, 0, 23, 59, 59, 999);

                query.createdAt = {
                    $gte: startOfMonth,
                    $lt: endOfMonth
                };
            } else {
                return res.status(400).json({ success: false, message: 'Mes y año deben ser números válidos.' });
            }
        }

        const paginationLimit = limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
        const currentPage = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
        const skip = (currentPage - 1) * paginationLimit;
        const orders = await Order.find(query)
            .skip(skip)
            .limit(paginationLimit);

        const totalOrders = await Order.countDocuments(query);

        res.status(200).json({
            success: true,
            orders,
            totalOrders,
            currentPage,
            totalPages: Math.ceil(totalOrders / paginationLimit),
            limit: paginationLimit,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
};

export default getAllOrders;
