const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    online: Boolean,
    links: Array,
    tags: Array,
    org: String,
});

const Event = mongoose.model("event", EventSchema);
module.exports = Event;
