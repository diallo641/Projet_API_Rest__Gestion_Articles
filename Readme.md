# 📘 API REST avec Node.js
## 📌 Description du projet
L’API que j’ai mise en place permet à des utilisateurs de publier des **articles** en utilisant différents **endpoints (routes)**.
Elle suit l’architecture REST et s’appuie sur Node.js, Express et MongoDB.
## 📂 Structure du projet
Le projet est organisé en plusieurs **dossiers** contenant les fichiers nécessaires :
### 📁 Fichier *server.js*
- Serveur principal de l’application.
- Contient le port de démarrage.
- Gère la connexion à la base de données.
- Charge les routes principales.
### 📁 Dossier *backend*
Contient toute la partie métier (logique serveur).
#### ➡️ Models
- Regroupe les **modèles Mongoose**, c’est-à-dire la structure des collections.
- Décrit les champs, types et relations entre les documents.
#### ➡️ Controllers
- Contient toutes les fonctions de l’API :
  - **Créer**
  - **Lire / Lister**
  - **Modifier**
  - **Supprimer**
- Pour les personnes et pour les articles.
 #### ➡️ Routes
- Contient toutes les routes permettant :
  - la création
  - la lecture
  - la modification
  - la suppression
- Utilise les méthodes HTTP : **POST**, **GET**, **PUT**, **DELETE**.
- Appelle les fonctions définies dans les controllers.
#### ➡️ Config
- Contient la fonction de connexion à la base de données **MongoDB**.

### 📁 Fichier *.env*
- Contient l’URL de connexion à la base de données.
- Permet de protéger les informations sensibles (identifiants, mots de passe…).
### 📁 Fichier *.gitignore*
- Empêche l’envoi de fichiers sensibles sur GitHub.
- Doit ignorer entre autres le fichier **.env** et **node_modules**.
### 📁 Fichier *README.md*
- Contient la documentation du projet.
## 🛠️ Technologies utilisées
- **JavaScript**
- **Node.js** avec Express
- **MongoDB** avec Mongoose
## 📋 Prérequis
- Avoir Node.js installé  
- Avoir Postman ou Insomnia  
- Connaître les bases du JavaScript  
- Avoir des notions de modélisation (relations entre tables/collections)  
- Comprendre les **codes de statut HTTP** (200, 201, 400, 404, 500…)
## 🚀 Utilisation du projet
1- Telecharger le projet [ici](https://github.com/diallo641/Projet_API_Rest__Gestion_Articles.git)
2- Ouvrez le projet avec votre editeur préféré
3- Lancer le terminal de l'editeur
4- Taper la commande **npm run server**
5- Verifier au niveau du console si vous avez une information qui vous dit: 
__server demaré avec le port 5000
__Base de donnée demare et connecte
6- Lancer Postman ou Insomnia
7- Choissisez votre besoin c'est à dire Post, Get, Delete ou Put
8- Tapez par exemple:  http://localhost:5000/API/AjouterPersonne pour ajouter uen personne
9- Arreter votre serveur local en tapant **CTL + c**

**Auteur** : ***Thierno Boubacar DIALLO***
