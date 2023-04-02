# Express API

## Structure

```
.
├── README.md
├── app.js
├── controllers
│   ├── controller.js
│   ├── controllerDrivers.js
│   ├── controllerQualifyings.js
│   ├── controllerRaces.js
│   ├── controllerSeasons.js
│   ├── controllerSprints.js
│   └── controllerTracks.js
├── package.json
├── routes
│   └── routes.js
└── services
    ├── API.js
    ├── APIDrivers.js
    ├── APIQualifyings.js
    ├── APIRaces.js
    ├── APISeasons.js
    ├── APISprints.js
    ├── APITracks.js
    └── config.js

3 directories, 19 files
```

## Requirements

/api/services/config.js

```js
const influx_host = "url";

module.exports = {
  influx_host: influx_host,
};
```

## Run

```bash
npm install
```

```bash
npm start
```

## General routes

to fetch the entire collection

```
http://localhost:4000/fetchAll/${collection}
```

to insert and entry into a collection ({body: {json}})

```
http://localhost:4000/post/${collection}
```

to delete an entry of a collection ({body: {json}})

```
http://localhost:4000/delete/${collection}
```

#### Collections

- drivers
- qualifyings
- races
- seasons
- sprints
- tracks

## Individual routes

### Drivers

```
http://localhost:4000/fetch/drivers/getPilots
```

```
http://localhost:4000/fetch/drivers/getAvgAge
```

### Qualifyings

```
http://localhost:4000/fetch/qualifyings/getBestPilot
```

```
http://localhost:4000/fetch/qualifyings/getLeaderboard
```

### Races

```
http://localhost:4000/fetch/races/getBestPilot
```

```
http://localhost:4000/fetch/races/getPodiumsFerrari
```

### Seasons

```
http://localhost:4000/fetch/seasons/getHighestPodiums
```

```
http://localhost:4000/fetch/seasons/getSecondBest
```

### Sprints

```
http://localhost:4000/fetch/sprints/getHighestSpeed
```

```
http://localhost:4000/fetch/sprints/getAvgTrack
```

### Tracks

```
http://localhost:4000/fetch/tracks/getHighestSpeed
```

```
http://localhost:4000/fetch/tracks/getAvgTrack
```
