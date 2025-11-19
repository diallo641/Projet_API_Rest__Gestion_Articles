const personneModel = require('../models/personne');
const mongoose= require('mongoose');

//Ajouter une personne
module.exports.ajouterpersonne = async(req, res) =>
{
    try
    {
        const {nom, prenom, email, mot_de_passe, telephone, adresse}= req.body
        if(!nom || !prenom || !email || !mot_de_passe || !telephone || !adresse)
        {
            return res.status(400).json({message: "Aucun champs ne doit etre vide pour la creation"})
        }
        else
        {
            const emailunique = await personneModel.findOne({email : req.body.email})
            if(emailunique) 
                {return res.status(404).json({message: "email existe deja"})}
            else
            {const personne = await personneModel.create(req.body)}
            return res.status(200).json({message: "Utilisateur creer avec succés!", personne});

        }

    }
    catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
}