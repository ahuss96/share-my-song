const mongoose = require('mongoose');

// user schema
const SongsSchema = mongoose.Schema({
    songs: [{
        name: {
            type: String
        },
        artist: {
            type: String
        },
        dateAdded: {
            type: Date
        }
    }]
});

const Songs = module.exports = mongoose.model('Songs', SongsSchema);

module.exports.getGuestById = function (id, callback) {
    Songs.findById(id, callback);
};

module.exports.getGuestByName = function (name, callback) {
    const query = {name: name};
    Songs.findOne(query, callback);
};

module.exports.getGuestByUsername = function (username, callback) {
    const query = {username: username};
    Songs.findOne(query, callback);
};

module.exports.addGuest = function (newGuest, callback) {
    newGuest.save(callback);
};

module.exports.updateById = function (guest, callback) {
    const query = {'_id': guest.id};
    Songs.replaceOne(query, guest, callback)
};
