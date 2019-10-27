const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');
const Songs = require('../models/songs');

// register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        userType: req.body.userType,
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            console.log('Failed to create user record');
            res.json({success: false, msg: 'Failed to create user record'});
        }
        else {
            console.log("User:", user.name, "registered");

            let newSongs = new Songs({
                _id: user.id,
                songs: []
            });
            // initialise songs record within songs table, so id can be entered into user record
            Songs.initSongRecord(newSongs, (err, songs) => {
                if (err) {
                    console.log('Failed to initialise songs record');
                    console.log(err);
                    res.json({success: false, msg: 'Failed to initialise songs record'})
                }
                else {
                    console.log("User:", user.name, "songs record has been created.");
                    res.json({success: true, msg: `${user.name} registered and songs record initialised.`});
                }
            });
        }
    })


});

// authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                console.log(user.name, "logged in");

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        userType: user.userType,
                        songsID: user.songsID
                    }
                });
            }

            else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// profile
router.get('/profile', passport.authenticate('jwt', {session: false}),(req, res, next) => {
    res.json({
        user: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            username: req.user.username,
            userType: req.user.userType,
            songsID: req.user.songsID
        }
    })
});

module.exports = router;
