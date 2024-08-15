const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    creationDate: {
        type: Date,
        default: Date.now
    },
    days:[{
        day:{
            type: Number,
            required: true
        },
        exercises: [{
            name: {
                type: String,
                required: true
            },
            sets: {
                type: Number,
                required: true
            },
            reps: {
                type: Number,
                required: true
            },
            weight: {
                type: Number, 
                required: false // false perchè potrebbe essere a corpo libero
            }
        }]
}]
})


const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;