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
router.route('/register').post(async (req, res) => {
  try {
    const salt = await Bcrypt.genSalt();
    const password = await Bcrypt.hash(req.body.password, salt);
    const username = req.body.username;
    const newUser = new User({username, password});
    console.log(username);
    console.log(password);
    newUser.save()
        .then(() => res.json('User registered!'))
        .catch(err => res.status(400).json('Error: ' + err));
  } catch {
    res.status(400).send();
  }
});


module.exports = router; 