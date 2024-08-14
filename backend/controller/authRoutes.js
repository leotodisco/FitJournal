const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const bcrypt = require('bcrypt')
const userRouter = require('../controller/userRoutes')
const saltRounds = 10;
const authRouter = express.Router();

authRouter.post('/signin', async (req, res) => {
    try {
        const { name, surname, email, password, bodyWeight } = req.body;

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                return res.status(500).json({ error: 'Errore durante l\'hashing della password.' });
            }

            const newUsr = new User({
                name,
                surname,
                email,
                password: hash,  
                bodyWeight
            });

            await newUsr.save();

            res.status(200).json({ message: 'Utente aggiunto.' });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

authRouter.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);
        return res.json({ token: token, user: {
            "name": user.name,
            "surname": user.surname,
            "id": user._id,
            "email": user.email,
            "weight": user.bodyWeight,
        } });
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = authRouter;