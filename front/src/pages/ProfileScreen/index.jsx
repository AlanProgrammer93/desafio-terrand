import React, { useState } from 'react'
import './styles.css'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';
import ModalForm from '../../components/ModalForm';

const ProfileScreen = () => {
    const { user } = useSelector((state) => state.user);
    console.log(user);
    const [modalForm, setModalForm] = useState(false)


    return (
        <div className='profile_container'>
            <Navbar />
            <div className='profile_main'>
                <div className='profile_info'>
                    <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' />
                    <h2>{user.name} {user.lastname}</h2>
                </div>
                <div className='profile_add_recipe'>
                    <h4>Recetas Publicadas: 0</h4>
                    <button onClick={() => setModalForm(true)} >Nueva Receta</button>
                </div>
            </div>
            <div className="profile_recipes">
                <RecipeCard
                    image={'https://s2.abcstatics.com/abc/sevilla/media/gurmesevilla/2012/01/comida-rapida-casera.jpg'}
                    title={'Ensalada César'}
                    description={'Una deliciosa y saludable ensalada César para disfrutar. Una deliciosa y saludable ensalada César para disfrutar. Una deliciosa y saludable ensalada César para disfrutar. Una deliciosa y saludable ensalada César para disfrutar.'}
                    ingredients={'Lechuga, pollo, queso parmesano, aderezo César, Lechuga, pollo, queso parmesano, aderezo César, Lechuga, pollo, queso parmesano, aderezo César.'}

                />
            </div>

            {
                modalForm && <ModalForm setModalForm={setModalForm} />
            }
        </div>
    )
}

export default ProfileScreen