const express = require('express');
const Recipe = require('../models/Recipe');

const router = express.Router();

router.get('/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        // Ensure instructions is always an array
        if (!Array.isArray(recipe.instructions)) {
            recipe.instructions = recipe.instructions ? [recipe.instructions] : [];
        }
        
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;