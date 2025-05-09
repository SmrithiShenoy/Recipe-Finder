const mongoose = require('mongoose');

// Define the Recipe Schema
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    prepTime: {
        type: String,
        required: true
    },
    cookingTime: {
        type: String,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    }
});

// Create and export the Recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
