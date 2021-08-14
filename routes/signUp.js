// require express
var express = require('express');
var router = express.Router();
// require mongo constant
var mongo = require('../mongo');
// mailer sender
var mailer = require('../emailSender/emailVerifier');
// router complete post request  
router.post('/signup', async function (req, res, next) {
    // get the post data
    var data = req.body;
    // get fname, lname, email, password
    var fname = data.fname;
    var lname = data.lname;
    var email = data.email;
    var password = data.password;
    console.log(fname + ' ' + lname + ' ' + email + ' ' + password);
    // check if fname, lname, email, password are empty
    if (fname == '' || lname == '' || email == '' || password == '') {
        // if empty return error
        res.json({
            success: false,
            message: 'All fields are required'
        });
    }
    // check if email already exists in mongodb colletion
    else if (await mongo.collection('users').findOne({ email: email })) {
        // if email already exists return error
        console.log(await mongo.collection('users').findOne({ email: email }));
        res.json({
            success: false,
            message: 'Email already exists'
        });
    }
    // if all fields are valid, create new user in mongoo db collection
    else {
        mongo.collection('users').insertOne({
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            verified: false
        })
            .then(function (result) {
                // if success return success message
                var id = result.insertedId.toHexString();
                console.log(id);
                mailer(email,id)
                res.json({
                    success: true,
                    message: 'Email sended successfully'
                });
            })

    }
})

// export the router
module.exports = router;