import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import StudentForm from './StudentForm'
import ChangeCampusForm from './ChangeCampusForm'
import { deleteStudent, editStudent } from './store';
import StudentSearch from './StudentSearch'

const Students = ()=> {

  const { students, campuses } = useSelector(state=>state);
  const [campusId, setCampus] = useState('')
  const [form, setForm] = useState(<StudentForm/>)
  const [button, setButton] = useState([])
  const [letter, setLetter] = useState('0')
  const {id} = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();


  if (!students || !campuses) return null

  
  useEffect(()=>{
    const student = students.find(student => student.id === id)
    setCampus( student? student.campusId : '')
    setButton('Change Campus')
  }, [id, students])

  const noCampus = campuses.find(c=>c.name === 'Not Currently Enrolled')

  if (!students || !campuses) return null

  const deleteS =(student)=>{
    dispatch(deleteStudent(student))
    navigate('/students')
  }

  const unenrollS =(student)=>{
    student.campusId = noCampus.id
    const AT = student.emailAddress.indexOf('@')
    student.emailAddress = `${student.emailAddress.slice(0, AT)}@hotmail.com`
    dispatch(editStudent(student))
    navigate(`/students`)
  }

  const enrollS =(student)=>{
    navigate(`/students/${student.id}`)
  }

  const changeCampus = (student) => {
    const activeStudent = students.find(s => s.id === student.id)
    const notActive = students.filter(s => s !== activeStudent)
    let {campusId, id, firstName, lastName, emailAddress} = student

    if(activeStudent && button === 'Change Campus' ){
      setForm(<ChangeCampusForm id={id} campusID={campusId} firstName={firstName} lastName={lastName} emailAddress={emailAddress}/>)
      setButton('Cancel')
      }
    if(activeStudent && button === 'Cancel' ){
        setForm(<StudentForm/>)
        setButton('Change Campus')
      }
      // how do you change just one part of a map...?
    // if(notActive){
    //   setButton('Change Campus')
    // }
  }
  

  
  return (
   <div id='students-home'>
    <div id='students-list'>
      <p id = 'sorting'>Find  by Last Name</p>
      <StudentSearch students={students} letter={letter} setLetter={setLetter}/>
    <ul style={{listStyleType:"none"}}>
      {students.filter(letter === '0' ? stu => stu : stu => stu.lastName[0].toLowerCase() === letter).map(student =>{
        const campus = () =>{ 
          return campuses.filter(campus => {
            if (campus.id === student.campusId){
              return campus
            }    
          })}

          if (!students){
            return null
          }

          const oneCampus = campus()
          const one = oneCampus[0]

          return(
          <li  className='underlined' key={student.id}>
          <Link to={`${student.id}`}>
            {student.firstName} {student.lastName}
            </Link>
            <ul id="details">
              <li>Email Address: {student.emailAddress}</li>
              <li>Enrollment Status: {student.campusId === null ? "Not currently enrolled." : <Link to={`../campuses/${one.id}`}>{one.name}</Link>}
                </li>
              <li>Current G.P.A. {student.gpa ? `is ${student.gpa}` : `needs to be entered.`}</li>
                <li style={{listStyleType: 'none'}}>

                  {student.campusId !== noCampus.id ? 
                  <button id = 'actionButtons' onClick={(ev)=> unenrollS(student)}>&#10006; Unenroll </button> : 
                  <button id = 'actionButtons' onClick={(ev)=> enrollS(student)}>&#10004; Enroll </button> }
                  <button id = 'actionButtons' onClick={(ev)=> deleteS(student)}>&#10006; Delete </button>

                  <button id = 'actionButtons' className='changeButton' onClick={(ev)=> changeCampus(student)}>&#10068; {button}</button>
                </li>
            </ul>
          </li>
        )
      })}
    </ul>
   </div>
     <div id='student-form'>{form}</div> 
   </div>
  );
};

export default Students
