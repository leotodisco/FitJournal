const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,  
    },
    password: {
        type: String,
        required: true
    },
    bodyWeight: {
        type: Number,
        required: false
    },
    currentWorkoutPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        required: false,
    },
    oldWorkoutPlans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        required: false,
    }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;