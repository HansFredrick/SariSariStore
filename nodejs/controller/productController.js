const getPendingOrders = async (request, response) => {
    const db = request.db;
    const { boothId } = request.params;

    try {
        const [rows] = await db.query(
            "SELECT o.OrderID AS 'OrderId', GROUP_CONCAT(c.Name ORDER BY c.Name) AS 'ProductName', GROUP_CONCAT(p.Quantity ORDER BY c.Name) AS 'Quantity', o.Price AS 'TotalPrice', o.Status AS 'Status', CONCAT(u.FirstName, ' ', u.LastName) AS 'CustomerName' FROM `order` o JOIN `order_products` p ON o.OrderID = p.OrderID JOIN `product` c ON p.ProductID = c.ProductID JOIN `customer` x ON o.customerID = x.CustomerID JOIN `users` u ON x.UserID = u.UserID WHERE o.Status = 'Pending' AND o.BoothID = ? GROUP BY o.OrderID, u.FirstName, u.LastName ORDER BY o.OrderID ASC", 
            [boothId]
        );

        response.json(rows);
    } catch (error) {
        console.error('Error fetching pending orders:', error);
        response.status(500).send('Failed to fetch pending orders');
    }
};
/*
export statement
*/
export { 
    getPendingOrders,
    getCompletedOrders,
    createOrder,
    addToOrder,
    cancelOrder,
    completeOrder, 
    checkReservedOrder,
    removeItemFromOrder,
    alterOrder  
    };