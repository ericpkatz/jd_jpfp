import axios from 'axios'

const campuses = (state = [], action)=> {
  if(action.type === 'SET_CAMPUSES'){
    return action.campuses
  }
  if(action.type === 'CREATE_CAMPUS'){
    return [action.campus, ...state]
  }
  if(action.type === 'EDIT_CAMPUS'){
    state = state.map(campus => {
      if (campus.id === action.campus.id){
        return action.campus
      }
      return campus
    })
  }
  if(action.type === 'DELETE_CAMPUS'){
    return state.filter(_campus => _campus.id !== action.campus.id)

  }
  return state
};


export const fetchCampuses = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/campuses');
    dispatch({type: 'SET_CAMPUSES', campuses: response.data})
  };
};

export const createCampus = (campus)=> {
  return async(dispatch)=> {
    const response = await axios.post(`api/campuses`, campus);
    dispatch({type: 'CREATE_CAMPUS', campus: response.data})
  };
};


export const editCampus = (campus)=> {
  return async(dispatch)=> {
    const response = await axios.put(`api/campuses/${campus.id}`, campus);
    dispatch({type: 'EDIT_CAMPUS', campus: response.data})
  };
};

export const deleteCampus = (campus)=> {
  return async(dispatch)=> {
    console.log(campus)
    await axios.delete(`api/campuses/${campus.id}`);
    dispatch({type: 'DELETE_CAMPUS', campus})
  };
};


export default campuses;
