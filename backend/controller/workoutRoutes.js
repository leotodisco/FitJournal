const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
const User = require('../models/user');

const workoutRouter = express.Router()

workoutRouter.post('/findWorkout', async (req, res) => {
    try{
        const workoutID = req.body.workoutID;
        const workout = await Workout.findById(workoutID);
        if(!workout) {
            console.log("erroe avvenuto infatti workout è null");
            return res.status(401).json({ error: 'Workout not found.' });
        }

        res.status(200).json({ workout: workout });
    } catch(err) {
        console.log(err.message);
        res.status(500).json({ message: err });
    }
})


module.exports = workoutRouter;