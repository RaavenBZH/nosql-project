
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
- Barème de points en course : array (int)
- Barème de points en sprint : array (int)
```

#### Qualification
```
- Année : int
- Pays : str
- Ville : str
- Classement : array (object)
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
- Durée : int (en millisecondes)
```

#### Course
```
- Année : int
- Pays : str
- Ville : str
- Classement : objet
    - Pilote : str
    - Équipe : str
- Durée : int (en millisecondes)
- Tours complétés : int (par le vainqueur)
- Pilote le plus rapide : str
```

#### Pilote
``` 
- Nom : str
- Prénom : str
- Équipe : str
- Date de naissance : date
```

#### Circuits
```
- Pays : str
- Ville : str
- Longueur : int (en mètres)
```

## Réponses aux questions

#### 1. Une explication du choix de votre sujet et de la structure (justifier normalisé /dénormalisé)

La structure reprend les résultats de la saison 2022 de Formule 1. Nous avons légèrement dénormalisé les données, sans pousser ce choix à l'extrême. Par exemple, l'année est présente dans beaucoup de collections pour associer les résultats entre eux (dénormalisation). Aussi, l'équipe des pilotes est insérées plusieurs fois. D'un autre côté, nous aurions pu dénormaliser encore plus, par exemple en insérant les points marqués par les pilotes à chaque course (ici, c'est calculable avec le barème associé à une saison). Nous avons donc travaillé sur une base qui reproduit les bases de données non-relationnelles (à petite échelle certes), en restant dans la simplicité.

#### 2. Le(s) schéma(s) de bases de données mongodb

Voir modèle de données ci-dessus.

#### 3. Les requêtes permettant de tester les schémas

?

#### 4. Un jeu de 5 requêtes simples avec explications et résultats

    1. Combien de pilotes différents ont gagné une course ?
    2. Quelle est la longueur moyenne d'un circuit en 2022 (en mètres) ?
    3. Quel pilote a obtenu le plus de pôles positions (1er en qualifications) ?
    4. Combien de podiums l'équipe Ferrari a-t-elle obtenu ?
    5. Quel est l'âge moyen des pilotes ?

#### 5. Un jeu de 5 requêtes recherchées (modifications et suppressions) avec explications et résultats

    1. Modifier les données pour que l'année soit 2021.
    2. Échanger l'équipe des pilotes Hamilton et Verstappen.
    3. Déclasser les pilotes de l'équipe Red Bull de 5 places sur les circuits des États-Unis.
    4. Supprimer les Grand Prix dont les pays sont représentés par plusieurs circuits.
    5. Échangez les positions des coéquipiers en sprint.

#### 6. Un jeu de 5 requêtes complexes (aggregate entre autres) avec explications et résultats

    1. Combien de podiums le champion en titre par équipes a-t-il obtenu ?
    2. Sur quel circuit la vitesse moyenne était-elle la plus élevée en course ?
    3. Quel est le top 5 du championnat des pilotes ?
    4. Sur quel Grand Prix un maximum d'équipes ont marqué au moins un point ?
    5. Si l'équipe Red Bull était déclassée de toutes les sessions, qui aurait gagné le championnat par équipe ?