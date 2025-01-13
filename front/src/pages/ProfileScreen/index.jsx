import React, { useEffect, useState } from 'react'
import './styles.css'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';
import ModalForm from '../../components/ModalForm';
import clientAxios from '../../utils/axios';

const ProfileScreen = () => {
    const { user } = useSelector((state) => state.user);

    const [modalForm, setModalForm] = useState(false)
    const [ownRecipes, setOwnRecipes] = useState([])

    useEffect(() => {
        getOwnRecipes()
    }, [])

    const getOwnRecipes = async () => {
        await clientAxios.get('/recipe/own-recipes', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(res => {
                setOwnRecipes(res.data.recipes)
            })
            .catch(err => {

            });
    }

    console.log(ownRecipes);


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
                    ownRecipes ? ownRecipes.map(recipe => (
                        <RecipeCard
                            key={recipe._id}
                            id={recipe._id}
                            image={`http://localhost:5000/${recipe.image}`}
                            title={recipe.name}
                            description={recipe.description}
                            ingredients={recipe.ingredients}
                            ratings={recipe.ratings}
                        />
                    )) : (
                        <div>
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