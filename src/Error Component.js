import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import Students from './Students';
import Campuses from './Campuses';

const ErrorComponent = () =>{


  return(
    <>
    <h4>There was an error! That stinks</h4>
    <p style={{width: '70%', margin:'auto'}}>Go ahead and smash that back button please and please submit the error to the developer. Feel free to go back to <Link to ={'/'} element={<Home/>}>Home</Link>, <Link to ={'/students'} element={<Students/>}>Students</Link>, or <Link to ={'/campuses'} element={<Campuses/>}>Campuses</Link>.</p>


    </>
  )
}

export default ErrorComponent