import React, { useRef, useState } from 'react'
import './styles.css'
import useClickOutside from '../../utils/clickOutside';
import CustomInput from '../CustomInput';
import CustomTextarea from '../CustomTextarea';
import clientAxios from '../../utils/axios';

const ModalForm = ({ setModalForm }) => {
    const popup = useRef(null);
    useClickOutside(popup, () => setModalForm(false));

    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        ingredients: ''
    })

    const { name, description, ingredients } = recipe;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prev => ({ ...prev, [name]: value }));
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    const [loading, setLoading] = useState(false)
    const handleSaveRecipe = async () => {
        setLoading(true)

        if (!name || !description || !ingredients) {
            alert("Debes completar todos los campos.")
            return
        }

        let formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("ingredients", ingredients);

        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        await clientAxios.post("/recipe", formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                setRecipe({ name: '', description: '', ingredients: '' })
                setSelectedImage(null)
            })
            .catch(err => alert("Ocurrio un problema en el servidor. Intentelo de nuevo."))
            .finally(e => {
                setLoading(false)
            })
    };

    return (
        <div className='blur'>
            <div className='modal_container' ref={popup}>
                <h1 className='modal_title'>Publicar Receta</h1>
                <div className='modal_form'>
                    <CustomInput
                        name="name"
                        value={name}
                        placeholder="Nombre de la receta"
                        onChange={handleChange}
                    />

                    <CustomTextarea
                        name='description'
                        value={description}
                        placeholder={'Describe tu receta'}
                        onChange={handleChange}
                    />

                    <CustomTextarea
                        name='ingredients'
                        value={ingredients}
                        placeholder={'Listar los ingredientes'}
                        onChange={handleChange}
                    />

                    <div className='upload_image'>
                        <label htmlFor="image" className='modal_upload'>
                            Subir Imagen
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            className='modal_input'
                            hidden
                            onChange={handleImageChange}
                        />
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Vista previa"
                            />
                        )}
                    </div>

                    <button className='modal_button' onClick={handleSaveRecipe}>
                        Publicar Receta
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalForm