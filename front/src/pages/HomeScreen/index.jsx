import React, { useEffect, useState } from 'react'
import './styles.css'
import Navbar from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import clientAxios from '../../utils/axios';
import RecipeCardHome from '../../components/RecipeCardHome';
import { addRecipes } from '../../store/recipeReducer';
import { SERVER } from '../../constants';
import Spinner from '../../components/Spinner';
import { fetchRecipes } from '../../store/testRecipeReducer';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipes);
  //const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  /* const { testRecipes, loading, error } = useSelector((state) => state.testRecipes);
  useEffect(() => {
    if (testRecipes?.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, testRecipes?.length]); */

  useEffect(() => {
    getRecipes()
  }, [])

  const getRecipes = async () => {
    await clientAxios.get('/recipe')
      .then(res => {
        dispatch(addRecipes(res.data.recipes));
        //setRecipes(res.data.recipes)
      })
      .finally(e => setLoading(false))
  }
  
  return (
    <div className="home_container">
      <Navbar />
      <div className="home_main">
        {
          recipes.length ? recipes.map(recipe => (
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
          )) : loading ? <Spinner />
            : <p>No Hay Recetas Publicadas</p>
        }
      </div>
    </div>
  )
}

export default HomeScreen