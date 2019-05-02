const expressJWT = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    
    return expressJWT({ secret, isRevoked }).unless({
        path: [
            // Public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // Revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};