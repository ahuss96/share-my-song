const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to database
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
});

// on error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err)
});

const app = express();

const songs = require('./controllers/songs');
const users = require('./controllers/users');

const PORT = process.env.PORT || 3000;

// CORS middleware
app.use(cors({
    origin: true,
    credentials: true
}));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/songs', songs);
app.use('/users', users);

// index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// start server
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});
