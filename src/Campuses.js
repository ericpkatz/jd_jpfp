import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CampusForm from './CampusForm'

const Campuses = ()=> {
  const { students } = useSelector(state=>state);
  const { campuses } = useSelector(state=>state);

  if (!students || !campuses) return null
  
  return (
    <div id='campuses-home'>
    <div id='campuses-list'>
    <ul style={{listStyleType:"none"}}>

      {campuses.map(campus =>{
        const enrolled = (campus) =>{
          const enrollment = students.filter(student =>(student.campusId === campus.id))
          return enrollment
        }

      const averageGPA = (campus) => {
        enrolled(campus)
        if (enrolled(campus).length === 0){
          return 0;
        }
        if (enrolled(campus).length > 0) {
          const enrollment = (enrolled(campus)).reduce((acc, stu) => ((stu.gpa*1) + acc), 0)
          return Math.floor((enrollment/enrolled(campus).length)*10)/10
        }

      }
        return(
          <li  className='underlined' key={campus.id}>
          <Link to={`${campus.id}`}>
            {campus.name}
            </Link>
            <ul id="details">
            {campus.name !== "Not Currently Enrolled" ? <li>{campus.address}</li> : ''}
            <li>Current Students: {enrolled(campus).length}</li>
            <li>Average Student GPA: {averageGPA(campus)}</li>
            </ul>
          </li>
        )
      })}
    </ul>
    </div>
    <div id='campus-form'><CampusForm/></div>
    </div>
  );
};

export default Campuses;
