const Basket = require("../models/basket")

// Get all baskets
exports.getAllBasket = async (req, res, next) => {
    try {
        Basket.findAll()
            .then(baskets => res.status(200).json(baskets))
            .catch(error => res.status(400).json({ error }))
    } catch (error) {
        res.status(400).json({ error });
    }
}


// Get 1 basket by id
exports.getBasketById = async (req, res, next) => {
    try {
        Basket.findByPk(req.params.id)
            .then(basket => res.status(200).json(basket.dataValues))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Delete 1 basket
exports.deleteBasket = async (req, res, next) => {
    try {
        Basket.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "Basket deleted !" }))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Add basket
exports.addBasket = async (req, res, next) => {
    try {
        // Created basket object, who will be add in db
        const basket = Basket.build({
            ...req.body
        });

        // Save object == add to db
        await basket.save()
            .then(() => res.status(200).json({ message: "Basket created !" }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Update basket
exports.updateBasket = async (req, res, next) => {
    try {
        const basket = Basket.build({
            ...req.body
        });
        await Basket.update(basket.dataValues, { where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Objet modifié' }))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}
