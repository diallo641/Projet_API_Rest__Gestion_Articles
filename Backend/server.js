const express = require("express");
const path = require("path")
const app =express();
const port = 5000;
const connexionBaseDonnee = require('./config/base_de_donnees');

//Middleware 
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Appelle de la fonction connexion
connexionBaseDonnee();

//ecouteur du serveur
app.listen(port , () => console.log("le serveur pour l'API des articles a demaré au port N° : " + port));
