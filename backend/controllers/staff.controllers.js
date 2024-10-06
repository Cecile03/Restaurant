const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

const Staff = require('../models/staff')        // Model of DB
const saltRounds = 10;

// Get all staffs
exports.getAllStaff = async (req, res, next) => {
    try {
        Staff.findAll()
            .then(staffs => {
                // Map the staffs array and exclude the 'password' attribute from each object
                const modifiedStaffs = staffs.map(staff => {
                    const { password, ...staffWithoutPassword } = staff.toJSON();
                    return staffWithoutPassword;
                });

                // Send the modified array in the response
                res.status(200).json(modifiedStaffs);
            })
            .catch(error => res.status(400).json({ error }))
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Get 1 staff by id
exports.getStaffById = async (req, res, next) => {
    try {
        Staff.findByPk(req.params.id)
            .then(staff => res.status(200).json(staff.dataValues))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Delete 1 staff
exports.deleteStaff = async (req, res, next) => {
    try {
        Staff.destroy({ where: { idStaff: req.params.id } })
            .then(() => res.status(200).json({ message: "Staff deleted !" }))
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Add staff
exports.addStaff = async (req, res, next) => {
    try {
        // Created staff object, who will be add in db
        const staff = Staff.build({
            ...req.body
        });

        // Hash password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        staff.password = hash       // Set new password hashed

        // Save object == add to db
        await staff.save()
            .then(() => res.status(200).json({ message: "Staff created !" }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Update staff
exports.updateStaff = async (req, res, next) => {
    try {
        if (req.body.password) {    // If staff change password
            const staff = Staff.build({
                ...req.body
            });

            // Hash password 
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);
            staff.password = hash       // Set new password hashed

            // Update staff infos
            Staff.update(staff.dataValues, { where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Mot de passe staff modifié' }))
                .catch(error => res.status(404).json({ error }));
        } else {
            const staff = Staff.build({
                ...req.body
            });

            console.log(req.body)
            console.log(staff.dataValues)
            
            await Staff.update(req.body, { where: { idStaff: req.params.id } })
                .then(() => res.status(200).json({ message: 'Staff modifié' }))
                .catch(error => res.status(404).json({ error }));
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Login function
exports.login = async (req, res, next) => {
    try {
        Staff.findAll()                             // Get all users
            .then(staffs => {
                staffs.forEach((user) => {           // For each users
                    if (user.dataValues.staffName == req.body.staffName) {
                        const hash = user.dataValues.password;
                        const password = req.body.password;

                        bcrypt.compare(password, hash).then(async valid => {
                            if (!valid) {                   // User existe mais mauvais password
                                res.status(401).json({ message: 'Mot de passe ou utilisateur incorrecte' })
                            } else {
                                const token = getJWT(user.dataValues);

                                res.status(200).json({
                                    token: token,
                                    staffname: user.dataValues.staffName,
                                    role: user.dataValues.role,   // Send role in english
                                    id: user.dataValues.idStaff
                                });
                            }
                        })
                    }
                })

            })
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Set JW Token
const getJWT = (staff) => {
    const payload = {
        id: staff.idStaff,
        username: staff.staffname,
        role: staff.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });
};
