import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents, fetchCampuses } from './store';
import { Link, Routes, Route } from 'react-router-dom';
import Students from './Students';
import Student from './Student';
import Campuses from './Campuses';
import Campus from './Campus';
import Home from './Home'
import ErrorBoundary from './ErrorBoundary';


const App = ()=> {
  const { students, campuses } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchStudents())
    dispatch(fetchCampuses());
  }, []);

  if (!students || !campuses) return null

  return (
    <div id = 'body'>
      
      <div className='head'>

      <ErrorBoundary fallback="App header error">
      <h1><Link to='/' element={ <Home /> }>JPFP 2212</Link></h1>
      </ErrorBoundary>

      <ErrorBoundary fallback="App nav error">
          <nav>
          <Link to='/students' className={'navLink'}>Students ({students.length})</Link>
          <Link to='/campuses' className={'navLink'}>Campuses ({campuses.length-1})</Link>
          </nav>      
      </ErrorBoundary>
      </div>

      <ErrorBoundary>
      <div id='non-footer'>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/students' element={ <Students /> } />
        <Route path='/students/:id' element={ <Student /> } />
        <Route path='/campuses' element={ <Campuses /> } />
        <Route path='/campuses/:id' element={ <Campus /> } />
      </Routes>
      </div>
      </ErrorBoundary>


      <ErrorBoundary fallback="App footer error">
      <div id='foot'>
      <nav id='footnav'>
        <Link to='/' element={ <Home /> }>JPFP 2212</Link>
        <Link to='/students'>Students</Link>
        <Link to='/campuses'>Campuses</Link>
      </nav>
      </div>
      </ErrorBoundary>


    </div>

    
  );
};

export default App;
