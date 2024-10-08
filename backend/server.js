const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./controller/authRoutes')
const authMiddleware = require('./controller/authMiddleware');
const userRouter = require('./controller/userRoutes')
const workoutRouter = require('./controller/workoutRoutes')

// config
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json())

const port = 3011;
const dbUrl = 'mongodb://localhost/fit_journal';

app.use('/auth', authRouter);

// tutte le route da qui in poi hanno il middleware implicitamente
app.use(authMiddleware);
app.use('/utente', authMiddleware, userRouter);
app.use('/workout', authMiddleware, workoutRouter);

mongoose.connect(dbUrl)
    .then(() => console.log('Connessione al db avvenuta con successo'))
    .catch((error) => console.log('Errore durante la connessione al db'));

    
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
 });