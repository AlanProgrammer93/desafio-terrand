import React, { useEffect, useState } from 'react'
import './styles.css'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux';
import clientAxios from '../../utils/axios';
import RecipeCardHome from '../../components/RecipeCardHome';

const HomeScreen = () => {
  const { user } = useSelector((state) => state.user);
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes()
  }, [])

  const getRecipes = async () => {
    await clientAxios.get('/recipe')
      .then(res => {
        setRecipes(res.data.recipes)
      })
      .catch(err => {

      });
  }
  console.log(recipes);
  
  return (
    <div className="home_container">
      <Navbar />
      <div className="home_main">
        {
          recipes ? recipes.map(recipe => (
            <RecipeCardHome
              key={recipe._id}
              id={recipe._id}
              image={`http://localhost:5000/${recipe.image}`}
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