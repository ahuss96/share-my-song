const express = require('express');
const router = express.Router();
const Song = require('../models/songs');
const passport = require('passport');

// add to songs record
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    // {id: 1, songs: [{}, {}]}
    Song.updateById(req.body.songs,
        (err, songs) => {
            if (err) {
                console.log(err);
                res.json({success: false, msg: err})
            }
            else {
                console.log(songs.id, 'updated');
                res.json({success: true, msg: `${songs.id}'s record has been updated.`})
            }
        })
});

// retrieve all songs, protected by authentication
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Song.find({}, function (err, songs) {
        if (err) {
            res.json({success: false, msg: err})
        }

        else if (!songs) {
            res.json({success: false, msg: 'No songs records found'});
        }

        else {
            console.log('All songs records retrieved');
            res.json({success: true, songRecords: songs});
        }
    })
});

// retrieve by _id
router.get('/id/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const id = req.params.id;

    Song.getSongsById(id, function(err, songs){
        if (err) {
            res.json({success: false, msg: err});
        }

        else if (!songs) {
            res.json({success: false, msg: 'Songs record not found'});
        }

        else {
            console.log(songs.id, ' retrieved');
            res.json({success: true, songs: songs});
        }
    })
});

router.post('/delete', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Song.findByIdAndDelete(req.body.id, (err, songs) => {
        if (err) {
            res.json({success: false, msg: err})
        }
        else {
            console.log(songs.id, ' deleted');
            res.json({success: true, msg: `${songs.id} deleted`})
        }
    })
});

module.exports = router;
