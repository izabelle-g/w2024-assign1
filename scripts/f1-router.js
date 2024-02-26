// Establish connection to supabase
const supa = require('@supabase/supabase-js');
const url = process.env.URL;
const anonKey = process.env.API_KEY;



// TODO: ADD A N/A ERROR MSG IN JSON

// TODO: Route 1: Returns all the data in the seasons table

// TODO: Route 2: Returns all the data in the circuits table

// TODO: Route 3: Returns the specified circuit
// TODO: use the circuitRef field

// TODO: Route 4: Returns the circuits in a given season
// TODO: order by round in ascending order

// TODO: Route 5: Returns all the constructors

// TODO: Route 6: Returns just the specified constructor
// TODO: use the contructorRef field

// TODO: Route 7: Returns all the drivers

// TODO: Route 8: Returns just the specified driver
// TODO: use the driverRef field

// TODO: Route 9: Returns the drivers whose surname (case insensitive) begins with the provided prefix

// TODO: Route 10: Returns the drivers within a given race

// TODO: Route 11: Returns just the specified race
// TODO: provide the circuit name, location, and country

// TODO: Route 12: Returns the races within a given season
// TODO: order by round

// TODO: Route 13: Returns a specific race within a given season specified by the round number

// TODO: Route 14: Returns all the races for a given circuit
// TODO: use the circuitRef field and order by year

// TODO: Route 15: Returns all the races for a given circuit between two years
// TODO: include the races in the provided years
// TODO: custom error messager for when end < start

// TODO: Route 16: Returns the results for the specified race
// TODO: provide the ff fields: driver (driverRef, code, forename, surname), race (name, round, year, date), constructor (name, constructorRef, nationality)
// TODO: sort by the field grid in ascending order

// TODO: Route 17: Returns all the results for a given driver

// TODO: Route 18: Returns all the results for a given driver between two years
// TODO: custom error messager for when end < start

// TODO: Route 19: Returns the qualifying results for the specified race
// TODO: provide the same fields as with results for the FKs, sort by the field position in ascending order

// TODO: Route 20: Returns the current season driver standings table for the specified race
// TODO: sort by position in ascending order, provide the same fields as with results for the driver

// TODO: Route 21: Returns the current season constructors standings table for the specified race
// TODO: sort by position in ascending order
// TODO: provide the same fields as with results for the constructor

// Export the routings
module.exports = {

};