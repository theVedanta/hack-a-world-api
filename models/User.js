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
    username: {
        type: String,
    },
    organiser: {
        type: Boolean,
    },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
