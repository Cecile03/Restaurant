const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

const User = require("../models/user"); // Model of DB

const saltRounds = 10;

// Get all users
exports.getAllUser = async (req, res, next) => {
  try {
    User.findAll()
      .then((users) => res.status(200).json(users))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Get 1 user by id
exports.getUserById = async (req, res, next) => {
  try {
    User.findByPk(req.params.id)
      .then((user) => res.status(200).json(user.dataValues))
      .catch((error) => res.status(404).json({ error }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Delete 1 user
exports.deleteUser = async (req, res, next) => {
  try {
    User.destroy({ where: { idUser: req.params.id } })
      .then(() => res.status(200).json({ message: "User deleted !" }))
      .catch((error) => res.status(404).json({ error }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Add user
exports.addUser = async (req, res, next) => {
  try {
    // Created user object, who will be add in db
    const user = User.build({
      ...req.body,
    });

    // Hash password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    user.password = hash; // Set new password hashed

    // Save object == add to db
    await user
      .save()
      .then(() => res.status(200).json({ message: "User created !" }))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      // If user change password
      const user = User.build({
        ...req.body,
      });

      // Hash password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.password, salt);
      user.password = hash; // Set new password hashed

      // Update user infos
      User.update(user.dataValues, { where: { idUser: req.params.id } })
        .then(() => res.status(200).json({ message: "User modifié" }))
        .catch((error) => res.status(404).json({ error }));
    } else {
      const user = User.build({
        ...req.body,
      });
      await User.update(user.dataValues, { where: { idUser: req.params.id } })
        .then(() => res.status(200).json({ message: "Objet modifié" }))
        .catch((error) => res.status(404).json({ error }));
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Login function
exports.login = async (req, res, next) => {
  try {
    User.findAll() // Get all users
      .then((users) => {
        users.forEach((user) => {
          // For each users
          console.log(req.body);
          if (user.dataValues.email == req.body.email) {
            const hash = user.dataValues.password;
            const password = req.body.password;

            bcrypt.compare(password, hash).then(async (valid) => {
              if (!valid) {
                // User existe mais mauvais password
                res
                  .status(401)
                  .json({ message: "Mot de passe ou utilisateur incorrecte" });
              } else {
                const token = getJWT(user.dataValues);

                res.status(200).json({
                  token: token,
                  username: user.dataValues.username,
                  idUser: user.dataValues.idUser,
                  email: user.dataValues.email,
                });
              }
            });
          }
        });
      })
      .catch((error) => res.status(404).json({ error }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getJWT = (user) => {
  const payload = {
    id: user.idUser,
    username: user.username,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: `4h` });
};
