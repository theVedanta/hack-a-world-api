const router = require("express").Router();
const Event = require("../models/Event");
const User = require("../models/User");

router.get("/", async (req, res) => {
    const events = await Event.find();
    res.json({ events });
});

router.post("/create", async (req, res) => {
    const user = await User.findOne({ access_token: req.query.access_token });
    const body = req.body;

    if (user) {
        const event = new Event({
            name: body.name,
            description: body.description,
            online: body.online,
            org: user._id,
            tags: body.tags,
            links: body.links,
            startDate: body.startDate,
            endDate: body.endDate,
        });

        try {
            await event.save();
            res.json({ done: true });
        } catch (err) {
            console.log(err);
            res.json({ err: err });
        }
    } else {
        res.json({ err: "User not found" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const user = await User.findOne({ access_token: req.query.access_token });
    const event = await Event.findOne({ _id: req.params.id });

    if (user._id.toString() === event.org) {
        try {
            await Event.deleteOne({ _id: req.params.id });
            res.json({ done: true });
        } catch (err) {
            res.json({ err: err });
        }
    }
});

module.exports = router;
