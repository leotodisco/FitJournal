const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const userRouter = require('../controller/userRoutes')

const authRouter = express.Router();

authRouter.post('/signin', async (req, res) => {
    try {
        const {name, surname, email, password, bodyWeight} = req.body;
        
        const newUsr = new User({name, surname, email, password, bodyWeight});
        newUsr.save(newUsr);
        res.status(200).json({ message: 'Utente aggiunto.'});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

authRouter.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user || user.password != password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);
        return res.json({ token });
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = authRouter;