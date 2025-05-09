import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipePage from './RecipePage';
import SignIn from './SignIn';
import './App.css';

function App() {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [activeTab, setActiveTab] = useState('HOME');
    const [userEmail, setUserEmail] = useState('');  // New state for user email

    const fetchRecipes = async () => {
        try {
            if (!ingredients.trim()) {
                const response = await fetch('http://localhost:4000/api/recipes');
                const data = await response.json();
                setRecipes(data);
            } else {
                const response = await fetch('http://localhost:4000/api/recipes/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ingredients: ingredients.split(',').map((ing) => ing.trim()),
                        email: userEmail  // Include user email in search request
                    }),
                });
                const data = await response.json();
                setRecipes(data);
            }
        } catch (error) {
            console.error(error);
            setRecipes([]);
        }
    };

    const renderMainContent = () => {
        if (activeTab === 'HOME') {
            return <Home />;
        }
        if (activeTab === 'SEARCH') {
            return (
                <div className="search-page">
                    <div className="search-container">
                        <input
                            type="text"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            placeholder="Enter ingredients, separated by commas"
                            className="search-input"
                        />
                        <button onClick={fetchRecipes} className="search-button">
                            Search Recipes
                        </button>
                    </div>
                    <div className="recipe-list">
                        {recipes.length > 0 ? (
                            recipes.map((recipe) => (
                                <div key={recipe._id} className="recipe-card">
                                    <img src={recipe.imageUrl} alt={recipe.title} />
                                    <div className="recipe-card-content">
                                        <h3>{recipe.title}</h3>
                                        <p>Cooking Time: {recipe.cookingTime}</p>
                                        <Link to={`/recipe/${recipe._id}`}>View Recipe</Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-recipes">No recipes found. Try different ingredients!</p>
                        )}
                    </div>
                </div>
            );
        }
    };

    return (
        <Router>
            <div className="app-container">
                <header className="App-header">
                    <div className="App-logo">CLEAR YOUR FRIDGE!</div>
                    <nav className="App-nav">
                        <Link to="/" onClick={() => setActiveTab('HOME')} className={activeTab === 'HOME' ? 'active' : ''}>
                            Home
                        </Link>
                        <Link to="/" onClick={() => setActiveTab('SEARCH')} className={activeTab === 'SEARCH' ? 'active' : ''}>
                            Search
                        </Link>
                        <Link to="/signin" onClick={() => setActiveTab('SIGNIN')} className={activeTab === 'SIGNIN' ? 'active' : ''}>
                            Sign In
                        </Link>
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={renderMainContent()} />
                    <Route path="/recipe/:id" element={<RecipePage />} />
                    <Route path="/signin" element={<SignIn setUserEmail={setUserEmail} />} />
                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div className="Home">
            <div className="image-container">
                <div className="left-images">
                    <img
                        src="https://images.pexels.com/photos/4736336/pexels-photo-4736336.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Left Image 1"
                        className="side-image"
                    />
                    <img
                        src="https://images.pexels.com/photos/28086834/pexels-photo-28086834/free-photo-of-bread-with-fruit-slices.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Left Image 2"
                        className="side-image"
                    />
                </div>

                <div className="home-background">
                    <h2>Welcome to Clear Your Fridge!</h2>
                    <p>
                        Introducing Clear Your Fridge, the ultimate solution for reducing food waste while
                        saving money and the planet! By entering the ingredients you already have, you'll
                        unlock meal ideas tailored to your pantry, ensuring nothing goes to waste. Whether
                        you're a seasoned chef or a kitchen novice, Clear Your Fridge simplifies meal planning
                        while cutting grocery expenses. Clear Your Fridge empowers you to save time, money, and
                        the environment—all while enjoying home-cooked meals you'll love. Start your journey
                        towards smarter cooking today!
                    </p>
                </div>

                <div className="right-images">
                    <img
                        src="https://images.pexels.com/photos/5837108/pexels-photo-5837108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Right Image 1"
                        className="side-image"
                    />
                    <img
                        src="https://www.veganricha.com/wp-content/uploads/2024/06/Rara-Chicken-Tofu-Curry-2731.jpg"
                        alt="Right Image 2"
                        className="side-image"
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
