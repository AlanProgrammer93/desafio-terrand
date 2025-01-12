import React from 'react'
import './styles.css'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router';

const RecipeScreen = () => {
  const { idRecipe } = useParams();
  console.log(idRecipe);
  return (
    <>
      <Navbar />
      <div>RecipeScreen</div>
    </>
  )
}

export default RecipeScreen