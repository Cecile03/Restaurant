const Booking = require("../models/booking")

// Get all bookings
exports.getAllBooking = async (req, res, next) => {
    try {
        Booking.findAll()
            .then(bookings => res.status(200).json(bookings))
            .catch(error => res.status(400).json({ error }))
    } catch (error) {
        res.status(400).json({ error });
    }
}


// Get 1 booking by id
exports.getBookingById = async (req, res, next) => {
    try {
        Booking.findByPk(req.params.id)
            .then(booking => res.status(200).json(booking.dataValues))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Delete 1 booking
exports.deleteBooking = async (req, res, next) => {
    try {
        Booking.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "Booking deleted !" }))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Add booking
exports.addBooking = async (req, res, next) => {
    try {
        console.log('req.body', req.body);
        const booking = Booking.build({
            ...req.body
        });

        // Vérifier s'il existe déjà un booking avec la même date et la même table
        const existingBooking = await Booking.findOne({
            where: {
                idTable: req.body.idTable,
                date: req.body.date,
            },
        });

        if(existingBooking) {
            console.log('Booking already exists !');
            res.status(400).json({ message: "Booking already exists !" });
            return;
        }

        // Save object == add to db
        booking.save()
            .then(() => res.status(200).json({ message: "Booking created !" }))
            .catch(error => res.status(400).json({ error: 'erreur while creating booking : '+error }));
    } catch (error) {
        res.status(400).json({ error: 'erreur: '+error });
        return;
    }
}

// Update booking
exports.updateBooking = async (req, res, next) => {
    try {
        const booking = Booking.build({
            ...req.body
        });
        await Booking.update(booking.dataValues, { where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Objet modifié' }))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}
