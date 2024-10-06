const Table = require("../models/table")

// Get all tables
exports.getAllTable = async (req, res, next) => {
    try {
        Table.findAll()
            .then(tables => res.status(200).json(tables))
            .catch(error => res.status(400).json({ error }))
    } catch (error) {
        res.status(400).json({ error });
    }
}


// Get 1 table by id
exports.getTableById = async (req, res, next) => {
    try {
        Table.findByPk(req.params.id)
            .then(table => res.status(200).json(table.dataValues))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Delete 1 table
exports.deleteTable = async (req, res, next) => {
    try {
        Table.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "Table deleted !" }))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Add table
exports.addTable = async (req, res, next) => {
    try {
        // Created table object, who will be add in db
        const table = Table.build({
            ...req.body
        });

        // Save object == add to db
        await table.save()
            .then(() => res.status(200).json({ message: "Table created !" }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Update table
exports.updateTable = async (req, res, next) => {
    try {
        const table = Table.build({
            ...req.body
        });
        await Table.update(table.dataValues, { where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Objet modifié' }))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}
