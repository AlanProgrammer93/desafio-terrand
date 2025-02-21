import React from 'react'
import './styles.css'
import Rating from '../Rating'
import { useDispatch, useSelector } from 'react-redux';
import clientAxios from '../../utils/axios';
import { useNavigate } from 'react-router';
//import { updateRecipe } from '../../store/recipeReducer';
import { toast } from 'react-toastify';
import { updateRecipe } from '../../store/testRecipeReducer';

const RecipeCardHome = ({ id, image, title, description, ingredients, ratings, postedBy }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const router = useNavigate();

  const rating = ratings.find(rat => rat.ratingBy._id === user?.id)
  const stars = Math.floor(
    ratings.reduce((sum, rat) => sum + rat.rating, 0) / ratings.length
  );

  const handleRating = async (value) => {
    if (!user) {
      toast.error("Debes iniciar sesion.");
      return
    }

    await clientAxios.put('/recipe/rating', { id, value },
      {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(res => {
        toast.success(res.data.msg);
        dispatch(updateRecipe({ id, user: { _id: user.id, name: user.name, lastname: user.lastname }, rating: value }));
      })
      .catch(err => toast.error("Ocurrio un problema en el servidor. Intentelo de nuevo."))
  }

  const handleSeeMore = () => {
    router(`/${id}`);
  }
  
  return (
    <div className="recipe_card_home">
      <div className='info_recipe'>
        <img src={image} alt="Imagen de la receta" />
        <h1>{title}</h1>
        <span>Publicado por <strong>{postedBy.name} {postedBy.lastname}</strong></span>
        {
          ratings.length ? (
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
      <div className='card_home_container'>
        <div className='card_home_main'>
          <h2>Descripcion de la receta</h2>
          <p>{description.length < 200 ? description : description.slice(0, 200) + " ..."}</p>
          <h2>Ingredientes</h2>
          <p>{ingredients.length < 200 ? ingredients : ingredients.slice(0, 200) + " ..."}</p>
        </div>
        <div className='card_home_bottom'>
          <Rating handleRating={handleRating} rating={rating ? rating.rating : 0} />
          <button onClick={handleSeeMore}>Ver Receta</button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(RecipeCardHome)