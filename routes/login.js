// require express router
var router = require('express').Router();
// require mongo file
var mongo = require('../mongo');

// router login route with function
router.post('/login', async function (req, res, next) {
    // data from req body
    var data =req.body;
    console.log(data.email)
    // mongo findone from users collection by email
    var user = await mongo.collection('users').findOne({ email: data.email });
    // if user is not found
    if (!user) {
        // send json 
        res.json({
            success: false,
            message: 'User not found'
        });
    }
    else {
        // if user is found
        if (user.password === data.password) {
            // set user id to session
            req.session.userId = user._id;
            // send json
            res.json({
                success: true,
                message: 'User logged in'
            });
        }
        else {
            // send json
            res.json({
                success: false,
                message: 'Wrong password'
            });
        }

    }
    res.end()
})
// export royuter
module.exports = router;
