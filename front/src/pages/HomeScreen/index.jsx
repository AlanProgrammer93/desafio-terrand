import React, { useEffect } from 'react'
import './styles.css'
import Navbar from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import clientAxios from '../../utils/axios';
import RecipeCardHome from '../../components/RecipeCardHome';
import { addRecipes } from '../../store/recipeReducer';
import { SERVER } from '../../constants';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipes);

  useEffect(() => {
    getRecipes()
  }, [])

  const getRecipes = async () => {
    await clientAxios.get('/recipe')
      .then(res => {
        dispatch(addRecipes(res.data.recipes));
      })
      .catch(err => {

      });
  }
  
  return (
    <div className="home_container">
      <Navbar />
      <div className="home_main">
        {
          recipes ? recipes.map(recipe => (
            <RecipeCardHome
              key={recipe._id}
              id={recipe._id}
              image={`${SERVER}${recipe.image}`}
              title={recipe.name}
              description={recipe.description}
              ingredients={recipe.ingredients}
              ratings={recipe.ratings}
              postedBy={recipe.postedBy}
            />
          )) : (
            <div>
              <p>No hay ninguna receta publicada.</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default HomeScreen