// Initialize Express
const express = require('express');
const app = express();

// API Functionality by using the module f1-router.js
const router = require('./scripts/f1-router.js');
router.handleAllSeasons(app);
router.handleAllCircuits(app);
router.handleCircuit(app);
router.handleAllCircuitsInSeason(app);
router.handleAllConstructors(app);
router.handleConstructor(app);
router.handleAllDrivers(app);
router.handleDriver(app);
router.handleDriversWithPrefix(app);
router.handleDriversInRace(app);
router.handleRace(app);
router.handleRacesInSeason(app);
router.handleNthRaceInSeason(app);
router.handleRacesInCircuit(app);
router.handleRacesInCircuitBetween(app);
router.handleResultsforRace(app);
router.handleDriverResults(app);
router.handleDriverResultsBetween(app);
router.handleRaceQualResults(app);
router.handleSeasonStandings(app);
router.handleConstructorStandings(app);

// configure port to listen 
app.listen(8080, () => {
    console.log("Listening on port " + process.env.PORT);
});