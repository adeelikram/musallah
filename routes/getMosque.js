var mongo = require('../mongo.js');
// require express and express router
var express = require('express');
var router = express.Router();

// get request
router.get('/getMosques', async (req, res) => {
    // body data from req
    var bd = req.query;
    // get the latitude and longitude from the body data
    var lat = bd.lat;
    var lng = bd.lng;
    var data = await mongo.collection("mosques").find().toArray()
    // if mongo collection is empty
    if (data.length == 0) {
        // return an empty array
        res.json({
            success: false,
            message: "NoMosques"
        })
    }
    else {
        data.sort((a, b) => {
            delete a._id
            delete b._id
            return distanceFromLocationInKM(lat, lng, a.address.lat, a.address.lng) - distanceFromLocationInKM(lat, lng, b.address.lat, b.address.lng);
        })
        res.json(data)
    }
})


function distanceFromLocationInKM(lat1, lng1, lat2, lng2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lng2 - lng1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

module.exports = router;


