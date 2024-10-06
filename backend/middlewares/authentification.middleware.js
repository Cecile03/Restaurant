const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

module.exports = (req, res, next) => {
    try {
        if(!req.headers.authorization) throw new Error('Missing Authorization Header');
        const token = req.headers.authorization.split(' ')[1];
        if(!token) throw new Error('Missing Token');
        jwt.verify(token, "JUZyYXVkMjFlckFTZmUzNDFPRSU=");
        next();
    } catch (error) {
        const errorObject = errorMappping[error.message] || errorMappping[error.name] || errorMappping['Error'];
        res.status(errorObject.code).json({ 
            message: errorObject.message 
        });
    }
};

const errorMappping = {
    'JsonWebTokenError': {
        code: 401,
        message: 'Invalid Token',
    },
    
    'TokenExpiredError': {
        code: 401,
        message: 'Token Expired',
    },

    'Missing Authorization Header': {
        code: 401,
        message: 'Missing Authorization Header',
    },

    'Error': {
        code: 401,
        message: 'Missing Token',
    },


};