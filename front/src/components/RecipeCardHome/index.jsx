import React from 'react'
import './styles.css'

const RecipeCardHome = ({ id, image, title, description, ingredients, ratings, postedBy }) => {
  return (
    <div className="recipe_card_home">
      <div className='info_recipe'>
        <img src={image} alt="Imagen de la receta" />
        <h1>{title}</h1>
        <span>Publicado por <strong>{postedBy.name} {postedBy.lastname}</strong></span>
        {
          ratings.length ? (
            <div className="recipe_rating">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <span className="rating_number">5</span>
            </div>
          ) : (
            <p>No tiene calificaciones</p>
          )
        }
      </div>
      <div className='card_home_container'>
        <div className='card_home_main'>
          <h2>Descripcion de la receta</h2>
          <p>{description}</p>
          <h2>Ingredientes</h2>
          <p>{ingredients}</p>
        </div>
        {
          ratings.length ? (
            <div className="recipe_rating">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <span className="rating_number">5</span>
            </div>
          ) : (
            <p>No tiene calificaciones</p>
          )
        }
      </div>
    </div>
  )
}

export default RecipeCardHome