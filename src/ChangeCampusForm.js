import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from "react-router-dom";
import { editStudent } from './store'

const topFunction = (ev) => {
  ev.preventDefault();
  document.body.scrollTop = 10; // For Safari
  document.documentElement.scrollTop = 10; // For Chrome, Firefox, IE and Opera
}



const ChangeCampusForm = (props) =>{
  let student = props
  let activeStudentId = props.id
  let activeStudentCampus = props.campusID
  let activeEmail = props.emailAddress

  const { students, campuses } = useSelector(state=>state);
  const {id} = useParams();
  const [campusId, setCampus] = useState('')
  const [errors, setErrors] = useState([])
  // const [form, setForm] = useState(<StudentForm/>)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!campuses || !activeStudentId){
    return null}

  const activeCampus = campuses.find(c => c.id === activeStudentCampus)

  if (!activeCampus){
    return null}
  
  useEffect(()=>{
    setCampus(activeCampus)
  }, [id, campuses])


  const save = async(ev) => {
    ev.preventDefault();
    try{
        const id = activeStudentId
        let emailAddress = activeEmail
        const campus = campuses.find(cam => cam.id === campusId)
        emailAddress = campus.name !== "Not Currently Enrolled" ? `${student.firstName}${student.lastName}@${campus.name.toLowerCase().replace(/\s/g, "")}.edu`: `${student.firstName}${student.lastName}@hotmail.com`
        console.log(campusId, id, emailAddress)
        await dispatch(editStudent({campusId, id, emailAddress})); 
        setErrors([]);
    }
    catch(err){
      setErrors(err.response);
    }
  }

 

  return(
    <>
    <h4>Change Campus</h4>
    
    <form onSubmit={save}>
        <p style={{textAlign: 'center', marginTop: '0'}}>{props.firstName} {props.lastName}</p>
      <label>Change Campus:
      <select value={campusId } onChange={ev=> setCampus(ev.target.value)}>
      <option>Select a New Campus</option>
        {campuses.map( cam => {
          return(
            <option value={ cam.id } key={ cam.id }>{ cam.name }</option>
            )})}
      </select>
      </label>

      <button onClick={ev => save(ev)}>Update</button>

<br></br>
    <button id='back-to-top' onClick={ev => topFunction(ev)}>Back to Top</button>
    </form>
    </>
  )
}

export default ChangeCampusForm