import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode  from "hooks/useVisualMode";
import axios from 'axios';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR = "ERROR"
let MSG="";
export default function Appointment(props) {  
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );

      function save(name, interviewer) {           
        const interview = {
          student: name,
          interviewer
        };
        
        MSG="Submitting";
        transition(STATUS);  

     Promise.resolve(props.bookInterview(props.id, interview))
            .then(()=>{transition(SHOW);})
            .catch(error=> { transition(ERROR, true);});
      }
      async function TransitWithDelay(mode) {       
        await new Promise(resolve => setTimeout(resolve, 0));
        transition(mode);        
      }  
      function test(){
            console.log(props);
      }
      function cancel(id){
        MSG="Canceling";
        transition(STATUS, true);    
        
        Promise.resolve(props.cancelInterview(id))
            .then(()=>{transition(EMPTY)})
            .catch(()=>{transition(ERROR, true);})
      }
    return (
        <div>
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/>}
        {mode === CREATE && (<Form interviewers={props.interviewers} onSave={(name,interviewer)=> save(name,interviewer)} onCancel={() => back()} /> )}   
        {mode === STATUS && ( <Status message={MSG} />)}
        {mode === CONFIRM && ( <Confirm message="Are you sure you would like to delete?"  onConfirm={() => cancel(props.id)} onCancel={() => back()} />)}        
        {mode === EDIT && ( <Form interviewers={props.interviewers} onSave={(name,interviewer)=> save(name,interviewer)} onCancel={() => back()} name={props.interview.student} interviewer={props.interview.interviewer.id} /> )}
        {mode === ERROR && ( <Error message="Error contacting the server." onClose={() => back()}/>)}
      </div>
      
      );
  }

  