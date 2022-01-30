
import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";

import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

/*const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones1",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "John Dow",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Barbra Streisand",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];
*/


export default function Application(props) {
 /*const [day, setDay] = useState("Monday");
 const [days, setDays] = useState([]);
 const [appointments, setAppointments] = useState({});
*/

const setDay = day => setState({ ...state, day });
const setDays = days => setState(prev => ({ ...prev, days })); 
const [state, setState] = useState({
  day: "Monday",
  days: [],
  // you may put the line below, but will have to remove/comment hardcoded appointments variable
  appointments: {},
  interviewers: {}
});
let dailyAppointments = [];
let interviewers = [];
 useEffect(() => { 
    //axios.get("http://localhost:8001/api/days").then((response) => {    
     // setDays(response.data);    
  const promise1 = axios.get("http://localhost:8001/api/days");
  const promise2 = axios.get("http://localhost:8001/api/appointments");
  const promise3 = axios.get("http://localhost:8001/api/interviewers");
  //TestWebSocket();

  Promise.all([promise1, promise2, promise3]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));   
    console.log(state);   
  }); 

  }, []); 
async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const put = axios.put("http://localhost:8001/api/appointments/"+id, {interview:interview});
    await Promise.resolve(put)
      .then(()=>{
        updateSpots(state.day, -1);
        setState({...state, appointments}); 
    })
    .catch(); 
    }
 
  async function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const cancel = axios.delete("http://localhost:8001/api/appointments/"+id);
    await Promise.resolve(cancel)
    .then(()=>{
     updateSpots(state.day, 1);
      setState({...state, appointments});  
  
    })
   .catch();  
   
  }
  function updateSpots (day, delta)
  {    
    for(let i=0; i<state.days.length;i++)
    {
        if(state.days[i].name===day)
        {     
          state.days[i].spots+=delta;     
        }
    }    
  }
  
  dailyAppointments = getAppointmentsForDay(state, state.day);  
  interviewers = getInterviewersForDay(state, state.day);
    const listAppointments = dailyAppointments.map((appointment) =>     
    <Appointment 
      key={appointment.id} 
      {...appointment} 
      interview={getInterview(state, appointment.interview)} 
      interviewers={interviewers} 
      bookInterview={(id,interview)=>bookInterview(id,interview)}
      cancelInterview={(id)=>cancelInterview(id)}
      />
  )
function TestWebSocket()
{
  var exampleSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL, "protocolOne");  
  exampleSocket.onopen = function (event) {   
  };

  exampleSocket.onmessage = function (event) {
  
    var msg = JSON.parse(event.data); 
 
    if(msg["type"]==="SET_INTERVIEW")
    { 
      const interview = msg["interview"];
      const appointment = {
        ...state.appointments[msg["id"]],
        interview: { ...interview }
      };
      console.log(appointment);
      const appointments = {
        ...state.appointments,
        [msg["id"]]: appointment
      };
      (interview!==null)?  updateSpots(state.day, 1) :updateSpots(state.day, -1);    
      
      setState({...state, appointments});        
    }
  }
}
  
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
selectedDay={state.day} 
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
        {listAppointments}      
      </section>
    </main>
  );
}
