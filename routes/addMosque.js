// requrie mongo object from mongo.js file
var mongo = require('../mongo.js');
// require express and express router
var express = require('express');
var router = express.Router();
// define the route for adding a mosque
// post request 
router.post('/addMosque', async (req, res) => {
    // get the data from the request
    var data = req.body;
    // check if the required fields are present
    for (let o in data) {
        if (!data[o] || data[o] == [] || data[o] == {}) {
            res.json({
                success: false,
                message: 'Please fill all the fields'
            })
            return;
        }
    }
    // insert data in mongo mosques collection
    await mongo.collection('mosques').insertOne(data);
    res.json({
        success: true,
        message: 'Mosque added successfully'
    })
})

module.exports = router;