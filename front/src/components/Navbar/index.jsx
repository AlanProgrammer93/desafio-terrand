import React from 'react'
import './styles.css'
import { Link, useNavigate } from 'react-router'
import { MdLogout, MdLogin } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/userReducer';

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const router = useNavigate();
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.removeItem('token')
    dispatch(addUser(null));
    router('/');
  }

  console.log(user);
  

  return (
    <nav className='navbar'>
      <Link className='navbar_left' to="/">HOME</Link>
      <div className='navbar_right'>

        {
          user ? (
            <>
              <Link to="/profile" >Mis Recetas</Link>
              <div className='auth_icon' onClick={logout}>
                <MdLogout /> 
              </div>
            </>
          ) : (
            <Link to="/auth" >
              <div className='auth_icon'>
                <MdLogin />
              </div>
            </Link>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar