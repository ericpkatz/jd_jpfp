import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CampusForm from './CampusForm';
import { deleteCampus, editStudent, deleteStudent } from './store';


const Campuses = ()=> {
  const {id} = useParams();
  const { students } = useSelector(state=>state);
  const { campuses } = useSelector(state=>state);

  const dispatch=useDispatch();
  const navigate = useNavigate();

  if (!students || !campuses) return null

  
  const noCampus = campuses.find(c=>c.name === 'Not Currently Enrolled')
  const campus = campuses.find(c=>c.id === id)

  if (!students || !campuses) return null

  const enrolled = () =>{
    const enrollment = students.filter(student =>(student.campusId === campus.id))
    return enrollment
  }
  const enrollment = enrolled()

  const deleteC =(campus)=>{
    enrollment.map(_s => _s.campusId = noCampus.id)
    dispatch(deleteCampus(campus))
    navigate('/campuses')
  }

  const unenrollS =(student)=>{
    student.campusId = noCampus.id
    const AT = student.emailAddress.indexOf('@')
    student.emailAddress = `${student.emailAddress.slice(0, AT)}@hotmail.com`
    dispatch(editStudent(student))
    navigate(`/campuses/${campus.id}`)
  }

  const deleteS =(student)=>{
    dispatch(deleteStudent(student))
    navigate(`/campuses/${campus.id}`)
  }

  return (
    <>
    <div id='campus-details'>
    <div id='campus-details-list'>
    <ul>
    <h3>{campus.name}</h3>  
        <ul id="details"> 

        <li>Address: {id === noCampus.id ? 'Not Applicable' : campus.address}</li>  
        <li>Current Enrollment: {enrollment.length === 0 ? "No enrollment" : enrollment.length}</li>   
        <li>Description:
          <p style={{textIndent: '2rem', paddingTop: '0px'}}>{campus.description}</p>
        </li>  
        <li>Students Enrolled:</li>
        {enrollment.length === 0 ? "Currently no students enrolled." :
          <ul id='enrolledstudents'>
          {enrollment.map( _student =>{
            return(
              <li id='enrolledCol' className='underlined' key={_student.id}>
              <Link to={`../students/${_student.id}`}>
                {_student.firstName} {_student.lastName}</Link>
                {/* <li style={{listStyleType: 'none'}}> */}
                <div id='enrolledCol'>
                {_student.campusId !== noCampus.id ? <button id='actionButtons' onClick={(ev)=> unenrollS(_student)}>  &#10006; Unenroll </button> : <button id='actionButtons' onClick={(ev)=> enrollS(_student)}>  &#10004; Enroll </button> }
                <button id='actionButtons' onClick={(ev)=> deleteS(_student)}>  &#10006; Delete </button></div>
                {/* </li> */}
                </li>
            )})}
          </ul>
          }
    </ul>
    </ul>

    </div>
    <div id='campus-form'><CampusForm/></div>

    </div>
    {id === noCampus.id ? '' :
    <p style={{fontSize:'1rem', width:'60%', margin:'2rem auto', textAlign:'center'}}>If you actually, truly, seriously need to delete this campus, here's how. When we're done with Authentication, I'm password protecting this button.<button id = 'actionButtons' onClick={(ev)=> deleteC(campus)}>&#10006; Delete </button></p>}
    </>
  );
};

export default Campuses;
