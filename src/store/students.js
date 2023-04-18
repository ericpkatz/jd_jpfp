import axios from 'axios'

const students = (state = [], action)=> {
  if(action.type === 'SET_STUDENTS'){
    return action.students
  }
  if(action.type === 'CREATE_STUDENT'){
    return [action.student, ...state]
  }
  if(action.type === 'EDIT_STUDENT'){
    state = state.map(student => {
      if (student.id === action.student.id){
        return action.student
      }
      return student
    })
  }
  if(action.type === 'DELETE_STUDENT'){
    return state.filter(_student => _student.id !== action.student.id);
  }
  return state
};

export const fetchStudents = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/students');
    dispatch({type: 'SET_STUDENTS', students: response.data})
  };
};
export const createStudent = (student)=> {
  return async(dispatch)=> {
    const response = await axios.post(`api/students`, student);
    console.log(response, 'response')
    dispatch({type: 'CREATE_STUDENT', student: response.data})
  };
};
export const editStudent = (student)=> {
  return async(dispatch)=> {
    const response = await axios.put(`api/students/${student.id}`, student);
    dispatch({type: 'EDIT_STUDENT', student: response.data})
  };
};
export const deleteStudent = (student)=> {
  return async(dispatch)=> {
    await axios.delete(`api/students/${student.id}`);
    dispatch({type: 'DELETE_STUDENT', student})
  };
};

export default students