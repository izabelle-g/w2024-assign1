// Establish connection to supabase
const supa = require('@supabase/supabase-js');
const url = 'https://nkfxjestaclehojtwodt.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZnhqZXN0YWNsZWhvanR3b2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5MTIwODgsImV4cCI6MjAyNDQ4ODA4OH0.8CTvQgX6aYoo8EF8rHvNwBh-kiMkB6QloowfVrH7DKs';

const supabase = supa.createClient(url, anonKey);

// Return error message in JSON format
const jsonMSG = (msg) => {
    return { message : msg }
};

// Route 1: Returns all the data in the seasons table
const handleAllSeasons = (app) => {
    app.get('/api/seasons', async (req, res) => {
        const {data, error} = await supabase
        .from('seasons')
        .select();

        // Error msg not added because the page won't load if the request has a different table name input
        res.send(data);
    });
};

// Route 2: Returns all the data in the circuits table
const handleAllCircuits = (app) => {
    app.get('/api/circuits', async (req, res) => {
        const {data, error} = await supabase
        .from('circuits')
        .select();
        
        // Error msg not added because the page won't load if the request has a different table name input
        res.send(data);
    });
};

// Route 3: Returns the specified circuit
const handleCircuit = (app) => {
    app.get('/api/circuits/:ref', async (req, res) => {
        const {data, error} = await supabase
        .from('circuits')
        .select()
        .eq('circuitRef', req.params.ref);

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No circuit found in ${req.params.ref}`));
    });
};

// Route 4: Returns the circuits in a given season
const handleAllCircuitsInSeason = (app) => {
    app.get('/api/circuits/seasons/:year', async (req, res) => {
        const {data, error} = await supabase
        .from('races')
        .select(`name, round, seasons!inner (year), circuits (name, location, country)`)
        .eq('seasons.year', req.params.year) 
        .order('round', { ascending: true });

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No circuits found in the year ${req.params.year}`));
    });
};

// Route 5: Returns all the constructors
const handleAllConstructors = (app) => {
    app.get('/api/constructors', async (req, res) => {
        const {data, error} = await supabase
        .from('constructors')
        .select();
        
        // Error msg not added because the page won't load if the request has a different table name input
        res.send(data);
    });
};

// Route 6: Returns just the specified constructor
const handleConstructor = (app) => {
    app.get('/api/constructors/:ref', async (req, res) => {
        const {data, error} = await supabase
        .from('constructors')
        .select()
        .eq('constructorRef', req.params.ref);

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No constructor found using ${req.params.ref}`));
    });
};

// Route 7: Returns all the drivers
const handleAllDrivers = (app) => {
    app.get('/api/drivers', async (req, res) => {
        const {data, error} = await supabase
        .from('drivers')
        .select();
        
        // Error msg not added because the page won't load if the request has a different table name input
        res.send(data);
    });
};

// Route 8: Returns just the specified driver
const handleDriver = (app) => {
    app.get('/api/drivers/:ref', async (req, res) => {
        const {data, error} = await supabase
        .from('drivers')
        .select()
        .eq('driverRef', req.params.ref);

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No driver found with using ${req.params.ref}`));
    });
};

// Route 9: Returns the drivers whose surname (case insensitive) begins with the provided prefix
const handleDriversWithPrefix = (app) => {
    app.get('/api/drivers/search/:substring', async (req, res) => {
        const {data, error} = await supabase
        .from('drivers')
        .select()
        .ilike('surname', req.params.substring + '%')
        .order('surname', { ascending: true });

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data); 
        else res.json(jsonMSG(`No drivers found with prefix ${req.params.substring}`));
    });
};

// Route 10: Returns the drivers within a given race
const handleDriversInRace = (app) => {
    app.get('/api/drivers/race/:raceId', async (req, res) => {
        const {data, error} = await supabase
        .from('results')
        .select(`races!inner (raceId, name, year), drivers (*)`)
        .eq('races.raceId', req.params.raceId);

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`${req.params.raceId} is an invalid race ID`));
    });
};

// Route 11: Returns just the specified race
const handleRace = (app) => {
    app.get('/api/races/:raceId', async (req, res) => {
        const {data, error} = await supabase
        .from('races')
        .select(`name, year, circuits!inner (name, location, country)`)
        .eq('raceId', req.params.raceId);

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`${req.params.raceId} is an invalid race ID`));
    });
};

// Route 12: Returns the races within a given season
const handleRacesInSeason = (app) => {
    app.get('/api/races/season/:year', async (req, res) => {
        const {data, error} = await supabase
        .from('races')
        .select('*, seasons!inner (*)')
        .eq('seasons.year', req.params.year)
        .order('round', { ascending: true });

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No races found in the season of ${req.params.year}`));
    });
};

// Route 13: Returns a specific race within a given season specified by the round number
const handleNthRaceInSeason = (app) => {
    app.get('/api/races/season/:year/:round', async (req, res) => {
        const {data, error} = await supabase
        .from('races')
        .select('*, seasons!inner (*)')
        .eq('seasons.year', req.params.year)
        .eq('round', req.params.round);

        // If reference found, send data, else display error msg
        if(req.params.year > 2024 || req.params.year < 1950) res.json(jsonMSG(`Year ${req.params.year} is out of range`));
        else if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No race found in round ${req.params.round} in ${req.params.year} season`));
    }); 
};

// Route 14: Returns all the races for a given circuit
const handleRacesInCircuit = (app) => {
    app.get('/api/races/circuits/:ref', async (req, res) => {
        const {data, error} = await supabase
        .from('races')
        .select(`name, year, circuits!inner (name, location, country)`)
        .eq('circuits.circuitRef', req.params.ref)
        .order('year', { ascending: true });

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No races found in circuit ${req.params.ref}`));
    });
};

// Route 15: Returns all the races for a given circuit between two years
const handleRacesInCircuitBetween = (app) => {
    app.get('/api/races/circuits/:ref/season/:start/:end', async (req, res) => {
        const {data, error} = await supabase
        .from('races')
        .select(`name, year, circuits!inner (name, location, country)`)
        .eq('circuits.circuitRef', req.params.ref)
        .gte('year', req.params.start)
        .lte('year', req.params.end)
        .order('year', { ascending: true });

        // If reference found, send data, else display error msg
        if(req.params.end < req.params.start) res.json(jsonMSG(`The years are reversed`));
        else if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No races found in circuit ${req.params.ref} between ${req.params.start} and ${req.params.end}`));
    });
};

// Route 16: Returns the results for the specified race
const handleResultsforRace = (app) => {
    app.get('/api/results/:raceId', async (req, res) => {
        const {data, error} = await supabase
        .from('results')
        .select(`drivers!inner (driverRef, code, forename, surname), races!inner (name, round, year, date), constructors!inner (name, constructorRef, nationality)`)
        .eq('races.raceId', req.params.raceId)
        .order('grid', { ascending: true });

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No results found for race with ID ${req.params.raceId}`));
    });
};

// Route 17: Returns all the results for a given driver
const handleDriverResults = (app) => {
    app.get('/api/results/driver/:ref', async (req, res) => {
        const {data, error} = await supabase
        .from('results')
        .select('drivers!inner (driverRef, code, forename, surname), *')
        .eq('drivers.driverRef', req.params.ref);

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No results found for driver with reference ${req.params.ref}`));
    });
};

// Route 18: Returns all the results for a given driver between two years
const handleDriverResultsBetween = (app) => {
    app.get('/api/results/driver/:ref/seasons/:start/:end', async (req, res) => {
        const {data, error} = await supabase
        .from('results')
        .select(`drivers!inner (driverRef, code, forename, surname), races!inner (year), *`)
        .eq('drivers.driverRef', req.params.ref)
        .gte('races.year', req.params.start)
        .lte('races.year', req.params.end);

        // If reference found, send data, else display error msg
        if(req.params.end < req.params.start) res.json(jsonMSG(`The years are reversed`));
        else if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No results found for driver with reference ${req.params.ref} between years ${req.params.start} and ${req.params.end}`));
    });
};

// Route 19: Returns the qualifying results for the specified race
const handleRaceQualResults = (app) => {
    app.get('/api/qualifying/:raceId', async (req, res) => {
        const {data, error} = await supabase
        .from('qualifying')
        .select(`drivers!inner (driverRef, code, forename, surname), races!inner (name, round, year, date), constructors!inner (name, constructorRef, nationality)`)
        .eq('races.raceId', req.params.raceId)
        .order('position', { ascending: true });

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No results found for race with ID ${req.params.raceId}`));
    });
};

// Route 20: Returns the current season driver standings table for the specified race
const handleSeasonStandings = (app) => {
    app.get('/api/standings/:raceId/drivers', async (req, res) => {
        const {data, error} = await supabase
        .from('driverStandings')
        .select(`drivers!inner (driverRef, code, forename, surname), races!inner (name, round, year, date)`)
        .eq('races.raceId', req.params.raceId)
        .order('position', { ascending: true });

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No results found for race with ID ${req.params.raceId}`));
    });
};

// Route 21: Returns the current season constructors standings table for the specified race
const handleConstructorStandings = (app) => {
    app.get('/api/standings/:raceId/constructors', async (req, res) => {
        const {data, error} = await supabase
        .from('constructorStandings')
        .select(`constructors!inner (constructorRef, name, nationality), races!inner (name, round, year, date)`)
        .eq('races.raceId', req.params.raceId)
        .order('position', { ascending: true });

        // If reference found, send data, else display error msg
        if(data !== '' && data !== null) res.send(data);
        else res.json(jsonMSG(`No results found for race with ID ${req.params.raceId}`));
    });
};

// Export the routings
module.exports = {
    handleAllSeasons,
    handleAllCircuits,
    handleCircuit,
    handleAllCircuitsInSeason,
    handleAllConstructors,
    handleConstructor,
    handleAllDrivers,
    handleDriver,
    handleDriversWithPrefix,
    handleDriversInRace,
    handleRace,
    handleRacesInSeason,
    handleNthRaceInSeason,
    handleRacesInCircuit,
    handleRacesInCircuitBetween,
    handleResultsforRace,
    handleDriverResults,
    handleDriverResultsBetween,
    handleRaceQualResults,
    handleSeasonStandings,
    handleConstructorStandings
};