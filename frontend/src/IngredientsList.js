import React, { useState, useEffect } from 'react';

function IngredientsList({ userId }) {
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState('');

    useEffect(() => {
        fetchUserIngredients();
    }, [userId]);

    const fetchUserIngredients = async () => {
        const response = await fetch(`/api/users/${userId}/ingredients`);
        const data = await response.json();
        setIngredients(data.ingredients);
    };

    const addIngredient = async () => {
        const response = await fetch(`/api/users/${userId}/ingredients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newIngredient, inStock: true })
        });
        const data = await response.json();
        setIngredients(data.ingredients);
        setNewIngredient('');
    };

    const toggleIngredient = async (ingredientId) => {
        const response = await fetch(`/api/users/${userId}/ingredients/${ingredientId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        setIngredients(data.ingredients);
    };

    return (
        <div className="ingredients-list">
            <h2>My Ingredients</h2>
            <div className="add-ingredient">
                <input
                    type="text"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="Add new ingredient"
                />
                <button onClick={addIngredient}>Add</button>
            </div>
            <div className="ingredients-checklist">
                {ingredients.map(ingredient => (
                    <label key={ingredient._id} className="ingredient-item">
                        <input
                            type="checkbox"
                            checked={ingredient.inStock}
                            onChange={() => toggleIngredient(ingredient._id)}
                        />
                        {ingredient.name}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default IngredientsList;
