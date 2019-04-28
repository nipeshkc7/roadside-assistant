const db = require('_helpers/db');
const Request = db.Request;

module.exports = {
    getAll,
    getById,
    getAllNotCompleted,
    getInArea
}

async function getAll() {
    return await Request.find().select('-latitude -longitude');
}

async function getById(id) {
    return await Request.findById(id);
}

async function getAllNotCompleted() {
    return await Request.find({completed: false});
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}
  
function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
}

async function getInArea({ lat, lon }) {
    const requests =  await Request.find().lean({ virtuals: true });
    
    for (let index = 0; index < requests.length; index++) {
        const lat2 =  requests[index].latitude;
        const lon2 =  requests[index].longitude;

        const distance =  distanceInKmBetweenEarthCoordinates(lat, lon, lat2, lon2);
        if (distance > 10) {
            requests.splice(index, 1);
        }
    }

    //console.log(requests);
    return requests;
}