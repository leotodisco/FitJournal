const express = require('express');
const jwt = require('jsonwebtoken');


const authMiddleware = express.Router();

const authenticateToken = async (request, response, next) => {
    try {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token == undefined || token == null) {
            response.status(500).json({error: "Invalid token"});
        }
        const user = jwt.verify(token, process.env.SECRET_KEY);
        request.user = user;
        next();
    } catch (error) {
        console.log("Invalid token...")
        response.status(500).json({error: "Invalid token"});
    }
};

authMiddleware.use(authenticateToken)

module.exports = authMiddleware;