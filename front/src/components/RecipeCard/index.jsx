import React from 'react'
import './styles.css'
import { HiDotsVertical } from 'react-icons/hi'

const RecipeCard = ({ image, title, description, ingredients, ratings }) => {
    return (
        <div className="recipe_card">
            <div className='recipe_card_container'>
                <img src={image} alt="Imagen de la receta" />
                <div className="recipe_content">
                    <h2 className="recipe_title">{title}</h2>
                    <p className="recipe_description">{description}</p>
                    <p className="recipe_ingredients"><strong>Ingredientes:</strong>{ingredients}</p>
                    <div className="recipe_rating">
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                        <span className="rating_number">5.0</span>
                    </div>
                </div>
            </div>
            <div className='recipe_menu'>
                <HiDotsVertical />
            </div>
        </div>
    )
}

export default RecipeCard