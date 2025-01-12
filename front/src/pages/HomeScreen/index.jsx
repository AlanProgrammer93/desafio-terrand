import React from 'react'
import './styles.css'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <>
    <Navbar />
    <div>HomeScreen</div>
    </>
  )
}

export default HomeScreen