const insertion = db.collection("qualifyings").insertMany([
    {
        "year": 2021,
        "country": "Italy",
        "city": "Monza",
        "standings": [
            "Verstappen",
            "Leclerc",
            "Hamilton",
            "Ocon",
            "Alonso",
            "Bottas"
        ],
        "duration": 78,
    },
    {
        "year": 2021,
        "country": "France",
        "city": "Le Castellet",
        "standings": [
            "Leclerc",
            "Hamilton",
            "Ocon",
            "Verstappen",
            "Alonso",
            "Bottas"
        ],
        "duration": 85,
    },
    {
        "year": 2021,
        "country": "Azerbaijan",
        "city": "Baku",
        "standings": [
            "Ocon",
            "Hamilton",
            "Bottas",
            "Leclerc",
            "Alonso",
            "Verstappen"
        ],
        "duration": 89,
    },
    {
        "year": 2021,
        "country": "Great Britain",
        "city": "Silverstone",
        "standings": [
            "Leclerc",
            "Verstappen",
            "Alonso",
            "Hamilton",
            "Bottas",
            "Ocon"
        ],
        "duration": 90,
    },
    {
        "year": 2021,
        "country": "Hungary",
        "city": "Budapest",
        "standings": [
            "Verstappen",
            "Hamilton",
            "Alonso",
            "Leclerc",
            "Ocon",
            "Bottas",
        ],
        "duration": 81,
    },
    {
        "year": 2020,
        "country": "Italy",
        "city": "Imola",
        "standings": [
            "Ocon",
            "Hamilton",
            "Verstappen",
            "Alonso",
            "Leclerc",
            "Bottas"
        ],
        "duration": 77,
    },
    {
        "year": 2020,
        "country": "Spain",
        "city": "Barcelona",
        "standings": [
            "Hamilton",
            "Ocon",
            "Alonso",
            "Verstappen",
            "Leclerc",
            "Bottas"
        ],
        "duration": 102,
    },
    {
        "year": 2020,
        "country": "Autria",
        "city": "Spielberg",
        "standings": [
            "Hamilton",
            "Alonso",
            "Leclerc",
            "Verstappen",
            "Bottas",
            "Ocon"
        ],
        "duration": 91,
    },
    {
        "year": 2020,
        "country": "Germany",
        "city": "Hockenheim",
        "standings": [
            "Alonso",
            "Ocon",
            "Hamilton",
            "Leclerc",
            "Verstappen",
            "Bottas"
        ],
        "duration": 97,
    },
    {
        "year": 2020,
        "country": "Australia",
        "city": "Melbourne",
        "standings": [
            "Bottas",
            "Alonso",
            "Ocon",
            "Leclerc",
            "Verstappen",
            "Hamilton"
        ],
        "duration": 92,
    }
]);