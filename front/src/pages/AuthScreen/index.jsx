import React, { useState } from 'react'
import './styles.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import clientAxios from '../../utils/axios';
import { addUser } from '../../store/userReducer';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const AuthScreen = () => {
  const [loading, setLoading] = useState(false)
  const [showLogin, setShowLogin] = useState(false);
  const [authState, setAuthState] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const dispatch = useDispatch();

  const router = useNavigate();

  const { name, lastname, email, password, confirmPassword } = authState;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthState(prev => ({ ...prev, [name]: value }));
  }

  const register = (e) => {
    e.preventDefault();
    setLoading(true)
    if (!name || !lastname || !email || !password || !confirmPassword) {
      alert('Todos los campos son requeridos')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    clientAxios.post('/auth/register', {
      name,
      lastname,
      email,
      password
    })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        dispatch(addUser(res.data.user));
        router("/");
      })
      .catch(err => alert("Ocurrio un problema en el servidor. Intentelo de nuevo."))
      .finally(e => {
        setLoading(false)
      })
  }

  const login = (e) => {
    e.preventDefault();
    setLoading(true)
    if (!email || !password) {
      alert('Todos los campos son requeridos')
      setLoading(false)
      return
    }

    clientAxios.post('/auth/login', {
      email,
      password
    })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        dispatch(addUser(res.data.user));
        router("/");
      })
      .catch(err => alert("Usuario o contraseña incorrecta."))
      .finally(e => {
        setLoading(false)
      })
  }
  return (
    <div className={`auth ${showLogin && 'active'}`}>
      {
        loading && <Loading />
      }
      <Navbar />
      <div className='auth_container'>
        <div className='blueBg'>
          <div className='box signin'>
            <h2>Ya tienes una cuenta?</h2>
            <button
              onClick={() => setShowLogin(!showLogin)}
              className='signinBtn'
            >Iniciar</button>
          </div>
          <div className='box signup'>
            <h2>No tienes una cuenta?</h2>
            <button
              onClick={() => setShowLogin(!showLogin)}
              className='signupBtn'
            >Registrate Aqui</button>
          </div>
        </div>
        <div className={`formBx ${showLogin && 'active'}`}>
          <div className='form signinForm'>
            <form>
              <h3>Iniciar Sesion</h3>
              <CustomInput
                name="email"
                value={authState.email}
                placeholder="Correo Electronico"
                onChange={handleChange}
              />
              <CustomInput
                type='password'
                name="password"
                value={authState.password}
                placeholder="Contraseña"
                onChange={handleChange}
              />
              <CustomButton text='Iniciar Sesion' onClick={login} />
            </form>
          </div>

          <div className='form signupForm'>
            <form>
              <h3>Registrarse</h3>
              <CustomInput
                name="name"
                value={authState.name}
                placeholder="Nombre"
                onChange={handleChange}
              />
              <CustomInput
                name="lastname"
                value={authState.lastname}
                placeholder="Apellido"
                onChange={handleChange}
              />
              <CustomInput
                name="email"
                value={authState.email}
                placeholder="Correo Electronico"
                onChange={handleChange}
              />
              <CustomInput
                type="password"
                name="password"
                value={authState.password}
                placeholder="Contraseña"
                onChange={handleChange}
              />
              <CustomInput
                type="password"
                name="confirmPassword"
                value={authState.confirmPassword}
                placeholder="Confirmar Contraseña"
                onChange={handleChange}
              />
              <CustomButton text='Registrarse' onClick={register} />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthScreen