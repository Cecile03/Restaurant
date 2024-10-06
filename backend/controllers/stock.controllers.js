const Stock = require("../models/stock")

// Get all stocks
exports.getAllStock = async (req, res, next) => {
    try {
        Stock.findAll()
            .then(stocks => res.status(200).json(stocks))
            .catch(error => res.status(400).json({ error }))
    } catch (error) {
        res.status(400).json({ error });
    }
}


// Get 1 stock by id
exports.getStockById = async (req, res, next) => {
    try {
        Stock.findByPk(req.params.id)
            .then(stock => res.status(200).json(stock.dataValues))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Delete 1 stock
exports.deleteStock = async (req, res, next) => {
    try {
        Stock.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "Stock deleted !" }))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Add stock
exports.addStock = async (req, res, next) => {
    try {
        // Created stock object, who will be add in db
        const stock = Stock.build({
            ...req.body
        });

        // Save object == add to db
        await stock.save()
            .then(() => res.status(200).json({ message: "Stock created !" }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Update stock
exports.updateStock = async (req, res, next) => {
    try {
        const stock = Stock.build({
            ...req.body
        });
        await Stock.update(stock.dataValues, { where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Objet modifié' }))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}
