# Web Application : GUI

# Structure

```
.
├── README.md
├── config
│   ├── jest
│   └── webpack
│       └── persistentCache
├── package.json
├── public
│   ├── F1.png
│   └── index.html
├── scripts
└── src
    ├── App.test.js
    ├── assets
    │   ├── fonts
    │   │   ├── Formula1-Black.ttf
    │   │   ├── Formula1-Bold.ttf
    │   │   ├── Formula1-Regular.ttf
    │   │   └── Formula1-Wide.ttf
    │   ├── img
    │   │   ├── drivers
    │   │   │   └── #.avif
    │   │   ├── drivers.jpg
    │   │   ├── flags
    │   │   │   └── #.svg
    │   │   ├── qualifyings.jpg
    │   │   ├── races.jpg
    │   │   ├── seasons.jpg
    │   │   ├── slide1.jpg
    │   │   ├── slide2.jpg
    │   │   ├── slide3.jpg
    │   │   ├── sprints.jpg
    │   │   ├── teams
    │   │   │   └── #.avif
    │   │   └── tracks.jpg
    │   └── json
    │       └── flags.json
    ├── components
    │   ├── Drivers.js
    │   ├── Homepage.js
    │   ├── Loading.js
    │   ├── Qualifyings.js
    │   ├── Races.js
    │   ├── Seasons.js
    │   ├── Sprints.js
    │   ├── Tracks.js
    │   ├── drivers
    │   │   ├── DriversForm.js
    │   │   ├── DriversMosaic.js
    │   │   └── DriversTable.js
    │   ├── qualifyings
    │   │   ├── QualifyingsForm.js
    │   │   ├── QualifyingsList.js
    │   │   └── QualifyingsTable.js
    │   ├── races
    │   │   ├── RacesForm.js
    │   │   ├── RacesList.js
    │   │   └── RacesTable.js
    │   ├── seasons
    │   │   ├── SeasonsForm.js
    │   │   ├── SeasonsList.js
    │   │   └── SeasonsTable.js
    │   ├── sprints
    │   │   ├── SprintsForm.js
    │   │   ├── SprintsList.js
    │   │   └── SprintsTable.js
    │   └── tracks
    │       ├── TracksForm.js
    │       ├── TracksList.js
    │       └── TracksTable.js
    ├── config.js
    ├── css
    │   ├── fonts.css
    │   └── index.css
    ├── hooks
    │   ├── useDrivers.js
    │   ├── useFlags.js
    │   └── useTeams.js
    ├── index.js
    ├── reportWebVitals.js
    └── setupTests.js

23 directories, 351 files
```

## Requirements

/app/src/config.js

```js
const api_host = "http://{ip_adress}:4000";

module.exports = {
  api_host: api_host,
};
```

## Run

Installing the required dependencies

```bash
npm install
```

Launching React application

```bash
npm start
```

## Launch

```
http://localhost:3000/
```
