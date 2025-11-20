const personneModel = require('../models/personne.js');
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
            const telephoneunique = await personneModel.findOne({telephone: req.body.telephone})
            if(emailunique) 
                {return res.status(404).json({message: "email existe deja"})}
            else
            { 
                if(telephoneunique){return res.status(404).json({message: "numero telephone existe deja"})}
                const personnenouveau = await personneModel.create(req.body);
                console.log("personne ajoute")
                return res.status(201).json({message: "Utilisateur creer avec succés!", personnenouveau});
            }
            

        }

    }
    catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

//Afficher l'ensemble des personne de notre base
module.exports.personnes = async(req,res) =>
{
    try
    {
       const liste = await personneModel.find()
       if(liste.lenght==0)
       {
        return res.status(200).json({message: "liste de prsonne vide"})}
        else
        {
           return res.status(200).json({
            message : "Voici la liste des personne",
        personnes: liste})
        }
    }
     catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

//Une seule personne
module.exports.unepersonne= async(req, res) =>
{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id))
    {return res.statis(400).json({message: "L'identifiant que vous avez fournit ne correspond pas aux regle de la base"})}
    else
    {
        try
        {
            const idexistant = await personneModel.findById(id)
            if(!idexistant)
            {return res.status(404).json({message: "La personne que vous demandez n'existe pas sur la base de donnée"})}
            else
            {return res.status(200).json({message: "voici la personne: ", 
                nom: idexistant.nom,
                prenom: idexistant.prenom,
                email: idexistant.email,
                telephone: idexistant.telephone,
                adresse: idexistant.adresse
            })}

        }
        catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }

    }
};

//supprimer une personne
module.exports.supprimerpersonne = async(req, res) =>
{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
    {return res.status(400).json({message: "Identifiant non valide"})}
    else
    {
        try
        {
            const idvalide= await personneModel.findById(id)
            if(!idvalide) {return res.status(404).json({message: "La personne que vous voulez supprimer n'existe pas sur la base"})}
            else
            {
                const personneàsupprimer = await personneModel.findByIdAndDelete(id)
                return res.status(200).json({message: "personne supprimé avec succés"})
            }

        }
        catch(err){
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
    }
};

// Modifier les informations d'une personne

module.exports.modifierpersonne = async (req, res) => {
    const id = req.params.id;

    // Vérifier que req.body existe
    if (!req.body) {
        return res.status(400).json({ message: "Aucune donnée envoyée" });
    }

    const { nom, prenom, email, mot_de_passe, telephone, adresse } = req.body;

    if (!email || !telephone) {
        return res.status(400).json({ message: "Les champs email et téléphone sont requis" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Identifiant invalide" });
    }

    try {
        // Vérifier que la personne existe
        const personneexistant = await personneModel.findById(id);
        if (!personneexistant) {
            return res.status(404).json({ message: "Cette personne n'existe pas" });
        }

        // Vérifier unicité email en excluant la personne actuelle
        const emailunique = await personneModel.findOne({ email: email, _id: { $ne: id } });
        if (emailunique) {
            return res.status(400).json({ message: "L'email existe déjà pour une autre personne" });
        }

        // Vérifier unicité téléphone en excluant la personne actuelle
        const telephoneunique = await personneModel.findOne({ telephone: telephone, _id: { $ne: id } });
        if (telephoneunique) {
            return res.status(400).json({ message: "Le numéro de téléphone appartient déjà à quelqu'un d'autre" });
        }

        // Mettre à jour la personne
        const personneediter = await personneModel.findByIdAndUpdate(
            id,
            { nom, prenom, email, mot_de_passe, telephone, adresse },
            { new: true }
        );

        return res.status(200).json({ message: "Personne modifiée avec succès", personneediter });

    } catch (err) {
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

