const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "recipes/recipe-default.webp"
    },
    ratings: [
        {
            ratingBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            rating: {
                type: Number,
                required: true,
            }
        }
    ],
},
    { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);