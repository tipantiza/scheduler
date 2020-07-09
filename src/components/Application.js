import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import "./Appointment/styles.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment/index";

import { getAppointmentsForDay, getInterview } from "../helper/selectors"

export default function Application(props) {

  
  
  const [state, setState] = useState({
    interviewers: {},
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  
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
  
  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        interview={interview}
      />
    )
  })


  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {
          schedule
        }
      </section>
    </main>
  );
}
