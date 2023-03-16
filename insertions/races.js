const insertion = db.collection("races").insertMany([
    {
        "year": 2021,
        "country": "Italy",
        "city": "Monza",
        "standings": [
            "Hamilton",
            "Verstappen",
            "Leclerc",
            "Alonso",
            "Ocon",
            "Bottas"
        ],
        "duration": 78,
    },
    {
        "year": 2021,
        "country": "France",
        "city": "Le Castellet",
        "standings": [
            "Verstappen",
            "Leclerc",
            "Hamilton",
            "Ocon",
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
            "Bottas",
            "Hamilton",
            "Verstappen",
            "Leclerc",
            "Alonso",
            "Ocon"
        ],
        "duration": 89,
    },
    {
        "year": 2021,
        "country": "Great Britain",
        "city": "Silverstone",
        "standings": [
            "Leclerc",
            "Hamilton",
            "Ocon",
            "Verstappen",
            "Alonso",
            "Bottas"
        ],
        "duration": 90,
    },
    {
        "year": 2021,
        "country": "Hungary",
        "city": "Budapest",
        "standings": [
            "Verstappen",
            "Alonso",
            "Leclerc",
            "Hamilton",
            "Bottas",
            "Ocon"
        ],
        "duration": 81,
    },
    {
        "year": 2020,
        "country": "Italy",
        "city": "Imola",
        "standings": [
            "Ocon",
            "Alonso",
            "Verstappen",
            "Hamilton",
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
            "Alonso",
            "Verstappen",
            "Leclerc",
            "Bottas",
            "Ocon"
        ],
        "duration": 102,
    },
    {
        "year": 2020,
        "country": "Autria",
        "city": "Spielberg",
        "standings": [
            "Hamilton",
            "Verstappen",
            "Ocon",
            "Bottas",
            "Leclerc",
            "Alonso"
        ],
        "duration": 91,
    },
    {
        "year": 2020,
        "country": "Germany",
        "city": "Hockenheim",
        "standings": [
            "Leclerc",
            "Alonso",
            "Hamilton",
            "Verstappen",
            "Bottas",
            "Ocon"
        ],
        "duration": 97,
    },
    {
        "year": 2020,
        "country": "Australia",
        "city": "Melbourne",
        "standings": [
            "Hamilton",
            "Alonso",
            "Ocon",
            "Leclerc",
            "Bottas",
            "Verstappen"
        ],
        "duration": 92,
    }
]);