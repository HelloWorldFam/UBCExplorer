const router = require('express').Router();

// we need to require the mongoose model that we created 
let User = require('../models/user.model');

// first endpoint that handles incoming HTTP GET requests on the /users url path
// .find() will get a list of all the users from the mongodb atlas database
//        returns a promise
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

// second endpoing that handles incoming HTTP POST requests
// after the user is saved to the database, we return "User added!", else catch error
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 