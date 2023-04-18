import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { createCampus, editCampus } from './store'

const topFunction = (ev) => {
  ev.preventDefault();
  console.log('scroll up')
  document.body.scrollTop = 10; // For Safari
  document.documentElement.scrollTop = 10; // For Chrome, Firefox, IE and Opera
}

const CampusForm = () =>{
  const { students, campuses } = useSelector(state=>state);
  const {id} = useParams();
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!students || !campuses) return null

  useEffect(()=>{
    const campus = campuses.find(camp => camp.id === id)
    setName( campus? campus.name : '')
    setAddress( campus? campus.address : '')
    setDescription( campus? campus.description : '')
  }, [id, campuses])  


  const saveCampus = async(ev) => {
    ev.preventDefault();
    try{
      if(!id){
        await dispatch(createCampus({name, address, description, id})); 
        navigate(`/campuses`);
      }
      if(id) {
        await dispatch(editCampus({name, address, description, id})); 
        navigate(`/campuses/${id}`);
      }
    }
    catch(err){
      setErrors(err.response);
    }
  }
    
      return(
        <>
      <h3>{id? "Edit Campus" : "Add a Campus"}</h3>
      <form onSubmit={saveCampus}>
      <label>Name:
      <input value={name} onChange={ev=> setName(ev.target.value)} placeholder={'Campus Name'}></input>
      </label>
      <label>Address:
      <input value={address} onChange={ev=> setAddress(ev.target.value)} placeholder={'Address'}></input>
      </label>
      <label>Description:
      <textarea value={description} style={{height: '50px', overflowY:'scroll'}} onChange={ev=> setDescription(ev.target.value)} placeholder={'Description'}></textarea>
      </label>
      
      <p style={{fontSize: '.8rem', textAlign: 'center', margin: 'auto', width: '60%'}}>Note: to change the enrollment quantity, please enroll a student.</p>

      <button disabled={!name}>{id? "Update" : "Create"}</button>
        </form>
        </>
      )
    }

export default CampusForm