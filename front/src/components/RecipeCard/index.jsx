import React, { useState } from 'react'
import './styles.css'
import { HiDotsVertical } from 'react-icons/hi'
import ModalForm from '../ModalForm'

const RecipeCard = ({ id, image, title, description, ingredients, ratings }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [modalForm, setModalForm] = useState(false)
    console.log(ratings.length);

    return (
        <div className="recipe_card">
            <div className='recipe_card_container'>
                <img src={image} alt="Imagen de la receta" />
                <div className="recipe_content">
                    <h2 className="recipe_title">{title}</h2>
                    <p className="recipe_description">{description}</p>
                    <p className="recipe_ingredients"><strong>Ingredientes: </strong>{ingredients}</p>
                    {
                        ratings.length ? (
                            <div className="recipe_rating">
                                <div className="stars">⭐⭐⭐⭐⭐</div>
                                <span className="rating_number">5</span>
                            </div>
                        ) : (
                            <p>No tienes calificaciones</p>
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
                            <div className='option'>
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