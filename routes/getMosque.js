var mongo = require('../mongo.js');

var express = require('express');
var router = express.Router();





/**
 * @swagger 
 * /getMosques:
 *  get:
 *   description: Get all the mosques in the database with Lattitude and Longitude

 *   parameters:
 *     - in: query 
 *       name: lat
 *       description: Latitude of the place
 *     - in: query
 *       name: lng
 *       description: Longitude of the place
 *   responses:
 *     200:
 *       description: Mosques found
 *   
*/



router.get('/getMosques', async (req, res) => {
    
    var bd = req.query;
    
    var lat = Number(bd.lat);
    var lng = Number(bd.lng);
    var data = await mongo.collection("mosques").find().toArray()
    if (data.length == 0) {
        res.status(404).send({
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
        res.status(200).send(data)
    }
})


function distanceFromLocationInKM(lat1, lng1, lat2, lng2) {
    var R = 6371; 
    var dLat = deg2rad(lat2 - lat1);  
    var dLon = deg2rad(lng2 - lng1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; 
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

module.exports = router;


