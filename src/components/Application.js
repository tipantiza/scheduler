import React, { useState, Fragment } from "react";

import "components/Application.scss";
import "./Appointment/styles.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment/index";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 3,
    time: "4pm",
  },
  {
    id: 4,
    time: "2pm",
    interview: {
      student: "Jalysa Cancino",
      interviewer: { 
        id: 1, 
        name: "Sylvia Palmer", 
        avatar: "https://i.imgur.com/LpaY82x.png" 
      }
    }
  },
  {
    id: 5,
    time: "3pm",
    interview: {
      student: "Landon Tipantiza",
      interviewer: { 
        id: 3, 
        name: "Tori Malcolm", 
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      },
    }
  },
  {
    id: 6,
    time: "4pm",
  }


];

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday")
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
  days={days}
  day={day}
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
          appointments.map((appointment) => {
            return <Appointment key={appointment.id} {...appointment} />
      
          })
        }
      </section>
    </main>
  );
}
