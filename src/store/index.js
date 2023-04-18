import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import axios from 'axios'
import students, {fetchStudents, createStudent, editStudent, deleteStudent} from './students'
import campuses, {fetchCampuses, createCampus, editCampus, deleteCampus} from './campuses'


const reducer = combineReducers({
  students,
  campuses
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store
export {fetchStudents, createStudent, editStudent, deleteStudent, fetchCampuses, createCampus, editCampus, deleteCampus};
