import React, { useEffect, useState } from 'react'
import './styles.css'
import Navbar from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';
import ModalForm from '../../components/ModalForm';
import clientAxios from '../../utils/axios';
import { SERVER } from '../../constants';
import { addOwnRecipes } from '../../store/ownRecipeReducer';
import Spinner from '../../components/Spinner';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    //const { ownRecipes } = useSelector((state) => state.ownRecipes);
    const [ownRecipes, setOwnRecipes] = useState([])

    const [modalForm, setModalForm] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getOwnRecipes()
    }, [])

    const getOwnRecipes = async () => {
        //setLoading(true)
        await clientAxios.get('/recipe/own-recipes', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(res => {
                //dispatch(addOwnRecipes(res.data.recipes));
                setOwnRecipes(res.data.recipes)
            })
            .finally(e => {
                setLoading(false)
            })
    }
    return (
        <div className='profile_container'>
            <Navbar />
            <div className='profile_main'>
                <div className='profile_info'>
                    <img src='/perfil.webp' />
                    <h2>{user.name} {user.lastname}</h2>
                </div>
                <div className='profile_add_recipe'>
                    <h4>Recetas Publicadas: {ownRecipes.length}</h4>
                    <button onClick={() => setModalForm(true)} >Nueva Receta</button>
                </div>
            </div>
            <div className="profile_recipes">
                {
                    ownRecipes.length ? ownRecipes.map(recipe => (
                        <RecipeCard
                            key={recipe._id}
                            id={recipe._id}
                            image={`${SERVER}${recipe.image}`}
                            title={recipe.name}
                            description={recipe.description}
                            ingredients={recipe.ingredients}
                            ratings={recipe.ratings}
                        />
                    )) : loading ? (
                        <div className='recipe_loading'>
                            <Spinner />
                        </div>
                    )
                        : (
                            <div className='recipe_loading'>
                                <p>Aun no tienes ninguna receta publicada.</p>
                            </div>
                        )
                }
            </div>
            {
                modalForm && <ModalForm setModalForm={setModalForm} />
            }
        </div>
    )
}

export default ProfileScreen