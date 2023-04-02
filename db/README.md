# MongoDB database

# Structure

```
.
├── README.md
├── collections
│   ├── drivers.js
│   ├── qualifyings.js
│   ├── races.js
│   ├── seasons.js
│   ├── sprints.js
│   └── tracks.js
├── insertions
│   ├── drivers.js
│   ├── qualifyings.js
│   ├── races.js
│   ├── seasons.js
│   ├── sprints.js
│   └── tracks.js
├── mongoose
│   ├── collections
│   │   ├── drivers.js
│   │   └── races.js
│   └── script.js
├── package.json
├── queries.js
├── script.js
├── test-db.ipynb
└── tests.js

4 directories, 21 files
```

## Run

Installing the required dependencies

```bash
npm install
```

Creating the database and its collections

```bash
npm start
```

Executing the queries

```bash
npm run launch
```

Running the test queries

```bash
npm run test
```

Executing the database on Mongoose

```bash
npm run mongoose
```
