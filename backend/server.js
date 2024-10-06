const express = require('express');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT;
const host = process.env.HOST;
const app = express();

//définition des middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//définition des dossiers statiques
app.use(express.static(path.join(__dirname, '../client')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));


app.use('/api/user', require('./routes/user.routes'));
app.use('/api/staff', require('./routes/staff.routes'));
app.use('/api/stock', require('./routes/stock.routes'));
app.use('/api/table', require('./routes/table.routes'));
app.use('/api/order', require('./routes/order.routes'));
app.use('/api/basket', require('./routes/basket.routes'));
app.use('/api/booking', require('./routes/booking.routes'));


//lancer le serveur
console.log("Lancement du serveur...");
app.listen(port, host, () => console.log(`Server running on port ${port}`));