const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

// user schema
const SongsSchema = mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true
    },
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

module.exports.getSongsById = function (id, callback) {
    Songs.findById(id, callback);
};

module.exports.initSongRecord = function (newSongs, callback) {
    newSongs.save(callback);
};

module.exports.updateById = function (songs, callback) {
    const query = {'_id': songs.id};
    Songs.replaceOne(query, songs, callback)
};
