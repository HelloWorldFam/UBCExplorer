const router = require('express').Router();
const Bcrypt = require("bcryptjs");

// we need to require the mongoose model that we created 
let Users = require('../models/users.model');

// first endpoint that handles incoming HTTP GET requests on the /users url path
// .find() will get a list of all the users from the mongodb atlas database
//        returns a promise
router.route('/').get((req, res) => {
  Users.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
  Users.findById(req.params.id)
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err));
});

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
    const newUser = new Users({firstName, lastName, username, password, email});
    newUser.save()
      .then(() => {
        res.json('User registered!');
        console.log('Username: ' + username + ' has been registered.');})
      .catch(err => res.status(400).json('Error: ' + err));
  } catch {
    res.status(400).send();
  }
});

router.route('/update/:id').post(async (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.username = req.body.username;
      user.email = req.body.email;
      user.courses = req.body.courses;

      user.save()
        .then(() => {
          res.json('User updated.');
          console.log(user);
        })
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router; 