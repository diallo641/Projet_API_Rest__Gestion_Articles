const mongoose= require('mongoose');

const articleSchema = mongoose.Schema(
    {
        titre:
        {
            type: String,
            trim: true,
            required: true
        },
        contenu:
        {
            type: String,
            trim: true,
            required: true
        },
        image: 
        {
            type: String,
            trim: true,
            required: true
        
        },
        categorie:
        {
            type: String,
            trim: true,
            required: true
        },
        auteur:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Personnes",
            required: true
        }
    },
    {timestamps: true}
);

module.exports= mongoose.model("Articles", articleSchema);