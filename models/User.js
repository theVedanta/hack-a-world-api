const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    access_token: {
        type: String,
        required: true,
    },
    pfp_url: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    google_id: {
        type: String,
        required: false,
        unique: true,
    },
    // name: {
    //     type: String,
    //     required: true,
    // },
    username: {
        type: String,
        required: true,
    },
    organiser: {
        type: Boolean,
        required: true,
    },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
