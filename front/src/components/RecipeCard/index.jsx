import React, { useState } from 'react'
import './styles.css'
import { HiDotsVertical } from 'react-icons/hi'
import ModalForm from '../ModalForm'
import { useNavigate } from 'react-router'
import clientAxios from '../../utils/axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addOwnRecipes } from '../../store/ownRecipeReducer'

const RecipeCard = ({ id, image, title, description, ingredients, ratings }) => {
    const dispatch = useDispatch();
    const router = useNavigate();

    const [showMenu, setShowMenu] = useState(false)
    const [modalForm, setModalForm] = useState(false)

    const stars = Math.floor(
        ratings.reduce((sum, rat) => sum + rat.rating, 0) / ratings.length
    );

    const handleSeeMore = () => {
        router(`/${id}`);
    }

    const handleDelete = async () => {
        await clientAxios.delete(`/recipe/delete/${id}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(res => {
                toast.success(res.data.msg);
                dispatch(addOwnRecipes(res.data.recipes));
            })
            .catch(err => toast.error(err.response.data.msg))
    }
    return (
        <div className="recipe_card">
            <div className='recipe_card_container'>
                <img src={image} alt="Imagen de la receta" />
                <div className="recipe_content">
                    <h2 className="recipe_title" onClick={handleSeeMore}>{title}</h2>
                    <p className="recipe_description">
                        {description.length < 150 ? description : description.slice(0, 150) + " ..."}
                    </p>
                    <p className="recipe_ingredients"><strong>Ingredientes: </strong>
                        {ingredients.length < 150 ? ingredients : ingredients.slice(0, 150) + " ..."}
                    </p>
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
            </div>
            <div className='recipe_menu'>
                <HiDotsVertical onClick={() => setShowMenu(!showMenu)} />
                {
                    showMenu && (
                        <div className='menu_options'>
                            <div className='option' onClick={() => setModalForm(true)}>
                                Editar
                            </div>
                            <div className='option' onClick={handleDelete}>
                                Eliminar
                            </div>
                        </div>
                    )
                }
            </div>
            {
                modalForm &&
                <ModalForm
                    setModalForm={setModalForm}
                    id={id}
                    nameEdit={title}
                    descriptionEdit={description}
                    ingredientsEdit={ingredients}
                    imageEdit={image}
                />
            }
        </div>
    )
}

export default RecipeCard