const express= require('express');
const { ajouterpersonne, personnes, unepersonne, supprimerpersonne, modifierpersonne } = require('../controllers/personne');
const router = express.Router();

//Route pour ajouter une personne
router.post("/ajouterunepersonne", ajouterpersonne);
router.get("/allpersonnes", personnes);
router.get("/personne/:id", unepersonne);
router.delete("/delete/:id", supprimerpersonne);
router.put("/editer/:id", modifierpersonne);
module.exports=router;