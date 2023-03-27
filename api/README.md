# Express API

## Structure

```
.
├── README.md
├── app.js
├── controllers
│   └── controllers.js
├── package.json
├── routes
│   └── routes.js
└── services
    ├── API.js
    └── # config.js

3 directories, 7 files
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

## Usage

```
http://localhost:4000/fetchAll/${collection}
```

#### Collections

- drivers
- qualifyings
- races
- seasons
- sprints
- tracks
