const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Guest = require('../models/songs');

function createUsername(name) {
    return name.replace(/[^A-Z0-9]+/ig, "_");
}

// add new guest record
router.post('/add', (req, res, next) => {
    let newGuest = new Guest({
        name: req.body.name,
        username: createUsername(req.body.name),
        qrString: req.body.qrString,
        guestType: req.body.guestType
    });

    Guest.addGuest(newGuest, (err, guest) => {
        if (err) {
            res.json({success: false, msg: 'Failed to add guest'});
        }
        else {
            console.log('Added new guest: ', guest.name);
            res.json({success: true, msg: 'Guest added', id: guest._id, name: guest.name});
        }
    })
});

// post guest's response
router.post('/response', (req, res, next) => {
    Guest.updateById(req.body.guest,
        (err, guest) => {
            if (err) {
                res.json({success: false, msg: err})
            }
            else {
                console.log(guest.name, 's response has been recorded');
                res.json({success: true, msg: `${guest.name}'s response has been recorded`})
            }
        })
});

// retrieve all devices
router.get('/all',(req, res, next) => {
    Guest.find({}, function (err, guests) {
        if (err) {
            res.json({success: false, msg: err})
        }

        else if (!guests) {
            res.json({success: false, msg: 'No guests found'});
        }

        else {
            console.log('All guests retrieved');
            res.json({success: true, guestList: guests});
        }
    })
});

// retrieve by name
router.get('/name',(req, res, next) => {
    const name = req.body.name;

    Guest.getGuestByName(name, function(err, guest){
        if (err) {
            res.json({success: false, msg: err});
        }

        else if (!guest) {
            res.json({success: false, msg: 'Guest not found'});
        }

        else {
            console.log(guest.name, ' retrieved');
            res.json({success: true, guest: guest});
        }
    })
});

// retrieve by username
router.get('/username/:username',(req, res, next) => {
    const username = req.params.username;

    Guest.getGuestByUsername(username, function(err, guest){
        if (err) {
            res.json({success: false, msg: err});
        }

        else if (!guest) {
            res.json({success: false, msg: 'Guest not found'});
        }

        else {
            console.log(guest.name, ' retrieved');
            res.json({success: true, guest: guest});
        }
    })
});

// retrieve by _id
router.get('/id/:id',(req, res, next) => {
    const id = req.params.id;

    Guest.getGuestById(id, function(err, guest){
        if (err) {
            res.json({success: false, msg: err});
        }

        else if (!guest) {
            res.json({success: false, msg: 'Guest not found'});
        }

        else {
            console.log(guest.name, ' retrieved');
            res.json({success: true, guest: guest});
        }
    })
});

router.post('/delete', (req, res, next) => {
    Guest.findByIdAndDelete(req.body.id, (err, guest) => {
        if (err) {
            res.json({success: false, msg: err})
        }
        else {
            console.log(guest.name, ' deleted');
            res.json({success: true, msg: `${guest.name} deleted`})
        }
    })
});

module.exports = router;
