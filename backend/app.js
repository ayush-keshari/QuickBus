var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
const cors = require('cors')


var app = express();
const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Allow frontend from localhost:3000 during development
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ... your routes



// Login and Register 
require('./auth/auth');
const login = require('./routes/login')
const loggedInPage = require('./routes/loggedInUser');
// ----------------------------------------------------

const bookingRoute = require('./routes/routeSelection')

var registerRouter = require('./routes/register');
//--------------------------------------------------------


//DB Config
const DB_URL = require('./config/keys').MongoURI;

//connect to mongo
//---------------------------------------------
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(err => {
        throw err
    })
//---------------------------------------------


const Bus = require('./models/Buses');

// ✅ Temporary route to insert dummy data
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


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/', login);
app.use('/booking', bookingRoute);
app.use('/register', registerRouter);  // To register page 
app.use('/user', passport.authenticate('jwt', { session: false }), loggedInPage); //To Secure Route

module.exports = app;
