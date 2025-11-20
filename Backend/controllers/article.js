const mongoose= require('mongoose');
const articleModel= require('../models/article');
const personneModel = require('../models/personne')

module.exports.ajouterarticle = async(req, res ) =>
{
    try
    {
        const {titre, contenu, image, categorie, auteur} = req.body
        if(!titre || !contenu || !image || !categorie || !auteur)
        {return res.status(400).json({message: "Aucun champs ne doit etre vide"})}
        else
        {
            const utilsateurexistant = await personneModel.findById(auteur);
            if(!utilsateurexistant)
            {return res.status(404).json({message: "Auteur ou responsable n'existe pas"})}
            else
            {
                const nouveauarticle = await articleModel.create(
                    req.body)
                return res.status(201).json({
                    message: "Article ajouté avec succés!", 
                    titre: nouveauarticle.titre,
                    contenu: nouveauarticle.contenu,
                    Url_image: nouveauarticle.image,
                    categorie: nouveauarticle.categorie,
                    author: nouveauarticle.auteur
       
                 })
            }
        }

    }
    catch (err) {
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }           
};

//Avoir toutes les articles
module.exports.articles = async(req, res) =>
{
    try
    {
        const listearticles = await articleModel.find().populate("auteur", "nom prenom email");
        if(listearticles.lenght==0)
        {
            return res.status(2002).json({message: "Aucun article disponible"})
        }
        else
        {
            
            console.log(`Liste disponible: ${listearticles.length}`);
            return res.status(200).json({messsage: "Voici la liste des articles", 
                                         article: listearticles})
        }

    }
    catch (err) {
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

//Avoir un seul article
module.exports.unarticle = async(req, res) =>
{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
    {return res.status(404).json({message: "Id invalide ou ne repond pas aux normes de mongoose"})}
    else
    {
        try
        {
            const articleexistant = await articleModel.findById(id).populate("auteur", "nom prenom email")
            if(!articleexistant)
            {return res.status(404).json({message: "Cet article n'existe pas"})}
            else
            {
                console.log('article existant');
                return res.status(200).json({
                    message: "Voici l'article",
                    titre: articleexistant.titre,
                    contenu: articleexistant.contenu,
                    categorie: articleexistant.categorie,
                    author: articleexistant.auteur

                })
            }

        }
        catch (err) {
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }

    }
};

//Supprimer artcile
module.exports.supprimerarticle= async(req, res) =>
{
    const id= req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
    {return res.status(404).json({message: "Id invalide"})}
    else
    {
        try
        {
            const articleàasupprimer = await articleModel.findByIdAndDelete(id)
            if(!articleàasupprimer)
            {return res.status(400).json({message: "Article choisit pour la suppression n'existe pas sur la base"})}
            else
            {
                return res.status(200).json({message: "Article supprimer", titre: articleàasupprimer.titre})
            }

        }
        catch (err) {
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
    }
};

//Modifier article
module.exports.modifier = async(req,res) =>
{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
    {return res.status(404).json({message: "ID demandé n'est pas valide"})}
    else
    {
        try
        {
            const articlechercher = await articleModel.findById(id)
            if(!articlechercher)
                return res.status(400).json({message: "Article demande pour modification n'existe pas"})
            else
            {
                const articlemodifier = await articleModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
                return res.status(201).json({
                    message: "Voici l'article modifié",
                    titre: articlemodifier.titre,
                    contenu: articlemodifier.contenu,
                    categorie: articlemodifier.categorie,
                    author: articlemodifier.auteur
                })
            }

        }
        catch (err) {
        console.error("Erreur serveur :", err);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
    }
};