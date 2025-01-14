import React, { useEffect, useState } from 'react'
import './styles.css'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router';
import clientAxios from '../../utils/axios';

const RecipeScreen = () => {
  const { idRecipe } = useParams();
  const [recipe, setRecipe] = useState()

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
  return (
    <>
      <Navbar />
      <div>
        {
          recipe ? (
            <div>
              {recipe.description}
            </div>
          ) : (
            <div>No existe la receta</div>
          )
        }
      </div>
    </>
  )
}

export default RecipeScreen