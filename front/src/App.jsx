import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import './App.css'
import clientAxios from './utils/axios';
import { addUser } from './store/userReducer';
import HomeScreen from './pages/HomeScreen';
import RecipeScreen from './pages/RecipeScreen';
import ProfileScreen from './pages/ProfileScreen';
import AuthScreen from './pages/AuthScreen';
import LoggedRoutes from './routes/LoggedRoutes';
import NotLoggedRoutes from './routes/NotLoggedRoutes';
import { Route, Routes } from 'react-router';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

    await clientAxios.get('/auth/current-user', {
      headers: {
        token
      }
    })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        dispatch(addUser(res.data.user));
      })
      .catch(err => {
        localStorage.removeItem('token')
        dispatch(addUser(null));
      });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        theme="dark"
        style={{ zIndex: '999999' }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomeScreen />
          }
        />
        <Route
          path=":idRecipe"
          element={
            <RecipeScreen />
          }
        />
        <Route element={<LoggedRoutes />}>
          <Route
            path="profile"
            element={
              <ProfileScreen />
            }
          />
        </Route>
        <Route element={<NotLoggedRoutes />}>
          <Route path="auth" element={<AuthScreen />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
