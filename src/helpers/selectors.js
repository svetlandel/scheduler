export function getAppointmentsForDay(state, day) {
    const dayEntry = state.days.filter(d => d.name === day);
    let appointments = [];
    if(typeof dayEntry!=='undefined' && typeof dayEntry[0]!=='undefined' && typeof dayEntry[0].appointments!=='undefined' )
    {
        dayEntry[0].appointments.forEach(a => appointments.push(state.appointments[a]));          
    }   

    return appointments;
  }

  export function getInterview(state, interview) {
       if(interview!==null){
        const interviwerEntry = Object.values(state.interviewers).filter(i => i.id === interview.interviewer);      
        interview = {...interview, interviewer: interviwerEntry[0]};        
       }
      return interview;
  }

  export function getInterviewersForDay(state, day){
    const dayEntry = state.days.filter(d => d.name === day);
    let  interviewers=[];
    if(typeof dayEntry!=='undefined' && typeof dayEntry[0]!=='undefined' && typeof dayEntry[0].appointments!=='undefined' )
    {
        interviewers = Object.values(state.interviewers);
    }
    return interviewers;
  }