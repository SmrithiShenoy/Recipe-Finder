const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/recipesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to recipesDB database'))
.catch(err => console.error('MongoDB connection error:', err));

mongoose.connect('mongodb://localhost:27017/recipesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to recipesDB database');
    return mongoose.createConnection('mongodb://localhost:27017/recipesDB');
})
.then(() => {
    console.log('Connected to recipesDB database');
})
.catch(err => console.error('MongoDB connection error:', err));


const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    instructions: String,
    prepTime: String,
    cookingTime: String,
    servings: Number,
    imageUrl: String,
    category: String,
    cuisine: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// User routes
app.post('/api/users/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await mongoose.connection.collection('users').findOne({ email, password });
        
        if (user) {
            res.json({ 
                success: true, 
                searchHistory: user.searchHistory || [] 
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Recipe routes
app.get('/api/recipes', async (req, res) => {
    const recipes = await Recipe.find({});
    res.json(recipes);
});

app.post('/api/recipes/search', async (req, res) => {
    try {
        const { ingredients, email } = req.body;
        
        // Update user's search history if email is provided
        if (email) {
            await mongoose.connection.collection('users').updateOne(
                { email },
                { $push: { searchHistory: { $each: ingredients } } }
            );
        }

        const recipes = await Recipe.find({
            ingredients: { $in: ingredients }
        });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/recipes/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});
