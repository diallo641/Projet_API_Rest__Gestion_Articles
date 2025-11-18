const mongoose = require('mongoose');

const personneSchema = mongoose.Schema(
    {
        nom:
        {
            type: String,
            required: true,
            trim: true
        },
        prenom:
        {
            type: String,
            required: true,
            trim: true
        },
        email:
        {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        mot_de_passe:
        {
            type: String,
            required: true,
            trim: true
        },
        telephone:
        {
            type: Number,
            required: true,
            trim: true,
            unique: true
        },
        adresse:
        {
            type: String,
            required: true,
        }  
    },
    {
      timestamps: true
    }
);

module.exports= mongoose.model("Personnes", personneSchema)