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
                username: body.email.split("@")[0],
                organiser: body.organiser,
            });

            await user.save();
            res.json({ access_token: body.access_token, newUser: true });
        }
    } catch (err) {
        console.log(err);
        res.json({ error: err });
    }
});

module.exports = router;
