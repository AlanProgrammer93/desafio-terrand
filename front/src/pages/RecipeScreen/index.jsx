import React, { useEffect, useState } from 'react'
import './styles.css'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router';
import clientAxios from '../../utils/axios';
import { useSelector } from 'react-redux';
import Rating from '../../components/Rating';

const RecipeScreen = () => {
  const { idRecipe } = useParams();
  const { user } = useSelector((state) => state.user);

  const [recipe, setRecipe] = useState()
  const [loading, setLoading] = useState(false)

  const rating = recipe?.ratings.find(rat => rat.ratingBy._id === user?.id)
  const stars = Math.floor(
    recipe?.ratings.reduce((sum, rat) => sum + rat.rating, 0) / recipe?.ratings.length
  );

  useEffect(() => {
    getRecipe()
  }, [])

  const getRecipe = async () => {
    await clientAxios.get(`/recipe/${idRecipe}`)
      .then(res => {
        setRecipe(res.data.recipe)
      })
      .catch(err => {

      });
  }

  const handleRating = async (value) => {
    setLoading(true)
    if (!user) {
      alert("Debes iniciar sesion.")
      return
    }

    await clientAxios.put('/recipe/rating', { id: recipe._id, value },
      {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(res => {
        alert(res.data.msg)
        if (rating) {
          setRecipe((prev) => ({
            ...prev,
            ratings: prev.ratings.map((rating) =>
              rating.ratingBy._id === user.id ? { ...rating, rating: value } : rating
            )
          }));
        } else {
          setRecipe((prev) => ({
            ...prev,
            ratings: [...prev.ratings, { rating: value, ratingBy: { _id: user.id, name: user.name, lastname: user.lastname } }],
          }));
        }
      })
      .catch(err => alert("Ocurrio un problema en el servidor. Intentelo de nuevo."))
      .finally(e => {
        setLoading(false)
      })
  }
  return (
    <div className='recipe_container'>
      <Navbar />
      <div className="recipe_main">
        {
          recipe ? (
            <>
              <div className='recipe_header'>
                <h1>{recipe.name}</h1>
                <span>Publicado por
                  <strong> {recipe.postedBy.name} {recipe.postedBy.lastname}</strong>
                </span>
              </div>
              <div className='recipe_body'>
                <h2>Descripcion de la receta</h2>
                <p>{recipe.description}</p>
                <h2>Ingredientes</h2>
                <p>{recipe.ingredients}</p>
              </div>

              <div className='recipe_footer'>
                <div className='recipe_rating_footer'>
                  <p>Deja tu puntuacion</p>
                  <Rating handleRating={handleRating} rating={rating ? rating.rating : 0} />
                </div>
                {
                  recipe.ratings.length ? (
                    <div className="recipe_rating">
                      <div className="stars">
                        {Array.from({ length: stars }, (_, index) => (
                          <p key={index}>⭐</p>
                        ))}
                      </div>
                      <span className="rating_number">{stars}</span>
                    </div>
                  ) : (
                    <p>No tiene calificaciones</p>
                  )
                }
              </div>
            </>
          ) : (
            <div>No existe la receta</div>
          )
        }
      </div>
    </div>
  )
}

export default RecipeScreen