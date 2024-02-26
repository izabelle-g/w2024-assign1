// Initialize Express
const express = require('express');
const app = express();

// API Functionality by using the module f1-router.js
const router = require('./scripts/f1-router.js');
// TODO: Add the handlers here for the APIs

// TODO: Might change when hosting
// configure port to listen 
app.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
});