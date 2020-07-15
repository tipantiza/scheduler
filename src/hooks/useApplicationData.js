import { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import "../components/Appointment/styles.scss";

import { decreaseSpotVal, increaseSpotVal} from '../helper/Helper'

export default function useApplicationData(){

  const [state, setState] = useState({
    interviewers: {},
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const updateAppointments = (id, interview, state) => {
    const appointment = {
      ...state.appointments[id],
      interview
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return { appointment, appointments}
  }
  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const { appointments } = updateAppointments(id, null, state)
      const newState = increaseSpotVal(state)
      setState({...newState, appointments})
    })
  } 

  function bookInterview(id, interview) {
    const { appointments, appointment } = updateAppointments(id, interview, state)
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      const newState = decreaseSpotVal(state)
      setState({...newState, appointments})
    })
  }

  function editInterview(id, interview) {
    const { appointments, appointment } = updateAppointments(id, interview, state)
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({...state, appointments})
    })
  }
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/interviewers"))
    ])
    .then(all => {
      setState(prev => ({...prev,  appointments: all[0].data , days: all[1].data, interviewers: all[2].data }));
    })
    
  }, []);
  return { state, setDay, bookInterview, cancelInterview, editInterview} 
  
}