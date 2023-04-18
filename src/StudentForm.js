import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { createStudent, editStudent } from './store'

const topFunction = (ev) => {
  ev.preventDefault();
  document.body.scrollTop = 10; // For Safari
  document.documentElement.scrollTop = 10; // For Chrome, Firefox, IE and Opera
}

const StudentForm = () =>{
  const { students, campuses } = useSelector(state=>state);
  const {id} = useParams();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmail] = useState('')
  const [campusId, setCampus] = useState('')
  const [gpa, setGPA] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!students || !campuses) return null

  useEffect(()=>{
    const student = students.find(student => student.id === id)
    setFirstName( student? student.firstName : '')
    setLastName( student? student.lastName : '')
    setEmail( student? student.emailAddress : '')
    setCampus( student? student.campusId : '')
    setGPA(student? student.gpa : '')
  }, [id, students])



  const save = async(ev) => {
    ev.preventDefault();
    try{
      if(!id){
        await dispatch(createStudent({firstName, lastName, emailAddress, campusId})); 
        setErrors([]);
      }
      if(id) {
        const campus = campuses.find(cam => cam.id === campusId)
        let emailAddress = campus.name !== "Not Currently Enrolled" ? `${firstName}${lastName}@${campus.name.toLowerCase().replace(/\s/g, "")}.edu`: `${firstName}${lastName}@hotmail.com`
        console.log(emailAddress)
        await dispatch(editStudent({firstName, lastName, emailAddress, campusId, id, gpa})); 
        navigate(`/students/${id}`);
        // setErrors([]);
      }
    }
    catch(err){
      setErrors(err);
      console.log(err)
    }
  }

  return(
    <>
    <h4>{id? "Edit Student" : "Add a Student"}</h4>
    
    <form onSubmit={save}>
      <label>First Name:
      <input value={firstName} onChange={ev=> setFirstName(ev.target.value)} placeholder={'First Name'}></input>
      </label>
      <label>Last Name:
      <input value={lastName} onChange={ev=> setLastName(ev.target.value)} placeholder={'Last Name'}></input>
      </label>
      <label>Email Address:
      <input value={emailAddress} onChange={ev=> setEmail(ev.target.value)} placeholder={'Email Address'}></input>
      </label>
      <label>Campus:
      <select value={campusId } onChange={ev=> setCampus(ev.target.value)}>
      <option>Pick a Campus</option>
        {campuses.map( cam => {
          return(
            <option value={ cam.id } key={ cam.id }>{ cam.name }</option>
            )})}
      </select>
      </label>

      {id?<label>GPA:<input value={gpa} onChange={ev=> setGPA(ev.target.value)} placeholder={'GPA'}></input></label>: ''}
      

      <button disabled={!emailAddress.includes('@' && '.')}>{id? "Update" : "Create"}</button>
    <button id='back-to-top' onClick={ev => topFunction(ev)}>Back to Top</button>
    </form>
    </>
  )
}
export default StudentForm