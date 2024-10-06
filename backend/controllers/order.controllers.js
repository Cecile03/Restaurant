const Order = require("../models/order")

// Get all orders
exports.getAllOrder = async (req, res, next) => {
    try {
        Order.findAll()
            .then(orders => res.status(200).json(orders))
            .catch(error => res.status(400).json({ error }))
    } catch (error) {
        res.status(400).json({ error });
    }
}


// Get 1 order by id
exports.getOrderById = async (req, res, next) => {
    try {
        Order.findByPk(req.params.id)
            .then(order => res.status(200).json(order.dataValues))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Delete 1 order
exports.deleteOrder = async (req, res, next) => {
    try {
        Order.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "Order deleted !" }))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Add order
exports.addOrder = async (req, res, next) => {
    try {
        // Created order object, who will be add in db
        const order = Order.build({
            ...req.body
        });

        // Save object == add to db
        await order.save()
            .then(() => res.status(200).json({ message: "Order created !" }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Update order
exports.updateOrder = async (req, res, next) => {
    try {
        const order = Order.build({
            ...req.body
        });
        await Order.update(order.dataValues, { where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Objet modifié' }))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}
