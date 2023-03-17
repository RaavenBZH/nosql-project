
## Projet NoSQL

Dans le cadre de cette ressource, nous avons créé notre propre base de données pour confirmer notre maîtrise du langage.

La base de données porte sur la **Formule 1**. Nous avons choisi ce sujet car nous avons de bonnes connaissances, et que la discipline ouvre la porte vers de nombreuses manipulations de bases de données.

## Modèle de données

#### Saison
```
- Année : int
- Nombre de courses : int
- Pilote champion en titre : str
- Équipe championne en titre : str
```

#### Qualification
```
- Année : int
- Pays : str
- Ville : str
- Classement : objet
    - Pilote : str
    - Équipe : str
- Tour de pôle : int (en millisecondes)
```

#### Sprint
```
- Année : int
- Pays : str
- Ville : str
- Classement : objet
    - Pilote : str
    - Équipe : str
- Durée : int (en secondes)
```

#### Course
```
- Année : int
- Pays : str
- Ville : str
- Classement : objet
    - Pilote : str
    - Équipe : str
- Durée : int (en secondes)
```

#### Pilote
``` 
- Nom : str
- Prénom : str
- Date de naissance : date
```

#### Pistes
```
- Pays : str
- Ville : str
- Longueur : int (en mètres)
```