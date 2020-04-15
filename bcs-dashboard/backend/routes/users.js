const router = require('express').Router();
const Bcrypt = require("bcryptjs");

// we need to require the mongoose model that we created 
let User = require('../models/users.model');

// first endpoint that handles incoming HTTP GET requests on the /users url path
// .find() will get a list of all the users from the mongodb atlas database
//        returns a promise
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

// second endpoing that handles incoming HTTP POST requests
// after the user is saved to the database, we return "User registered!", else catch error
router.route('/signup').post(async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const salt = await Bcrypt.genSalt();
    const password = await Bcrypt.hash(req.body.password, salt);
    const email = req.body.email;
    const newUser = new User({firstName, lastName, username, password, email});
    newUser.save()
        .then(() => res.json('User registered!'))
        .catch(err => res.status(400).json('Error: ' + err));
    console.log('Username: ' + username + ' has been registered.');
  } catch {
    res.status(400).send();
  }
});


module.exports = router; 