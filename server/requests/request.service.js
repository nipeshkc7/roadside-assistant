const db = require('_helpers/db');
const Request = db.Request;
const Professional = db.Professional;

module.exports = {
    create,
    update,
    getAll,
    getById,
    getAllNotCompleted,
    getInArea,
    getRequestResponders,
    getMembersRequests
}

async function create(requestParam) {
    // Validate that a member cannot make another request without completing their first one
    if (await Request.findOne().or([{ memberID: requestParam.memberID, status: 'available' }, { memberID: requestParam.memberID, status: 'in-progress' }])) {
        console.log('already has a requessst');
        throw 'This member already has a service request in progress';
    }

    const request = new Request(requestParam);

    await request.save();
    return request.toObject();
}

async function update(id, requestParam) {
    const request = await Request.findById(id).select('+responders');

    if (!request) throw 'Request not found';

    if (requestParam.responderID) {
        request.responders.push(requestParam);
    }
    Object.assign(request, requestParam);

    await request.save();
}

async function getAll() {
    return await Request.find().select('-latitude -longitude');
}

async function getById(id) {
    return await Request.findById(id);
}

async function getAllNotCompleted() {
    return await Request.find({status: 'available'});
}

// Converts the latitude or longitudes value to radians
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

// Calculates the distance between two geographical points and returns the value in km
function distanceInKmBetweenCoords(lat1, lon1, lat2, lon2) {
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

// Returns all requests within a 10km radius of the professional
async function getInArea({ lat, lon }) {
    const requests =  await Request.find({status: 'available'}).lean({ virtuals: true });
    
    for (let index = 0; index < requests.length; index++) {
        const lat2 =  requests[index].latitude;
        const lon2 =  requests[index].longitude;

        const distance =  distanceInKmBetweenCoords(lat, lon, lat2, lon2);
        if (distance > 10) {
            requests.splice(index, 1);
        }
    }

    return requests;
}

async function getMembersRequests(memberIDD) {
    const requests = await Request.find({status: 'available', memberID: memberIDD});
    return requests;
}

async function getRequestResponders(id) {
    const request = await Request.findById(id).lean({ virtuals: true });
    
    const responder = {
        professionalID: null,
        username: null,
        firstName: null,
        lastName: null,
        quote: null,
        reviews: []
    };
    const responderss = request.responders;
    var responders = [];

    for (let index = 0; index < responderss.length; index++) {
        professional = await Professional.findById(responderss[index].responderID);
        responder.professionalID = professional._id;
        responder.username = professional.username;
        responder.firstName = professional.firstName;
        responder.lastName = professional.lastName;
        responder.quote = responderss[index].quote;
        responder.reviews = professional.reviews;

        responders.push(responder);
    }

    return responders;
}