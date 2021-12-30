const router = require("express").Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const user = await User.findOne({ google_id: body.googleId });

        if (user) {
            if (body.access_token != user.access_token) {
                user.access_token = body.access_token;
                await user.save();
            }

            res.json({ access_token: user.access_token, newUser: false });
        } else {
            let user = new User({
                email: body.email,
                google_id: body.googleId,
                pfp_url: body.imageUrl,
                access_token: body.access_token,
                oragniser: false,
            });

            await user.save();
            res.json({ access_token: body.access_token, newUser: true });
        }
    } catch (err) {
        console.log(err);
        res.json({ error: err });
    }
});

router.get("/change-role", async (req, res) => {
    try {
        const user = await User.findOne({
            access_token: req.query.access_token,
        });

        if (user) {
            await User.updateOne(
                {
                    access_token: req.query.access_token,
                },
                { $set: { organiser: !user.organiser } }
            );
            res.json({ done: true });
        } else {
            res.json({ error: "Some Error has occurred" });
        }
    } catch (err) {
        res.json({ error: err });
    }
});

router.get("/pfp", async (req, res) => {
    try {
        const user = await User.findOne({
            access_token: req.query.access_token,
        });

        if (user) {
            res.json({
                pfp: user.pfp_url,
                organiser: user.organiser,
                _id: user._id,
            });
        } else {
            res.json({ noUser: true });
        }
    } catch (err) {
        res.json({ error: err });
    }
});

module.exports = router;
