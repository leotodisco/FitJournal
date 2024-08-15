const express = require('express');
const Workout = require('../models/workout');
const User = require('../models/user');

const userRouter = express.Router();

userRouter.post('/addWorkout', async (req, res) => {
    try {
        const {days, userID} = req.body;
    
        if (!Array.isArray(days)) {
            return res.status(400).json({ error: 'Send a valid request.' });
        }

        let user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const workout = new Workout({
            days
        })
        const newWorkout = await workout.save();

        const oldWorkout = user.currentWorkoutPlan
        if (oldWorkout) {
            user.oldWorkoutPlans.push(oldWorkout);
        }
        
        user.currentWorkoutPlan = newWorkout._id;
        await user.save();
        res.status(200).json({ message: 'Workout updated successfully.', workout: newWorkout });
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});


module.exports = userRouter;