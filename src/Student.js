import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import StudentForm from './StudentForm';
const {faker} = require('@faker-js/faker')


// this will be a single student page

const Student = ()=> {
  const {id} = useParams();
  const { students, campuses } = useSelector(state=>state);
 
  if (!students || !campuses) return null

    
  const student = students.find(s=>s.id===id)

  const campus = () =>{ 
    return campuses.find(campus => {
      if (campus.id === student.campusId){
        return campus
      }})}

  if(!student){
        return null;
      } 

  const singleCampus = campus();

  if(!singleCampus){
        return null;
      } 

  return (
    
    <div id='student-details'>
    <div id='student-details-list'>
    <h3>{student.firstName} {student.lastName}</h3>  
        <ul id="details">
        <li>Email Address: {student.emailAddress}</li>  
        <li>Enrolled in: {student.campusId === null ? "Not currently enrolled" : <Link to={`../campuses/${singleCampus.id}`} >{singleCampus.name}</Link>}</li>  
        <li>Current GPA: {student.gpa}</li>  
        <li>Bio:</li> 
        <p style={{textIndent: '2rem', paddingBottom: '2rem'}}>{student.firstName} {student.lastName} is a {faker.word.adjective()} student who {student.campusId? `enrolled in ${faker.date.month({ context: true })} of 2020` : "is not currently enrolled anywhere"}. {faker.lorem.paragraphs(2, '\n')}</p>
        </ul>
   </div>
    <div id='student-form'><StudentForm/></div>
   </div>
  );
};

export default Student;
