const express = require('express');
const { ajouterarticle, articles, unarticle, supprimerarticle, modifier } = require('../controllers/article');
const router = express.Router();

router.post("/ajouterarticle", ajouterarticle);
router.get("/articles", articles);
router.get("/article/:id", unarticle);
router.delete("/delete/:id", supprimerarticle);
router.put("/editer/:id", modifier);

module.exports= router;