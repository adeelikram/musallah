// require express and router
var express = require('express');
var router = express.Router();
// require mongo config
var mongo = require('../mongo');
const { ObjectId } = require('mongodb');
// router get request
router.get('/verify/:id', async function (req, res, next) {
    // read the id from the url
    var id = req.params.id;
    
    var data = await mongo.collection("users").findOneAndUpdate({ _id: ObjectId(id) }, { $set: { verified: true } });
    
    // if the user is not found
    if (data.value) {
        res.json({
            success: true,
            message: 'User verified'
        });
    }
    else {
        res.json({
            success: false,
            message: 'User not verified'
        });
    }
    res.end()
});
// export router
module.exports = router;