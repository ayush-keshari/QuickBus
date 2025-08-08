

const express = require('express');
const path = require('path'); 
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://quick-bus-qh71.vercel.app',
    'https://quick-bus-qh71-git-main-ayush-kesharis-projects-cdd5aac1.vercel.app',
    'https://quick-bus-qh71-krv24rmhw-ayush-kesharis-projects-cdd5aac1.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// ✅ CORS: Allow local & deployed frontend
// app.use(cors({
//     origin: ['http://localhost:3000', 'https://your-frontend-url.vercel.app'], 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));

// ✅ Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Passport Auth Setup
require('./auth/auth');

// ✅ MongoDB Connection
const DB_URL = require('./config/keys').MongoURI;
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => { throw err });

// ✅ Routes
const login = require('./routes/login');
const registerRouter = require('./routes/register');
const loggedInPage = require('./routes/loggedInUser');
const bookingRoute = require('./routes/routeSelection');

// ✅ Mount routes
app.use('/', login);
app.use('/register', registerRouter);

// 👇 Change from '/booking' to '/api' so /api/routes works
app.use('/api', bookingRoute);

app.use('/user', passport.authenticate('jwt', { session: false }), loggedInPage);

// ✅ Test route
const Bus = require('./models/Buses');
app.get('/test-insert', async (req, res) => {
    try {
        const newBus = new Bus({
            companyName: 'Volvo',
            busType: 'AC Sleeper',
            busNumber: 'DL-09-1234',
            startCity: 'Delhi',
            destination: 'Mumbai',
            totalSeats: '40',
            availableSeats: '40',
            pricePerSeat: '1200'
        });
        await newBus.save();
        res.json({ success: true, message: 'Bus inserted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Export for Vercel serverless
module.exports = app;
