const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// server settings - make sure that your port doesn't conflict with the React port!
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB configuration
const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Nodemon success message
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})