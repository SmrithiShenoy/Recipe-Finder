import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipePage.css';

function RecipePage() {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`http://localhost:4000/api/recipes/${id}`);
            const data = await response.json();
            setRecipe(data);
        };
        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="recipe-wrapper">
            <div className="recipe-container">
                <div className="recipe-content">
                    <h4>{recipe.title}</h4>
                    <img src={recipe.imageUrl} alt={recipe.title} />
                    <div className="recipe-info">
                        <p>Preparation Time: {recipe.prepTime}</p>
                        <p>Cooking Time: {recipe.cookingTime}</p>
                        <p>Servings: {recipe.servings}</p>
                        <p>Cuisine: {recipe.cuisine}</p>
                    </div>
                    <div className="ingredients">
                        <h5>Ingredients</h5>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="instructions">
                        <h5>Instructions</h5>
                        {Array.isArray(recipe.instructions) ? (
                            recipe.instructions.map((step, index) => (
                                <p key={index}>{step}</p>
                            ))
                        ) : (
                            <p>{recipe.instructions}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipePage;
