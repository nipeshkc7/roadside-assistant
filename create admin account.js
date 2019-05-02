const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/* 
    This script will create a default admin account for the roadside assistant application in the database,
    ensure that you have Mongodb installed first and a database in it called roadside-assistant.

    You may need to also create a collection inside that database called users, may still work without creating one :)

    Run this script once to create the user.
*/

// make connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/roadside-assistant', { useCreateIndex: true, useNewUrlParser: true })

// get reference to database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");
    
    var userSchema = mongoose.Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true }, // Hash is just the hashed value of the users password
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dateCreated: { type: Date, default: Date.now },
        role: { type: String }
        }
    );

    var User = mongoose.model('User', userSchema, 'users');
    
    // Default Admin User
    var user1 = new User({ username: 'Admin', hash: 'fill-in', firstName: 'Admin', lastName: 'Privleges', role: 'Admin' });
    
    // Password
    var password = "administrator";
    
    // Hashes the password for storage
    user1.hash = bcrypt.hashSync(password, 10);

    // Save model to database
    user1.save(function (err, user) {
        if (err) return console.error(err);
        console.log(user.username + " saved to the user collection.");
    });
});