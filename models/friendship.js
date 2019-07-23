
const monogoose = require('mongoose');

const friendshipSchema = new monogoose.Schema({
    // user who sent the request
    from_user: {
        type: monogoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // user who accepted the request
    to_user: {
        type: monogoose.Schema.Types.ObjectId,
        ref: 'User'
    },

},{
  timestamps: true
});

const Friendship = monogoose.model('Friendship',friendshipSchema);
module.exports = Friendship;